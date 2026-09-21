const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function makeTransparent(inputPath, threshold = 22, feather = 48) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const maxVal = Math.max(data[i], data[i+1], data[i+2]);
    if (maxVal < threshold) {
      data[i+3] = 0;
    } else if (maxVal < feather) {
      data[i+3] = Math.floor(((maxVal - threshold) / (feather - threshold)) * 255);
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

async function extractCharacter(inputPath, gender) {
  // Extract character figure: for boy/girl, crop out the telescope on the right side if needed, or keep upper body / full body
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // For boy: character center is x: 490. Right boundary ~630.
  // For girl: character center is x: 480. Right boundary ~630.
  const maxXCut = gender === 'boy' ? 640 : 645;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const maxVal = Math.max(data[idx], data[idx+1], data[idx+2]);
      
      // Black background
      if (maxVal < 22) {
        data[idx+3] = 0;
      } else if (maxVal < 48) {
        data[idx+3] = Math.floor(((maxVal - 22) / 26) * 255);
      }

      // Cut out telescope to isolate the character body for themed slides
      if (x > maxXCut) {
        data[idx+3] = 0;
      }
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

// Generate SVG props
function createBoomboxSvg(width = 380, height = 240) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3a3d4d"/>
          <stop offset="50%" stop-color="#1e2029"/>
          <stop offset="100%" stop-color="#12131a"/>
        </linearGradient>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>
      <!-- Handle -->
      <path d="M 90 40 L 90 12 L 290 12 L 290 40" fill="none" stroke="url(#silverGrad)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Main Boombox Body -->
      <rect x="15" y="40" width="350" height="190" rx="14" fill="url(#bodyGrad)" stroke="#52576b" stroke-width="4"/>
      <!-- Speakers -->
      <circle cx="85" cy="140" r="54" fill="#0f1015" stroke="#ffe600" stroke-width="5"/>
      <circle cx="85" cy="140" r="42" fill="#181a24" stroke="#475569" stroke-width="3"/>
      <circle cx="85" cy="140" r="18" fill="#ffe600"/>
      <circle cx="295" cy="140" r="54" fill="#0f1015" stroke="#ffe600" stroke-width="5"/>
      <circle cx="295" cy="140" r="42" fill="#181a24" stroke="#475569" stroke-width="3"/>
      <circle cx="295" cy="140" r="18" fill="#ffe600"/>
      <!-- Cassette Tape Deck in Center -->
      <rect x="150" y="100" width="80" height="80" rx="6" fill="#08090d" stroke="#00e5ff" stroke-width="3"/>
      <rect x="158" y="112" width="64" height="42" rx="3" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
      <circle cx="175" cy="133" r="8" fill="#ffffff"/>
      <circle cx="205" cy="133" r="8" fill="#ffffff"/>
      <!-- Equalizer Display -->
      <rect x="145" y="55" width="90" height="30" rx="4" fill="#050608" stroke="#ff2a85" stroke-width="2"/>
      <rect x="152" y="65" width="8" height="14" fill="#00ff66"/>
      <rect x="165" y="61" width="8" height="18" fill="#00ff66"/>
      <rect x="178" y="58" width="8" height="21" fill="#ffe600"/>
      <rect x="191" y="63" width="8" height="16" fill="#ffe600"/>
      <rect x="204" y="60" width="8" height="19" fill="#ff3344"/>
      <rect x="217" y="68" width="8" height="11" fill="#ff3344"/>
    </svg>
  `);
}

function createVinylRecordSvg(width = 300, height = 300) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vinylGrooves" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#111115"/>
          <stop offset="40%" stop-color="#232530"/>
          <stop offset="42%" stop-color="#14151a"/>
          <stop offset="70%" stop-color="#282b37"/>
          <stop offset="72%" stop-color="#111115"/>
          <stop offset="100%" stop-color="#0a0a0d"/>
        </radialGradient>
      </defs>
      <!-- Vinyl Disc -->
      <circle cx="150" cy="150" r="142" fill="url(#vinylGrooves)" stroke="#4a4e61" stroke-width="3"/>
      <!-- Grooves Rings -->
      <circle cx="150" cy="150" r="128" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
      <circle cx="150" cy="150" r="114" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
      <circle cx="150" cy="150" r="98" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
      <circle cx="150" cy="150" r="82" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
      <!-- Gold Record Label -->
      <circle cx="150" cy="150" r="56" fill="#ffe600" stroke="#b45309" stroke-width="3"/>
      <circle cx="150" cy="150" r="48" fill="#d97706"/>
      <circle cx="150" cy="150" r="12" fill="#000000"/>
      <!-- 80s Label Text -->
      <text x="150" y="132" font-family="sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">TOP 1 HIT</text>
      <text x="150" y="174" font-family="monospace" font-size="9" font-weight="700" fill="#ffe600" text-anchor="middle">PLATINUM</text>
    </svg>
  `);
}

