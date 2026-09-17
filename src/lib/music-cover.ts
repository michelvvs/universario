import fs from 'fs';
import path from 'path';

export interface MusicMedia {
  coverUrl?: string;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  audioPreviewUrl?: string;
}

const MEDIA_CACHE_FILE = path.join(process.cwd(), 'data', 'charts', 'covers_cache.json');
const memoryMediaCache = new Map<string, MusicMedia>();

function ensureCacheDir() {
  try {
    const dir = path.dirname(MEDIA_CACHE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {}
}

function loadDiskCache() {
  try {
    if (fs.existsSync(MEDIA_CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(MEDIA_CACHE_FILE, 'utf-8'));
      for (const [k, v] of Object.entries(data)) {
        if (typeof v === 'string') {
          // Backward compatibility: old format was just cover string
          memoryMediaCache.set(k, { coverUrl: v });
        } else if (v && typeof v === 'object') {
          memoryMediaCache.set(k, v as MusicMedia);
        }
      }
    }
  } catch {}
}

function saveDiskCache() {
  try {
    ensureCacheDir();
    const obj: Record<string, MusicMedia> = {};
    memoryMediaCache.forEach((v, k) => {
      obj[k] = v;
    });
    fs.writeFileSync(MEDIA_CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch {}
}

// Load disk cache on start
loadDiskCache();

// Curated high quality verified media for key historical records
const KNOWN_MEDIA: Record<string, MusicMedia> = {
  'paula abdul:forever your girl': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/f4/bd/1bf4bd7d-ac7b-66dc-ba10-7ff8690511f1/14ULAIM00404.rgb.jpg/600x600bb.jpg',
    youtubeVideoId: 'NAAVdUlnshA',
    youtubeUrl: 'https://www.youtube.com/watch?v=NAAVdUlnshA',
  },
  'cazuza:o tempo não pára': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/00/d0/52/00d052a2-46b0-6270-170b-c82fffd61227/7891430823078.jpg/600x600bb.jpg',
    youtubeVideoId: 'Sv4leue_rlE',
    youtubeUrl: 'https://www.youtube.com/watch?v=Sv4leue_rlE',
  },
  'nenhum de nós:astronauta de mármore': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/97/b3/61/97b3611e-850c-b2d1-7be7-cb5287e6d17f/886446168098.jpg/600x600bb.jpg',
    youtubeVideoId: '5r4i5MNRtgI',
    youtubeUrl: 'https://www.youtube.com/watch?v=5r4i5MNRtgI',
  },
  'madonna:like a prayer': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/58/b0/cb/58b0cb11-923f-4e08-9df5-6e3e5b306a4b/081227973544.jpg/600x600bb.jpg',
    youtubeVideoId: 'zz_yJrQ5u5o',
    youtubeUrl: 'https://www.youtube.com/watch?v=zz_yJrQ5u5o',
  },
  'guns n\' roses:patience': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1f/03/99/1f03998f-cb32-84b8-2708-ebafc83cebb8/00602567709320.rgb.jpg/600x600bb.jpg',
    youtubeVideoId: 'ErvgV4P6Fzc',
    youtubeUrl: 'https://www.youtube.com/watch?v=ErvgV4P6Fzc',
  },
  'michael jackson:billie jean': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3d/9d/38/3d9d3811-71f0-3a0e-1ada-3004e56ff852/886445597301.jpg/600x600bb.jpg',
    youtubeVideoId: 'Kr4EQDVETuA',
    youtubeUrl: 'https://www.youtube.com/watch?v=Kr4EQDVETuA',
  },
  'michael jackson:thriller': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/3d/9d/38/3d9d3811-71f0-3a0e-1ada-3004e56ff852/886445597301.jpg/600x600bb.jpg',
    youtubeVideoId: 'sOnqjkJTMaA',
    youtubeUrl: 'https://www.youtube.com/watch?v=sOnqjkJTMaA',
  },
  'the beatles:hey jude': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/1d/15/8e/1d158e04-d534-1c6e-ef8d-6a68393e18a8/00602547567902.rgb.jpg/600x600bb.jpg',
    youtubeVideoId: 'A_MjCqQoLLA',
    youtubeUrl: 'https://www.youtube.com/watch?v=A_MjCqQoLLA',
  },
  'queen:bohemian rhapsody': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b8/b5/45/b8b545f1-f09c-e369-1c97-6a1c1d9dfd70/00602547202698.rgb.jpg/600x600bb.jpg',
    youtubeVideoId: 'fJ9rUzIMcZQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
  },
  'legião urbana:será': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/83/87/09/8387095b-018f-a9cb-b295-a185121bcde6/00724353457551.jpg/600x600bb.jpg',
    youtubeVideoId: '1LcLb0kE3Y8',
    youtubeUrl: 'https://www.youtube.com/watch?v=1LcLb0kE3Y8',
  },
  'mamonas assassinas:pelados em santos': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/c9/a7/8fc9a7ea-0dfd-9b51-0c46-ea12fae2eec0/00724383416221.jpg/600x600bb.jpg',
    youtubeVideoId: '8aN8K317W8c',
    youtubeUrl: 'https://www.youtube.com/watch?v=8aN8K317W8c',
  },
  'marisa monte:amor i love you': {
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/9f/61/919f61b0-46eb-5d9c-dfba-2792ae5e1823/0724352726658.jpg/600x600bb.jpg',
    youtubeVideoId: '2b73mI3Y444',
    youtubeUrl: 'https://www.youtube.com/watch?v=2b73mI3Y444',
  },
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

