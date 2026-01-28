export const generateSitemap = () => {
  const baseUrl = 'https://yourdomain.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/shredder-blades', priority: '0.9', changefreq: 'weekly' },
    { url: '/shredder-blades-for-plastic-recycling', priority: '0.8', changefreq: 'monthly' },
    { url: '/shredder-blades-for-metal-recycling', priority: '0.8', changefreq: 'monthly' },
    { url: '/shredder-blades-for-ewaste-recycling', priority: '0.8', changefreq: 'monthly' },
    { url: '/shredder-blades-for-tire-recycling', priority: '0.8', changefreq: 'monthly' },
    { url: '/custom-shredder-blades', priority: '0.8', changefreq: 'monthly' },
    { url: '/shredder-blade-materials', priority: '0.8', changefreq: 'monthly' },
    { url: '/about-us', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact-us', priority: '0.9', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
};