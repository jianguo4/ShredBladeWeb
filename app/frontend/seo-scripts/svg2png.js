/* Generate PNG icons from favicon.svg using sharp */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  const out32 = path.join(publicDir, 'favicon-32x32.png');
  const out180 = path.join(publicDir, 'apple-touch-icon.png');

  if (!fs.existsSync(svgPath)) {
    throw new Error(`SVG not found: ${svgPath}`);
  }
  const svg = fs.readFileSync(svgPath);

  // Transparent background; ensure crisp edges with nearest-neighbor kernel
  await sharp(svg, { density: 384 })
    .resize(32, 32, { fit: 'contain' })
    .png({ quality: 100 })
    .toFile(out32);

  await sharp(svg, { density: 384 })
    .resize(180, 180, { fit: 'contain' })
    .png({ quality: 100 })
    .toFile(out180);

  console.log('Generated:', out32, out180);
}

run().catch((e) => { console.error(e); process.exit(1); });
