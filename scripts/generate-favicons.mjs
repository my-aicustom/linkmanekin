import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, 'src/assets/images/link-manekin-logo.jpeg');
const output = join(root, 'public');
const background = '#faf8f5';

// Crop the actual metallic Link Manekin symbol; omit the unreadable wordmark.
const mark = sharp(source)
  .extract({ left: 520, top: 250, width: 620, height: 640 })
  .resize(512, 512, { fit: 'contain', background })
  .png();
const master = await mark.png().toBuffer();

for (const size of [16, 32, 48, 96, 180]) {
  const filename = size === 180
    ? 'apple-touch-icon.png'
    : `favicon-${size}x${size}.png`;
  await sharp(master).resize(size, size).png().toFile(join(output, filename));
}

// Keep the SVG favicon self-contained so it displays identically offline.
const svgImage = await sharp(master).resize(192, 192).webp({ quality: 88 }).toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Link Manekin</title><rect width="64" height="64" fill="${background}"/><image href="data:image/webp;base64,${svgImage.toString('base64')}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/></svg>\n`;
await import('node:fs/promises').then(({ writeFile }) =>
  writeFile(join(output, 'favicon.svg'), svg),
);

// Include 16, 32 and 48 px PNG entries for legacy desktop/browser consumers.
const entries = [];
for (const size of [16, 32, 48]) {
  entries.push({
    size,
    png: await sharp(master).resize(size, size).png().toBuffer(),
  });
}
const directoryBytes = 6 + entries.length * 16;
let offset = directoryBytes;
const ico = Buffer.alloc(directoryBytes);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(entries.length, 4);
for (const [index, entry] of entries.entries()) {
  const position = 6 + index * 16;
  ico.writeUInt8(entry.size === 256 ? 0 : entry.size, position);
  ico.writeUInt8(entry.size === 256 ? 0 : entry.size, position + 1);
  ico.writeUInt8(0, position + 2);
  ico.writeUInt8(0, position + 3);
  ico.writeUInt16LE(1, position + 4);
  ico.writeUInt16LE(32, position + 6);
  ico.writeUInt32LE(entry.png.length, position + 8);
  ico.writeUInt32LE(offset, position + 12);
  offset += entry.png.length;
}
await import('node:fs/promises').then(({ writeFile }) =>
  writeFile(join(output, 'favicon.ico'), Buffer.concat([ico, ...entries.map(e => e.png)])),
);

console.log('Generated favicon.svg, favicon.ico, PNG icons (16–96px), and apple-touch-icon.png from the Link Manekin logo.');