function createTrophySvg(width = 260, height = 320) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 260 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff4b8"/>
          <stop offset="30%" stop-color="#ffe600"/>
          <stop offset="70%" stop-color="#d4af37"/>
          <stop offset="100%" stop-color="#996515"/>
        </linearGradient>
      </defs>
      <!-- Base Plinth -->
      <rect x="70" y="270" width="120" height="42" rx="6" fill="#151720" stroke="#d4af37" stroke-width="3"/>
      <rect x="85" y="248" width="90" height="24" rx="4" fill="#2d3040" stroke="#ffe600" stroke-width="2"/>
      <text x="130" y="296" font-family="sans-serif" font-size="12" font-weight="900" fill="#ffe600" text-anchor="middle">VIP 1980s</text>
      <!-- Stem -->
      <rect x="118" y="190" width="24" height="60" rx="3" fill="url(#goldGrad)"/>
      <!-- Cup Body -->
      <path d="M 60 40 L 200 40 C 200 130 170 190 130 190 C 90 190 60 130 60 40 Z" fill="url(#goldGrad)" stroke="#fff" stroke-width="2"/>
      <!-- Cup Handles -->
      <path d="M 62 60 C 20 60 20 130 68 135" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
      <path d="M 198 60 C 240 60 240 130 192 135" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
      <!-- Big Shining Star -->
      <polygon points="130,70 138,95 164,95 143,110 151,135 130,120 109,135 117,110 96,95 122,95" fill="#ffffff" stroke="#ffe600" stroke-width="2"/>
    </svg>
  `);
}

function createBirthdayBalloonSvg(width = 240, height = 340) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="balloonGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="25%" stop-color="#ff2a85"/>
          <stop offset="70%" stop-color="#cc0055"/>
          <stop offset="100%" stop-color="#66002b"/>
        </radialGradient>
        <radialGradient id="balloonGrad2" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="25%" stop-color="#ffe600"/>
          <stop offset="70%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </radialGradient>
      </defs>
      <!-- String -->
      <path d="M 110 200 Q 90 260 130 330" fill="none" stroke="#e2e8f0" stroke-width="2.5" stroke-dasharray="4,3"/>
      <path d="M 145 190 Q 170 250 130 330" fill="none" stroke="#ffe600" stroke-width="2.5"/>
      <!-- Gold Balloon -->
      <ellipse cx="145" cy="120" rx="55" ry="68" fill="url(#balloonGrad2)"/>
      <polygon points="142,186 148,186 145,195" fill="#d97706"/>
      <!-- Pink Neon Balloon -->
      <ellipse cx="95" cy="110" rx="60" ry="75" fill="url(#balloonGrad)"/>
      <polygon points="92,182 98,182 95,192" fill="#cc0055"/>
      <text x="95" y="118" font-family="sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">80s</text>
    </svg>
  `);
}

async function run() {
  const genders = ['boy', 'girl'];
  
  // 1. Prepare cutouts with transparent backgrounds
  const astrolabeBuf = await makeTransparent('public/cutouts/astrolabe_cutout.jpg', 22, 50);
  const cinemaBuf = await makeTransparent('public/cutouts/cinema_cutout.jpg', 20, 45);
  const headphonesBuf = await makeTransparent('public/cutouts/headphones_cutout.jpg', 25, 55);
  const pressBuf = await makeTransparent('public/cutouts/press_cutout.jpg', 22, 50);

  // 2. Prepare SVG props
  const boomboxBuf = await sharp(createBoomboxSvg()).png().toBuffer();
  const vinylBuf = await sharp(createVinylRecordSvg()).png().toBuffer();
  const trophyBuf = await sharp(createTrophySvg()).png().toBuffer();
  const balloonBuf = await sharp(createBirthdayBalloonSvg()).png().toBuffer();

  for (const g of genders) {
    const origPath = `public/characters/${g}/moon.jpg`;
    
    // Theme 1: Moon (Original with telescope, already generated)
    // boy/moon.png and girl/moon.png are already generated.

    // Base character without the telescope
    const charBaseBuf = await extractCharacter(origPath, g);
    
    // Let's create an 1024x1024 canvas for each theme
    // Theme 2: Billboard (with big 80s headphones)
    const hpResized = await sharp(headphonesBuf).resize(360, 360, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: hpResized, top: 400, left: 530 }])
      .png()
      .toFile(`public/characters/${g}/billboard.png`);

    // Theme 3: Cinema (with 3D glasses / tickets)
    const cinemaResized = await sharp(cinemaBuf).resize(380, 380, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: cinemaResized, top: 380, left: 520 }])
      .png()
      .toFile(`public/characters/${g}/cinema.png`);

    // Theme 4: News (with newspaper & Polaroid camera)
    const pressResized = await sharp(pressBuf).resize(380, 380, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: pressResized, top: 400, left: 520 }])
      .png()
      .toFile(`public/characters/${g}/news.png`);

    // Theme 5: Stats (with cosmic astrolabe / stopwatch)
    const astrolabeResized = await sharp(astrolabeBuf).resize(380, 380, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: astrolabeResized, top: 390, left: 520 }])
      .png()
      .toFile(`public/characters/${g}/stats.png`);

    // Theme 6: Radio (with retro boombox)
    const bbResized = await sharp(boomboxBuf).resize(360, 240, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: bbResized, top: 450, left: 530 }])
      .png()
      .toFile(`public/characters/${g}/radio.png`);

    // Theme 7: Sales (with vinyl LP record)
    const vinylResized = await sharp(vinylBuf).resize(320, 320, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: vinylResized, top: 420, left: 540 }])
      .png()
      .toFile(`public/characters/${g}/sales.png`);

    // Theme 8: Summary (with VIP gold trophy)
    const trophyResized = await sharp(trophyBuf).resize(320, 390, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: trophyResized, top: 380, left: 530 }])
      .png()
      .toFile(`public/characters/${g}/summary.png`);

    // Theme 9: Intro (with 80s party balloons)
    const balloonResized = await sharp(balloonBuf).resize(320, 450, { fit: 'inside' }).toBuffer();
    await sharp(charBaseBuf)
      .composite([{ input: balloonResized, top: 260, left: 550 }])
      .png()
      .toFile(`public/characters/${g}/intro.png`);

    console.log(`Generated all 9 themes for ${g}!`);
  }
}

run().catch(console.error);
