var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');
var emailService = require('./emailService');

dotenv.config();

var __dirname = path.resolve(__dirname || '.');
var app = express();
var PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (admin.html)
app.use(express.static(__dirname));

// Make root serve admin.html for convenience
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Initialize database
var db = new sqlite3.Database(path.join(__dirname, 'inquiries.db'), function(err) {
  if (err) {
    console.error('Failed to open database:', err.message);
    process.exit(1);
  }
  db.run(`CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new'
  )`, function(err) {
    if (err) {
      console.error('Failed to create table:', err.message);
      process.exit(1);
    }
    console.log('✅ Database initialized successfully');
    emailService.initializeEmailService();
    // Start server after database is ready
    startServer();
  });
});

// Routes

// Create new inquiry
app.post('/api/inquiries', function(req, res) {
  try {
    const { name, phone, email, message } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Insert into database
    db.run(
      'INSERT INTO inquiries (name, phone, email, message) VALUES (?, ?, ?, ?)',
      [name, phone, email, message],
      function(err) {
        if (err) {
          console.error('Error creating inquiry:', err);
          return res.status(500).json({
            success: false,
            error: 'Failed to submit inquiry',
            details: err.message
          });
        }
        var inquiryData = {
          id: this.lastID,
          name: name,
          phone: phone,
          email: email,
          message: message,
          created_at: new Date().toISOString(),
          status: 'new'
        };
        // Send email notification (non-blocking)
        emailService.sendInquiryNotification(inquiryData);
        res.status(201).json({
          success: true,
          message: 'Inquiry submitted successfully',
          id: this.lastID,
          data: inquiryData
        });
      }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit inquiry',
      details: error.message
    });
  }
});

// Get all inquiries with filters
app.get('/api/inquiries', (req, res) => {
  console.log('[DEBUG] GET /api/inquiries called');
  try {
    const { status, sort = 'created_at', order = 'DESC', limit = 50, offset = 0 } = req.query;
    console.log('[DEBUG] params:', { status, sort, order, limit, offset });

    let query = 'SELECT * FROM inquiries';
    const params = [];

    // Add status filter if provided
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    // Add sorting
    const validSortFields = ['created_at', 'name', 'email', 'status'];
    const sortField = validSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;

    // Add limit and offset for pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    console.log('[DEBUG] SQL query:', query);
    console.log('[DEBUG] SQL params:', params);

    // Fetch inquiries
    db.all(query, params, function(err, inquiries) {
      console.log('[DEBUG] db.all callback triggered');
      if (err) {
        console.error('Error fetching inquiries:', err);
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch inquiries',
          details: err.message
        });
      }

      console.log('[DEBUG] inquiries count:', inquiries ? inquiries.length : 0);

      // Get total count
      let countQuery = 'SELECT COUNT(*) as total FROM inquiries';
      const countParams = [];
      if (status) {
        countQuery += ' WHERE status = ?';
        countParams.push(status);
      }

      db.get(countQuery, countParams, function(err, countResult) {
        console.log('[DEBUG] db.get callback triggered');
        if (err) {
          console.error('Error counting inquiries:', err);
          return res.status(500).json({
            success: false,
            error: 'Failed to count inquiries',
            details: err.message
          });
        }

        console.log('[DEBUG] countResult:', countResult);
        res.json({
          success: true,
          data: inquiries || [],
          pagination: {
            limit: parseInt(limit),
            offset: parseInt(offset),
            total: countResult ? countResult.total : 0
          }
        });
      });
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inquiries',
      details: error.message
    });
  }
});

// Get single inquiry
app.get('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;

    db.get(
      'SELECT * FROM inquiries WHERE id = ?',
      [id],
      (err, inquiry) => {
        if (err) {
          console.error('Error fetching inquiry:', err);
          return res.status(500).json({
            success: false,
            error: 'Failed to fetch inquiry',
            details: err.message
          });
        }

        if (!inquiry) {
          return res.status(404).json({
            success: false,
            error: 'Inquiry not found'
          });
        }

        res.json({
          success: true,
          data: inquiry
        });
      }
    );
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inquiry',
      details: error.message
    });
  }
});

// Update inquiry status
app.patch('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'read', 'responded', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    db.run(
      'UPDATE inquiries SET status = ? WHERE id = ?',
      [status, id],
      function(err) {
        if (err) {
          console.error('Error updating inquiry:', err);
          return res.status(500).json({
            success: false,
            error: 'Failed to update inquiry',
            details: err.message
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({
            success: false,
            error: 'Inquiry not found'
          });
        }

        res.json({
          success: true,
          message: 'Inquiry status updated'
        });
      }
    );
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update inquiry',
      details: error.message
    });
  }
});

// Delete inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;

    db.run(
      'DELETE FROM inquiries WHERE id = ?',
      [id],
      function(err) {
        if (err) {
          console.error('Error deleting inquiry:', err);
          return res.status(500).json({
            success: false,
            error: 'Failed to delete inquiry',
            details: err.message
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({
            success: false,
            error: 'Inquiry not found'
          });
        }

        res.json({
          success: true,
          message: 'Inquiry deleted'
        });
      }
    );
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete inquiry',
      details: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
function startServer() {
  const HOST = process.env.HOST || '0.0.0.0';
  const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
    console.log(`📊 Database: ${path.join(__dirname, 'inquiries.db')}`);
    console.log('[DEBUG] Server listening successfully');
  });
  
  server.on('error', (err) => {
    console.error('[ERROR] Server error:', err);
    process.exit(1);
  });
}
