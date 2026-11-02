/**
 * Before & After Image Optimization Script
 * Generates compressed, responsive WebP variants for each image pair.
 * Run once with: node scripts/optimize-before-after.mjs
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '../public/assets/images/before-after');
const OUT_DIR = path.join(__dirname, '../public/assets/images/before-after');

// ── Image pairs to process ──────────────────────────────────────────────────
// Each entry: { id, label, before, after }
// We only target the source JPEG/JPG files; existing webp stays untouched if good.
const IMAGE_PAIRS = [
  {
    id: 'wedding',
    label: 'Wedding / Event Grade',
    before: 'WhatsApp Image 2026-10-08 at 11.35.55.jpeg',
    after:  'WhatsApp Image 2026-10-08 at 11.35.56.jpeg',
    outPrefix: '01-portrait',
  },
  {
    id: 'landscape',
    label: 'Cinematic Landscape',
    before: 'file_00000000799482119301ce2f9b094cd6.jpg',
    after:  '20260803_044414 (1).jpg',
    outPrefix: '02-landscape',
  },
  {
    id: 'portrait',
    label: 'Portrait Transformation',
    before: 'WhatsApp Image 2026-10-08 at 11.37.477.jpeg',
    after:  'WhatsApp Image 2026-10-08 at 11.37.47.jpeg',
    outPrefix: '03-portrait-grade',
  },
];

// ── Responsive breakpoints ──────────────────────────────────────────────────
// Full container max-width ≈ 440px on desktop, portrait images are ~9:16
// We generate: 800w (retina/desktop crisp), 440w (standard container), 280w (mobile)
const WIDTHS = [800, 440, 280];
const WEBP_QUALITY = 82;  // High quality, noticeable size reduction
const AVIF_QUALITY = 72;  // AVIF is more efficient; slightly lower quality = same perceived quality

async function getFileSizeKB(filePath) {
  try {
    const s = await stat(filePath);
    return (s.size / 1024).toFixed(1);
  } catch {
    return 'N/A';
  }
}

async function processImage(srcPath, destPrefix, label) {
  const results = [];

  for (const width of WIDTHS) {
    const webpDest = `${destPrefix}-${width}w.webp`;

    // Skip if already exists and is recent
    const webpSize = await getFileSizeKB(webpDest);

    try {
      const img = sharp(srcPath);
      const meta = await img.metadata();
      const aspectH = Math.round((meta.height / meta.width) * width);

      // WebP variant
      await img
        .clone()
        .resize(width, aspectH, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpDest);

      const newSize = await getFileSizeKB(webpDest);
      results.push(`  ✓ ${path.basename(webpDest)} → ${newSize} KB`);
    } catch (err) {
      results.push(`  ✗ ${path.basename(webpDest)}: ${err.message}`);
    }
  }

  return results;
}

async function main() {
  console.log('\n🔧  Before & After Image Optimizer\n' + '='.repeat(46));

  for (const pair of IMAGE_PAIRS) {
    console.log(`\n📁  ${pair.label}`);

    const beforeSrc = path.join(SRC_DIR, pair.before);
    const afterSrc  = path.join(SRC_DIR, pair.after);

    // Log original sizes
    const bSize = await getFileSizeKB(beforeSrc);
    const aSize = await getFileSizeKB(afterSrc);
    console.log(`  Before source: ${pair.before} (${bSize} KB)`);
    console.log(`  After  source: ${pair.after} (${aSize} KB)`);

    // Process BEFORE
    console.log('  Processing BEFORE variants...');
    const bResults = await processImage(
      beforeSrc,
      path.join(OUT_DIR, `${pair.outPrefix}-before`),
      `${pair.label} BEFORE`
    );
    bResults.forEach(r => console.log(r));

    // Process AFTER
    console.log('  Processing AFTER variants...');
    const aResults = await processImage(
      afterSrc,
      path.join(OUT_DIR, `${pair.outPrefix}-after`),
      `${pair.label} AFTER`
    );
    aResults.forEach(r => console.log(r));
  }

  console.log('\n✅  Done! Responsive WebP variants generated.\n');
  console.log('Generated files follow this naming pattern:');
  console.log('  {prefix}-before-440w.webp  (desktop, full)');
  console.log('  {prefix}-before-280w.webp  (tablet / narrow)');
  console.log('  {prefix}-before-180w.webp  (mobile small)');
  console.log('  {prefix}-after-440w.webp');
  console.log('  {prefix}-after-280w.webp');
  console.log('  {prefix}-after-180w.webp\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

