const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Cutout specifications for all 18 Chibi characters.
 * Each character defines:
 * - neckX: center X of the neck collar
 * - neckY: base Y of the neck collar
 * - neckRadiusX: half-width of the neck opening
 * - neckDip: how deep the collar dips at the center
 * - headBounds: [minX, maxX, minY, maxY]
 * - keepProps: array of { minX, maxX, minY, maxY } or function (x, y) to protect props like telescope, boombox, etc.
 */
const SPECS = {
  'boy/moon': {
    neckX: 202,
    neckY: 326,
    neckRadiusX: 78,
    neckDip: 14,
    headBounds: [0, 360, 0, 340],
    isProp: (x, y) => (x > 336 && y > 165 && !(y < 270 && x < 360)) || (x > 450),
  },
  'girl/moon': {
    neckX: 200,
    neckY: 332,
    neckRadiusX: 78,
    neckDip: 14,
    headBounds: [0, 350, 0, 345],
    isProp: (x, y) => (x > 340 && y > 190 && !(y < 270 && x < 360)) || (x > 450),
  },
  'boy/radio': {
    neckX: 300,
    neckY: 345,
    neckRadiusX: 78,
    neckDip: 16,
    headBounds: [190, 500, 0, 360],
    isProp: (x, y) => x < 210 && y > 30, // Boombox is on the left
  },
  'girl/radio': {
    neckX: 290,
    neckY: 350,
    neckRadiusX: 78,
    neckDip: 16,
    headBounds: [170, 500, 0, 365],
    isProp: (x, y) => x < 205 && y > 30,
  },
  'boy/sales': {
    neckX: 318,
    neckY: 338,
    neckRadiusX: 72,
    neckDip: 14,
    headBounds: [0, 446, 0, 350],
    isProp: (x, y) => ((x - 175) * (x - 175) + (y - 410) * (y - 410) <= 168 * 168), // Exact circle of LP record
  },
  'girl/sales': {
    neckX: 340,
    neckY: 340,
    neckRadiusX: 78,
    neckDip: 14,
    headBounds: [0, 570, 0, 355],
    isProp: (x, y) => ((x - 175) * (x - 175) + (y - 410) * (y - 410) <= 170 * 170),
  },
  'boy/billboard': {
    neckX: 232,
    neckY: 330,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [0, 443, 0, 345],
    isProp: (x, y) => x < 115 && y > 240, // Thumbs up hand
  },
  'girl/billboard': {
    neckX: 238,
    neckY: 335,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [0, 453, 0, 350],
    isProp: (x, y) => x < 115 && y > 240,
  },
  'boy/news': {
    neckX: 275,
    neckY: 340,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [0, 410, 0, 355],
    isProp: (x, y) => x > 380 && y > 150, // Newspaper on the right
  },
  'girl/news': {
    neckX: 290,
    neckY: 335,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [0, 420, 0, 350],
    isProp: (x, y) => x > 380 && y > 150,
  },
  'boy/cinema': {
    neckX: 195,
    neckY: 325,
    neckRadiusX: 70,
    neckDip: 12,
    headBounds: [0, 399, 0, 340],
    isProp: (x, y) => x > 240 && y > 230, // Popcorn bucket
  },
  'girl/cinema': {
    neckX: 200,
    neckY: 330,
    neckRadiusX: 70,
    neckDip: 12,
    headBounds: [0, 409, 0, 345],
    isProp: (x, y) => x > 240 && y > 230,
  },
  'boy/stats': {
    neckX: 238,
    neckY: 330,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [0, 480, 0, 345],
    isProp: (x, y) => (x < 75 && y > 200) || (x > 380 && y > 220),
  },
  'girl/stats': {
    neckX: 242,
    neckY: 330,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [0, 480, 0, 345],
    isProp: (x, y) => (x < 75 && y > 200) || (x > 390 && y > 220),
  },
  'boy/intro': {
    neckX: 550,
    neckY: 375,
    neckRadiusX: 78,
    neckDip: 14,
    headBounds: [390, 700, 0, 390],
    isProp: (x, y) => x < 390 || x > 700, // Balloons on left, waving hand on right
  },
  'girl/intro': {
    neckX: 345,
    neckY: 345,
    neckRadiusX: 78,
    neckDip: 14,
    headBounds: [200, 490, 0, 360],
    isProp: (x, y) => x < 200 || x > 490, // Balloons on left, waving hand on right
  },
  'boy/summary': {
    neckX: 275,
    neckY: 360,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [140, 480, 0, 375],
    isProp: (x, y) => (x < 135 && y > 20) || (x > 410 && y > 370), // Trophy on left
  },
  'girl/summary': {
    neckX: 230,
    neckY: 355,
    neckRadiusX: 75,
    neckDip: 14,
    headBounds: [110, 380, 0, 370],
    isProp: (x, y) => (x < 120 && y > 20) || (x > 330 && y > 370),
  },
};

async function processImage(key, spec) {
  const inputPath = path.join(__dirname, '..', 'public', 'characters', `${key}.png`);
  if (!fs.existsSync(inputPath)) {
    console.warn(`File not found: ${inputPath}`);
    return;
  }

  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const out = Buffer.from(data);

  const [minHX, maxHX, minHY, maxHY] = spec.headBounds;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (spec.isProp && spec.isProp(x, y)) {
        continue; // Don't clear props
      }

      if (x >= minHX && x <= maxHX && y >= minHY && y <= maxHY) {
        // Calculate collar curve
        const dx = (x - spec.neckX) / spec.neckRadiusX;
        const dip = Math.max(0, 1 - dx * dx);
        const collarY = spec.neckY - spec.neckDip * (1 - dip);

        if (y < collarY) {
          out[(y * w + x) * 4 + 3] = 0; // Transparent
        }
      }
    }
  }

  // Save to public/characters/headless/{boy,girl}/{theme}.png
  const [gender, theme] = key.split('/');
  const outDir = path.join(__dirname, '..', 'public', 'characters', 'headless', gender);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${theme}.png`);

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(outPath);

  console.log(`[OK] Headless character saved: ${outPath}`);
}

async function main() {
  for (const [key, spec] of Object.entries(SPECS)) {
    await processImage(key, spec);
  }
  console.log('All 18 headless characters generated successfully.');
}

main().catch(console.error);
