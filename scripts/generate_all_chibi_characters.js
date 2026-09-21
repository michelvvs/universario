const { GoogleGenAI } = require('@google/genai');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey });

const THEMES = [
  {
    id: 'moon',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Energetic dynamic pose holding a vintage brass astronomical telescope on a small tripod beside him, wearing an 80s retro space stargazer jacket and red sneakers. 3D Pixar toy style, joyful expression, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), curly hair with a star pin, big expressive eyes, facing directly front at camera with head straight. Energetic dynamic pose holding a vintage brass astronomical telescope on a small tripod beside her, wearing an 80s retro space stargazer jacket and teal sneakers. 3D Pixar toy style, joyful expression, clean solid pure white studio background.',
  },
  {
    id: 'radio',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic dancing pose carrying an iconic retro 1980s boombox cassette player on his shoulder, wearing colorful 80s windbreaker and jeans. 3D Pixar toy style, cool joyful smile, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic dancing pose carrying an iconic retro 1980s boombox cassette player on her shoulder, wearing colorful 80s neon windbreaker and sneakers. 3D Pixar toy style, cool joyful smile, clean solid pure white studio background.',
  },
  {
    id: 'sales',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic pose proudly holding a large shiny black vinyl LP record with a golden #1 center label, wearing 80s denim jacket. 3D Pixar toy style, enthusiastic proud smile, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic pose proudly holding a large shiny black vinyl LP record with a golden #1 center label, wearing 80s retro pastel jacket. 3D Pixar toy style, enthusiastic proud smile, clean solid pure white studio background.',
  },
  {
    id: 'billboard',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic superstar popstar pose wearing big chunky 1980s over-ear DJ headphones around his neck, stylish leather jacket, giving a thumbs up. 3D Pixar toy style, charismatic smile, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic superstar popstar pose wearing big chunky 1980s over-ear DJ headphones around her neck, stylish pop jacket, giving a thumbs up. 3D Pixar toy style, charismatic smile, clean solid pure white studio background.',
  },
  {
    id: 'news',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic energetic news reporter pose holding a folded vintage daily newspaper and retro Polaroid camera around neck with press badge. 3D Pixar toy style, cheerful smile, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic energetic news reporter pose holding a folded vintage daily newspaper and retro Polaroid camera around neck with press badge. 3D Pixar toy style, cheerful smile, clean solid pure white studio background.',
  },
  {
    id: 'cinema',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic movie-fan pose wearing retro red-and-blue 3D glasses on his forehead, holding a striped bucket of fluffy popcorn in one arm. 3D Pixar toy style, happy playful expression, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic movie-fan pose wearing retro red-and-blue 3D glasses on her forehead, holding a striped bucket of fluffy popcorn in one arm. 3D Pixar toy style, happy playful expression, clean solid pure white studio background.',
  },
  {
    id: 'stats',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic cosmic scientist pose holding a retro analog stopwatch in one hand and space planetary chart in the other. 3D Pixar toy style, excited smart smile, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic cosmic scientist pose holding a retro analog stopwatch in one hand and space planetary chart in the other. 3D Pixar toy style, excited smart smile, clean solid pure white studio background.',
  },
  {
    id: 'intro',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic celebratory birthday pose holding a big colorful 80s balloon cluster and waving happily, wearing retro party hat. 3D Pixar toy style, festive joyous smile, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic celebratory birthday pose holding a big colorful 80s balloon cluster and waving happily, wearing retro party hat. 3D Pixar toy style, festive joyous smile, clean solid pure white studio background.',
  },
  {
    id: 'summary',
    boyPrompt: 'Full-body 3D chibi cartoon boy with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic champion winner pose raising a shiny golden VIP star trophy triumphantly with both hands, happy victory stance. 3D Pixar toy style, clean solid pure white studio background.',
    girlPrompt: 'Full-body 3D chibi cartoon girl with an oversized head ("cabeção"), big expressive eyes, facing directly front at camera with head straight. Dynamic champion winner pose raising a shiny golden VIP star trophy triumphantly with both hands, happy victory stance. 3D Pixar toy style, clean solid pure white studio background.',
  },
];

async function floodFillCutout(buffer, outputPath) {
  const img = sharp(buffer);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;

  const outData = Buffer.alloc(w * h * 4);
  const visited = new Uint8Array(w * h);

  function isBg(x, y) {
    const idx = (y * w + x) * ch;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    return minVal > 218 && (maxVal - minVal) < 26;
  }

  const queue = [];
  function addSeed(x, y) {
    if (x >= 0 && x < w && y >= 0 && y < h && !visited[y * w + x]) {
      if (isBg(x, y)) {
        visited[y * w + x] = 1;
        queue.push(x, y);
      }
    }
  }

  for (let x = 0; x < w; x++) {
    addSeed(x, 0);
    addSeed(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    addSeed(0, y);
    addSeed(w - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx - 1, cy], [cx + 1, cy],
      [cx, cy - 1], [cx, cy + 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!visited[nidx] && isBg(nx, ny)) {
          visited[nidx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pidx = y * w + x;
      const inIdx = pidx * ch;
      const outIdx = pidx * 4;

      outData[outIdx] = data[inIdx];
      outData[outIdx + 1] = data[inIdx + 1];
      outData[outIdx + 2] = data[inIdx + 2];

      if (visited[pidx]) {
        outData[outIdx + 3] = 0; // Transparent background
      } else {
        outData[outIdx + 3] = 255; // 100% SOLID
      }
    }
  }

  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .trim()
    .png()
    .toFile(outputPath);
}

async function generateSingle(theme, gender) {
  const prompt = gender === 'boy' ? theme.boyPrompt : theme.girlPrompt;
  const outDir = path.join(__dirname, '..', 'public', 'characters', gender);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${theme.id}.png`);

  console.log(`[START] Generating ${gender}/${theme.id}...`);
  try {
    const interaction = await client.interactions.create({
      model: 'gemini-3.1-flash-image',
      input: prompt,
    });

    if (interaction.output_image && interaction.output_image.data) {
      const rawBuf = Buffer.from(interaction.output_image.data, 'base64');
      await floodFillCutout(rawBuf, outPath);
      console.log(`[DONE] ${gender}/${theme.id} saved to ${outPath}`);
    } else {
      console.error(`[ERROR] No image output for ${gender}/${theme.id}`);
    }
  } catch (err) {
    console.error(`[FAIL] ${gender}/${theme.id}:`, err.message);
  }
}

async function main() {
  for (const theme of THEMES) {
    await generateSingle(theme, 'boy');
    await generateSingle(theme, 'girl');
  }
  console.log('=== ALL CHIBI CHARACTERS GENERATED SUCCESSFULLY ===');
}

main().catch(console.error);
