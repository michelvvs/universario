import fs from 'fs';
import path from 'path';
import { MusicTrack } from '@/types/universario';

const CHARTS_CACHE_DIR = path.join(process.cwd(), 'data', 'charts');

interface WeeklyChartEntry {
  dateStr: string; // YYYY-MM-DD
  title: string;
  artist: string;
}

function ensureChartsCacheDir() {
  try {
    if (!fs.existsSync(CHARTS_CACHE_DIR)) {
      fs.mkdirSync(CHARTS_CACHE_DIR, { recursive: true });
    }
  } catch {}
}

const memoryWeeklyCache = new Map<number, WeeklyChartEntry[]>();

export async function getExactWeeklyBillboardHit(
  year: number,
  month: number,
  day: number
): Promise<MusicTrack | null> {
  const weeklyList = await getOrFetchBillboardYearChart(year);
  if (!weeklyList || weeklyList.length === 0) {
    return null;
  }

  const targetDate = new Date(Date.UTC(year, month - 1, day));
  let bestEntry = weeklyList[0];

  for (const entry of weeklyList) {
    const entryDate = new Date(entry.dateStr);
    if (entryDate <= targetDate) {
      bestEntry = entry;
    }
  }

  if (!bestEntry) return null;

  return {
    title: bestEntry.title,
    artist: bestEntry.artist,
    year,
    highlight: `#1 na Billboard Hot 100 na semana de ${bestEntry.dateStr.split('-').reverse().join('/')}`,
    genre: 'Pop / Hot 100',
  };
}

export async function getOrFetchBillboardYearChart(year: number): Promise<WeeklyChartEntry[]> {
  // 1. Check memory cache
  if (memoryWeeklyCache.has(year)) {
    return memoryWeeklyCache.get(year)!;
  }

  // 2. Check disk cache
  ensureChartsCacheDir();
  const filePath = path.join(CHARTS_CACHE_DIR, `billboard_${year}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content) as WeeklyChartEntry[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryWeeklyCache.set(year, parsed);
        return parsed;
      }
    } catch {}
  }

  // 3. Fetch from Wikipedia REST API
  const titles = [
    `List_of_Billboard_Hot_100_number-one_singles_of_${year}`,
    `List_of_Billboard_Hot_100_number_ones_of_${year}`,
    `List_of_Billboard_Hot_100_number_1_singles_of_${year}`,
    `List_of_Billboard_number-one_singles_of_${year}`,
  ];

  let html = '';
  for (const title of titles) {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/html/${title}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'UniversarioApp/1.0 (contact@universario.app)' },
        next: { revalidate: 604800 },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        html = await res.text();
        break;
      }
    } catch {}
  }

  if (!html) return [];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const rows = [...html.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((m) => m[0]);
  const weekly: WeeklyChartEntry[] = [];

  let currentSong = '';
  let currentArtist = '';

  for (const row of rows) {
    let foundDate: Date | null = null;

    for (let m = 0; m < monthNames.length; m++) {
      const mName = monthNames[m];
      const match = row.match(
        new RegExp(`<td[^>]*>[^<]*\\b(${mName})\\s+(\\d{1,2})[^<]*<\\/td>`, 'i')
      );
      if (match) {
        const dayNum = parseInt(match[2], 10);
        foundDate = new Date(Date.UTC(year, m, dayNum));
        break;
      }
    }

    if (!foundDate) continue;

    const cells = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);

    for (let c = 0; c < cells.length; c++) {
      const cellHtml = cells[c];
      const cellText = cellHtml
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .trim();

      // Check if clean cell text contains a song in quotes: "Song Title"
      const quoteMatch = cellText.match(/["“]([^"“”]+)["”]/);
      if (quoteMatch) {
        const cleanSong = quoteMatch[1]
          .replace(/\s*\(song\)/gi, '')
          .replace(/\[\d+\]/g, '')
          .trim();

        if (
          cleanSong.length > 1 &&
          !cleanSong.startsWith('#') &&
          !cleanSong.startsWith('mw') &&
          !cleanSong.includes('wikitable') &&
          !cleanSong.includes('bgcolor')
        ) {
          currentSong = cleanSong;
        }

        // The next cell is typically the artist
        if (c + 1 < cells.length) {
          const artistCell = cells[c + 1]
            .replace(/<sup[\s\S]*?<\/sup>/gi, '')
            .replace(/<[^>]+>/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/\s*\([^)]+\)/g, '')
            .replace(/\[\d+\]/g, '')
            .trim();

          if (
            artistCell &&
            !artistCell.includes('Billboard') &&
            !artistCell.includes('Ref') &&
            artistCell !== currentSong &&
            !artistCell.match(/^\d+$/)
          ) {
            currentArtist = artistCell;
          }
        }
      }
    }



    if (foundDate && currentSong) {
      weekly.push({
        dateStr: foundDate.toISOString().slice(0, 10),
        title: currentSong,
        artist: currentArtist || 'Artista Internacional',
      });
    }


  }

  // Save parsed year chart
  if (weekly.length > 0) {
    try {
      ensureChartsCacheDir();
      memoryWeeklyCache.set(year, weekly);
      fs.writeFileSync(filePath, JSON.stringify(weekly, null, 2), 'utf-8');
    } catch {}
  }

  return weekly;
}
