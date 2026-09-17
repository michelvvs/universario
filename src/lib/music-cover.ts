import fs from 'fs';
import path from 'path';

const COVERS_CACHE_FILE = path.join(process.cwd(), 'data', 'charts', 'covers_cache.json');
const memoryCoverCache = new Map<string, string>();

function ensureCacheDir() {
  try {
    const dir = path.dirname(COVERS_CACHE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {}
}

function loadDiskCache() {
  try {
    if (fs.existsSync(COVERS_CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(COVERS_CACHE_FILE, 'utf-8'));
      for (const [k, v] of Object.entries(data)) {
        if (typeof v === 'string') {
          memoryCoverCache.set(k, v);
        }
      }
    }
  } catch {}
}

function saveDiskCache() {
  try {
    ensureCacheDir();
    const obj: Record<string, string> = {};
    memoryCoverCache.forEach((v, k) => {
      obj[k] = v;
    });
    fs.writeFileSync(COVERS_CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch {}
}

// Load disk cache on start
loadDiskCache();

// Curated high quality verified covers for key historical records
const KNOWN_COVERS: Record<string, string> = {
  'cazuza:o tempo não pára': 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/00/d0/52/00d052a2-46b0-6270-170b-c82fffd61227/7891430823078.jpg/600x600bb.jpg',
  'nenhum de nós:astronauta de mármore': 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/97/b3/61/97b3611e-850c-b2d1-7be7-cb5287e6d17f/886446168098.jpg/600x600bb.jpg',
  'paula abdul:forever your girl': 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/f4/bd/1bf4bd7d-ac7b-66dc-ba10-7ff8690511f1/14ULAIM00404.rgb.jpg/600x600bb.jpg',
  'madonna:like a prayer': 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/58/b0/cb/58b0cb11-923f-4e08-9df5-6e3e5b306a4b/081227973544.jpg/600x600bb.jpg',
  'guns n\' roses:patience': 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1f/03/99/1f03998f-cb32-84b8-2708-ebafc83cebb8/00602567709320.rgb.jpg/600x600bb.jpg',
  'joão gilberto:chega de saudade': 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/80/7e/cb/807ecbcf-fa22-3860-2fc1-460d9d20c54c/8436542017367.jpg/600x600bb.jpg',
  'elis regina:como nossos pais': 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d5/92/9c/d5929c29-3733-4f9a-10f8-c0b8b80b271d/042282642323.jpg/600x600bb.jpg',
  'queen:bohemian rhapsody': 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b8/b5/45/b8b545f1-f09c-e369-1c97-6a1c1d9dfd70/00602547202698.rgb.jpg/600x600bb.jpg',
  'the beatles:hey jude': 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/1d/15/8e/1d158e04-d534-1c6e-ef8d-6a68393e18a8/00602547567902.rgb.jpg/600x600bb.jpg',
  'michael jackson:billie jean': 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3d/9d/38/3d9d3811-71f0-3a0e-1ada-3004e56ff852/886445597301.jpg/600x600bb.jpg',
  'legião urbana:será': 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/83/87/09/8387095b-018f-a9cb-b295-a185121bcde6/00724353457551.jpg/600x600bb.jpg',
  'mamonas assassinas:pelados em santos': 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/c9/a7/8fc9a7ea-0dfd-9b51-0c46-ea12fae2eec0/00724383416221.jpg/600x600bb.jpg',
  'marisa monte:amor i love you': 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/9f/61/919f61b0-46eb-5d9c-dfba-2792ae5e1823/0724352726658.jpg/600x600bb.jpg',
  'sandy & junior:a lenda': 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/81/15/9b/81159b38-d687-73fe-78d1-d36df1251912/00044001306322.rgb.jpg/600x600bb.jpg',
  'the weeknd:blinding lights': 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/ef/07/2bef07e9-6f7f-d5b7-789a-0e9641772c1c/20UMGIM13437.rgb.jpg/600x600bb.jpg',
  'taylor swift:cruel summer': 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/55/94/a9/5594a955-46b0-f421-e0c9-94b122709971/19UMGIM53909.rgb.jpg/600x600bb.jpg',
};

function normalizeKey(title: string, artist: string): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/\s*\([^)]+\)/g, '')
    .replace(/["“”]/g, '')
    .replace(/\[\d+\]/g, '')
    .trim();

  const cleanArtist = artist
    .toLowerCase()
    .replace(/\s*\([^)]+\)/g, '')
    .replace(/feat\..*/i, '')
    .replace(/ft\..*/i, '')
    .trim();

  return `${cleanArtist}:${cleanTitle}`;
}

export async function fetchMusicCoverUrl(title: string, artist: string): Promise<string | null> {
  const cacheKey = normalizeKey(title, artist);

  // 1. Check known high quality catalog
  if (KNOWN_COVERS[cacheKey]) {
    return KNOWN_COVERS[cacheKey];
  }

  // 2. Check memory cache
  if (memoryCoverCache.has(cacheKey)) {
    return memoryCoverCache.get(cacheKey)!;
  }

  // 3. Clean search term for Apple iTunes Search API
  const cleanTitle = title
    .replace(/\s*\([^)]*(?:198\d|199\d|200\d|201\d|202\d|vendas|compacto|lp|cd|remaster|trilha)[^)]*\)/gi, '')
    .replace(/["“”]/g, '')
    .replace(/\[\d+\]/g, '')
    .trim();

  const cleanArtist = artist
    .replace(/\s*\([^)]*(?:polygram|philips|cbs|som livre|bmg|rca|odeon|emi|sony|universal|warner)[^)]*\)/gi, '')
    .replace(/feat\..*/i, '')
    .replace(/ft\..*/i, '')
    .trim();

  const searchQueries = [
    `${cleanArtist} ${cleanTitle}`,
    `${cleanTitle} ${cleanArtist}`,
    cleanTitle,
  ];

  for (const query of searchQueries) {
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'UniversarioApp/1.0 (contact@universario.app)' },
        next: { revalidate: 604800 },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.resultCount > 0 && data.results[0]?.artworkUrl100) {
          const rawCover = data.results[0].artworkUrl100;
          const highResCover = rawCover.replace(/100x100bb\.jpg/i, '600x600bb.jpg');

          memoryCoverCache.set(cacheKey, highResCover);
          saveDiskCache();
          return highResCover;
        }
      }
    } catch {}
  }

  return null;
}
