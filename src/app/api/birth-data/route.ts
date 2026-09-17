import { NextRequest, NextResponse } from 'next/server';
import { getCachedBirthData, saveCachedBirthData } from '@/lib/cache';
import { computeAstronomyAndStats } from '@/lib/astronomy';
import { getMusicForDate, enrichMusicWithCovers } from '@/lib/music';
import { getNewsForDate } from '@/lib/news';
import { getPopCultureForDate } from '@/lib/popculture';
import {
  fetchExactWikipediaEvents,
  fetchNasaApod,
  fetchGeminiDailyGrounding,
} from '@/lib/historical-resolver';
import { getExactWeeklyBillboardHit } from '@/lib/billboard-weekly';
import { BirthDataPayload, NewsItem, MusicTrack } from '@/types/universario';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');
  const name = searchParams.get('name') || undefined;

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json(
      { error: 'Data inválida. Forneça o formato YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  return handleBirthDataRequest(dateStr, name);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date: dateStr, name } = body;

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json(
        { error: 'Data inválida. Forneça o formato YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    return handleBirthDataRequest(dateStr, name);
  } catch {
    return NextResponse.json(
      { error: 'Corpo da requisição inválido.' },
      { status: 400 }
    );
  }
}

async function handleBirthDataRequest(dateStr: string, name?: string) {
  // 1. Check cache first
  const cached = getCachedBirthData(dateStr);
  if (cached) {
    if (name && cached.name !== name) {
      return NextResponse.json({ ...cached, name, isCached: true });
    }
    return NextResponse.json(cached);
  }

  // 2. Parse date components
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Validate date is realistic
  if (year < 1920 || year > new Date().getFullYear()) {
    return NextResponse.json(
      { error: 'Ano fora do intervalo suportado (1920 até hoje).' },
      { status: 400 }
    );
  }

  // 3. Compute Base Astronomy & Stats
  const { astronomy, stats, dayOfWeek, formattedDate, dayOfMonth, monthName } =
    computeAstronomyAndStats(dateStr);

  // 4. Parallel High-Granularity Historical Extraction
  const [geminiData, exactWikiEvents, apodData, weeklyBillboard] = await Promise.all([
    fetchGeminiDailyGrounding(dateStr, formattedDate, year),
    fetchExactWikipediaEvents(month, day, year),
    fetchNasaApod(dateStr),
    getExactWeeklyBillboardHit(year, month, day),
  ]);

  // Attach NASA APOD if available
  if (apodData) {
    astronomy.nasaApod = apodData;
    astronomy.skyHighlight = `NASA APOD do dia: "${apodData.title}". ${astronomy.skyHighlight}`;
  }

  // 5. Music Charts (Weekly Billboard Hit + Brazilian Month/Week Hit)
  let music = getMusicForDate(year, month);

  // Exact weekly Billboard #1 from Wikipedia archive or Gemini
  if (weeklyBillboard) {
    const updatedWeeklyHit: MusicTrack = {
      title: weeklyBillboard.title,
      artist: weeklyBillboard.artist,
      year,
      highlight: weeklyBillboard.highlight || `#1 da Billboard Hot 100 na semana de nascimento`,
      genre: 'Pop / Hot 100',
      position: 1,
      chartContext: 'Billboard Hot 100 (EUA / Internacional)',
    };

    const updatedBillboardTop5 = [
      updatedWeeklyHit,
      ...music.billboardTop5.filter((t) => t.title.toLowerCase() !== updatedWeeklyHit.title.toLowerCase()).slice(0, 4),
    ].map((t, i) => ({ ...t, position: i + 1 }));

    music = {
      ...music,
      globalTopTrack: updatedWeeklyHit,
      billboardTop5: updatedBillboardTop5,
      categories: (music.categories || []).map((cat) => {
        if (cat.id === 'billboard') {
          return { ...cat, tracks: updatedBillboardTop5 };
        }
        return cat;
      }),
    };
  }

  if (geminiData?.exactGlobalHit) {
    music = {
      ...music,
      globalTopTrack: {
        ...music.globalTopTrack,
        title: geminiData.exactGlobalHit.title || music.globalTopTrack.title,
        artist: geminiData.exactGlobalHit.artist || music.globalTopTrack.artist,
        highlight: geminiData.exactGlobalHit.highlight || music.globalTopTrack.highlight,
      },
      brazilTopTrack: geminiData.exactBrazilHit
        ? {
            ...music.brazilTopTrack,
            title: geminiData.exactBrazilHit.title || music.brazilTopTrack.title,
            artist: geminiData.exactBrazilHit.artist || music.brazilTopTrack.artist,
            highlight: geminiData.exactBrazilHit.highlight || music.brazilTopTrack.highlight,
          }
        : music.brazilTopTrack,
    };
  }

  // Enrich #1 tracks with verified high-res album covers
  music = await enrichMusicWithCovers(music);


  // 6. Pop Culture & Movies
  let popCulture = getPopCultureForDate(year);
  if (geminiData?.exactPopCulture?.topMovie?.title) {
    popCulture = {
      ...popCulture,
      topMovie: {
        ...popCulture.topMovie,
        title: geminiData.exactPopCulture.topMovie.title,
        director: geminiData.exactPopCulture.topMovie.director || popCulture.topMovie.director,
        funFact: geminiData.exactPopCulture.topMovie.funFact || popCulture.topMovie.funFact,
      },
      topBrazilianTVOrCulture:
        geminiData.exactPopCulture.topBrazilianTVOrCulture || popCulture.topBrazilianTVOrCulture,
      techMilestone: geminiData.exactPopCulture.techMilestone || popCulture.techMilestone,
      nostalgiaItems:
        geminiData.exactPopCulture.nostalgiaItems && geminiData.exactPopCulture.nostalgiaItems.length > 0
          ? geminiData.exactPopCulture.nostalgiaItems
          : popCulture.nostalgiaItems,
    };
  }

  // 7. News & Historical Events: Exact Day Priority
  let news: NewsItem[] = [];

  if (geminiData?.exactNews && geminiData.exactNews.length > 0) {
    news = geminiData.exactNews;
  } else if (exactWikiEvents.length > 0) {
    // Exact day events from Wikipedia
    news = exactWikiEvents.slice(0, 3);
    // If fewer than 3, complete with curated events
    if (news.length < 3) {
      const fallbackNews = getNewsForDate(year, month, day, []);
      for (const fn of fallbackNews) {
        if (news.length < 3 && !news.some((n) => n.title === fn.title)) {
          news.push(fn);
        }
      }
    }
  } else {
    news = getNewsForDate(year, month, day, []);
  }

  // 8. Assemble complete payload
  const payload: BirthDataPayload = {
    birthDate: dateStr,
    name: name?.trim() || undefined,
    formattedDate,
    dayOfWeek,
    dayOfMonth,
    monthName,
    year,
    astronomy,
    music,
    news,
    popCulture,
    stats,
    generatedAt: new Date().toISOString(),
    isCached: false,
  };

  // 9. Save to cache
  saveCachedBirthData(dateStr, payload);

  return NextResponse.json(payload);
}

