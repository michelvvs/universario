const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Calibrated cutout specifications for all 18 Chibi characters.
 * Each character defines:
 * - neckX: horizontal center X of the cartoon neck
 * - chinY: top of the cartoon neck (chin boundary)
 * - neckY: base of the cartoon neck (collar boundary)
 * - neckHW: half-width of the neck column
 * - isProp: function (x, y) to protect props
 * - cleanRecord: optional vinyl record restorative settings
 */
const SPECS = {
  'boy/moon': {
    neckX: 202,
    chinY: 285,
    neckY: 326,
    neckHW: 28,
    isProp: (x, y) => (x > 336 && y > 165 && !(y < 270 && x < 360)) || (x > 450),
  },
  'girl/moon': {
    neckX: 200,
    chinY: 292,
    neckY: 332,
    neckHW: 28,
    isProp: (x, y) => x >= 335 && y >= Math.round(330 - (x - 340) * 0.55),
  },
  'boy/radio': {
    neckX: 300,
    chinY: 295,
    neckY: 345,
    neckHW: 28,
    isProp: (x, y) => x < 225 && y > 30, // Boombox on left shoulder
  },
  'girl/radio': {
    neckX: 290,
    chinY: 295,
    neckY: 345,
    neckHW: 28,
    isProp: (x, y) => x < 210 && y > 30, // Boombox on left shoulder
  },
  'boy/sales': {
    neckX: 318,
    chinY: 288,
    neckY: 334,
    neckHW: 28,
    cleanRecord: { cx: 148.4, cy: 395.4, r: 147.5 },
    isProp: (x, y) => ((x - 148.4) ** 2 + (y - 395.4) ** 2 <= 147.5 ** 2),
  },
  'girl/sales': {
    neckX: 340,
    chinY: 295,
    neckY: 340,
    neckHW: 28,
    isProp: (x, y) => x < 280 && y > 335, // Hand on top of LP
  },
  'boy/billboard': {
    neckX: 232,
    chinY: 285,
    neckY: 325,
    neckHW: 28,
    isProp: (x, y) => x < 160 && y > 240, // Thumbs up
  },
  'girl/billboard': {
    neckX: 238,
    chinY: 295,
    neckY: 345,
    neckHW: 28,
    isProp: (x, y) => x < 140 && y > 240, // Thumbs up
  },
  'boy/news': {
    neckX: 275,
    chinY: 285,
    neckY: 325,
    neckHW: 28,
    isProp: (x, y) => x > 360 && y > 150, // Newspaper
  },
  'girl/news': {
    neckX: 290,
    chinY: 295,
    neckY: 335,
    neckHW: 28,
    isProp: (x, y) => x > 370 && y > 150, // Newspaper
  },
  'boy/cinema': {
    neckX: 200,
    chinY: 345,
    neckY: 385,
    neckHW: 28,
    isProp: (x, y) =>
      (x < 170 && y > 460) || // Popcorn
      (x > 345 && y >= 290 && y <= 375) || // Waving hand
      (x > 230 && y >= (385 - (x - 230) * 0.25)), // Raised arm & sleeve
  },
  'girl/cinema': {
    neckX: 200,
    chinY: 295,
    neckY: 345,
    neckHW: 28,
    isProp: (x, y) => (x < 170 && y > 300) || (x > 280 && y > 230), // Popcorn left, waving hand right
  },
  'boy/stats': {
    neckX: 238,
    chinY: 295,
    neckY: 335,
    neckHW: 28,
    isProp: (x, y) => (x < 190 && y > 200) || (x > 380 && y > 220), // Stopwatch left, chart right
  },
  'girl/stats': {
    neckX: 242,
    chinY: 290,
    neckY: 330,
    neckHW: 28,
    isProp: (x, y) => (x < 170 && y > 200) || (x > 360 && y > 220), // Stopwatch left, chart right
  },
  'boy/intro': {
    neckX: 550,
    chinY: 350,
    neckY: 395,
    neckHW: 30,
    isProp: (x, y) => x < 390 || (x > 690 && y > 200), // Balloons left, waving hand right
  },
  'girl/intro': {
    neckX: 345,
    chinY: 315,
    neckY: 355,
    neckHW: 30,
    isProp: (x, y) => (x < 220 && y > 410) || x > 510, // Waving hand left, balloons right
  },
  'boy/summary': {
    neckX: 275,
    chinY: 345,
    neckY: 385,
    neckHW: 28,
    isProp: (x, y) => (x < 150 && y > 20) || (x > 410 && y > 350), // Trophy left, raised fist right
  },
  'girl/summary': {
    neckX: 230,
    chinY: 315,
    neckY: 345,
    neckHW: 28,
    isProp: (x, y) => (x < 150 && y > 350) || (x > 240 && y > 20), // Raised fist left, trophy right
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

  const chinY = spec.chinY;
  const neckHW = spec.neckHW || 28;
  const shoulderTransition = spec.shoulderTransition || 16;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;

      // Handle vinyl record restorative fill for boy/sales if configured
      if (spec.cleanRecord) {
        const { cx, cy, r } = spec.cleanRecord;
        const distSq = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        if (distSq <= r * r) {
          const red = data[idx];
          const blue = data[idx + 2];
          if (y < 320 && x > 180 && (red > blue + 5 || red > 120)) {
            const dist = Math.sqrt(distSq);
            const groove = Math.sin(dist * 0.8) * 10;
            const v = Math.max(12, Math.min(42, Math.round(24 + groove)));
            out[idx] = v;
            out[idx + 1] = v;
            out[idx + 2] = v + 3;
            out[idx + 3] = 255;
          }
          continue; // Keep the record intact
        }
      }

      // Check if pixel belongs to a protected prop
      if (spec.isProp && spec.isProp(x, y)) {
        continue;
      }

      // Cut head region above shoulders / collar:
      if (y < spec.neckY + 10) {
        const dx = Math.abs(x - spec.neckX);

        if (dx <= neckHW) {
          // Central neck column: preserve the 3D cartoon neck between chin and collar!
          if (y < chinY) {
            out[idx + 3] = 0; // Cut only above chin
          }
        } else if (dx <= neckHW + shoulderTransition) {
          // Smooth slope from neck to shoulder
          const t = (dx - neckHW) / shoulderTransition;
          const cutY = chinY * (1 - t) + spec.neckY * t;
          if (y < cutY) {
            out[idx + 3] = 0;
          }
        } else {
          // Outside neck column (ears, hair, cheeks): cut down to collar/shoulder line
          if (y < spec.neckY) {
            out[idx + 3] = 0;
          }
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

  console.log(`[OK] Headless character with neck preserved saved: ${outPath}`);
}

async function main() {
  for (const [key, spec] of Object.entries(SPECS)) {
    await processImage(key, spec);
  }
  console.log('All 18 headless characters generated successfully with intact 3D necks.');
}

main().catch(console.error);
