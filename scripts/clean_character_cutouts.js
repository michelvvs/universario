const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function cleanImage(filePath) {
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // 1. Mark candidate background / shadow pixels
  const isLightOrShadow = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx + 3] > 0) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const minVal = Math.min(r, g, b);
        const maxVal = Math.max(r, g, b);
        const diff = maxVal - minVal;

        // Neutral light background (R~G~B > 205)
        if (minVal > 205 && diff < 26) {
          isLightOrShadow[y * w + x] = 1;
        }
        // Neutral ground shadow near the bottom (R~G~B > 160 near floor)
        else if (y > h - 45 && minVal > 160 && diff < 26) {
          isLightOrShadow[y * w + x] = 1;
        }
      }
    }
  }

  // 2. Connected component analysis
  const visited = new Uint8Array(w * h);
  const toClear = new Uint8Array(w * h);
  let clearedCount = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const startIdx = y * w + x;
      if (isLightOrShadow[startIdx] && !visited[startIdx]) {
        const queue = [x, y];
        const comp = [startIdx];
        visited[startIdx] = 1;

        let minX = x, maxX = x, minY = y, maxY = y;
        let head = 0;

        while (head < queue.length) {
          const cx = queue[head++];
          const cy = queue[head++];
          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;

          const nbrs = [
            [cx - 1, cy], [cx + 1, cy],
            [cx, cy - 1], [cx, cy + 1]
          ];
          for (const [nx, ny] of nbrs) {
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nidx = ny * w + nx;
              if (isLightOrShadow[nidx] && !visited[nidx]) {
                visited[nidx] = 1;
                queue.push(nx, ny);
                comp.push(nidx);
              }
            }
          }
        }

        const size = comp.length;
        const isBottomShadow = maxY >= h - 12;
        const isEdgeResidue = minX <= 2 || maxX >= w - 3 || minY <= 2;
        const isTrappedBodyHole = minY > 200 && size > 300; // Enclosed hole between limbs, legs, props

        if (isBottomShadow || isEdgeResidue || isTrappedBodyHole) {
          clearedCount += size;
          for (const p of comp) {
            toClear[p] = 1;
          }
        }
      }
    }
  }

  // 3. Apply alpha = 0 and ensure solid character alpha = 255
  for (let i = 0; i < w * h; i++) {
    const idx = i * 4;
    if (toClear[i]) {
      data[idx + 3] = 0;
    } else if (data[idx + 3] > 0) {
      data[idx + 3] = 255; // 100% Solid
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .trim()
    .png()
    .toFile(filePath);

  console.log(`[CLEANED] ${path.basename(path.dirname(filePath))}/${path.basename(filePath)}: removed ${clearedCount} trapped/shadow pixels.`);
}

async function main() {
  const genders = ['boy', 'girl'];
  for (const g of genders) {
    const dir = path.join(__dirname, '..', 'public', 'characters', g);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
    for (const f of files) {
      const p = path.join(dir, f);
      await cleanImage(p);
    }
  }
  console.log('=== ALL 18 CHARACTER IMAGES CLEANED AND SOLIDIFIED ===');
}

main().catch(console.error);