/**
 * Resolves YouTube Video ID by scraping official video ID or search result
 */
export async function fetchYouTubeVideoId(title: string, artist: string): Promise<string | null> {
  const cleanTitle = title.replace(/["“”]/g, '').trim();
  const cleanArtist = artist.replace(/feat\..*/i, '').trim();
  const query = `${cleanArtist} ${cleanTitle} official audio`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const html = await res.text();
      // Match first /watch?v=11charID
      const match = html.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch {}

  return null;
}

/**
 * Fetches Cover, YouTube ID and Audio preview in parallel
 */
export async function fetchMusicMedia(title: string, artist: string): Promise<MusicMedia> {
  const cacheKey = normalizeKey(title, artist);

  // 1. Check known catalog
  const known = KNOWN_MEDIA[cacheKey];
  if (known && known.coverUrl && known.youtubeVideoId) {
    return known;
  }

  // 2. Check memory/disk cache
  const cached = memoryMediaCache.get(cacheKey);
  if (cached && cached.coverUrl && cached.youtubeVideoId) {
    return cached;
  }

  const result: MusicMedia = {
    coverUrl: known?.coverUrl || cached?.coverUrl,
    youtubeVideoId: known?.youtubeVideoId || cached?.youtubeVideoId,
    youtubeUrl: known?.youtubeUrl || cached?.youtubeUrl,
    audioPreviewUrl: known?.audioPreviewUrl || cached?.audioPreviewUrl,
  };

  // Clean strings
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

  // Parallel fetch: Apple iTunes + YouTube Video ID
  const tasks: Promise<void>[] = [];

  // Task 1: Apple iTunes (cover + audio preview)
  if (!result.coverUrl || !result.audioPreviewUrl) {
    tasks.push(
      (async () => {
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
            });
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              if (data.resultCount > 0 && data.results[0]) {
                const item = data.results[0];
                if (item.artworkUrl100 && !result.coverUrl) {
                  result.coverUrl = item.artworkUrl100.replace(/100x100bb\.jpg/i, '600x600bb.jpg');
                }
                if (item.previewUrl && !result.audioPreviewUrl) {
                  result.audioPreviewUrl = item.previewUrl;
                }
                if (result.coverUrl) break;
              }
            }
          } catch {}
        }
      })()
    );
  }

  // Task 2: YouTube Video ID
  if (!result.youtubeVideoId) {
    tasks.push(
      (async () => {
        const ytId = await fetchYouTubeVideoId(cleanTitle, cleanArtist);
        if (ytId) {
          result.youtubeVideoId = ytId;
          result.youtubeUrl = `https://www.youtube.com/watch?v=ytId`;
        }
      })()
    );
  }

  await Promise.allSettled(tasks);

  // Cache final result
  memoryMediaCache.set(cacheKey, result);
  saveDiskCache();

  return result;
}

export async function fetchMusicCoverUrl(title: string, artist: string): Promise<string | null> {
  const media = await fetchMusicMedia(title, artist);
  return media.coverUrl || null;
}
