import { NewsItem, MusicTrack, PopCultureData } from '@/types/universario';
import { GoogleGenAI } from '@google/genai';

interface DailyEnrichedData {
  exactNews: NewsItem[];
  exactGlobalHit?: MusicTrack;
  exactBrazilHit?: MusicTrack;
  exactPopCulture?: Partial<PopCultureData>;
  nasaApod?: { title: string; explanation: string; url?: string };
}

// 1. Fetch exact day events from Portuguese and English Wikipedia OnThisDay
export async function fetchExactWikipediaEvents(
  month: number,
  day: number,
  year: number
): Promise<NewsItem[]> {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const items: NewsItem[] = [];

  // Query Wikipedia Portuguese
  try {
    const ptUrl = `https://api.wikimedia.org/feed/v1/wikipedia/pt/onthisday/all/${mm}/${dd}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(ptUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'UniversarioApp/1.0 (contact@universario.app)' },
      next: { revalidate: 86400 },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const allPt = [
        ...(data.events || []),
        ...(data.selected || []),
        ...(data.births || []),
        ...(data.deaths || []),
      ];

      const exactPt = allPt.filter((ev: { year?: number }) => ev.year === year);
      for (const ev of exactPt) {
        const title =
          ev.pages?.[0]?.titles?.normalized ||
          ev.pages?.[0]?.titles?.display ||
          `Fato de ${dd}/${mm}/${year}`;
        items.push({
          title: String(title).slice(0, 60),
          category: 'mundo',
          description: String(ev.text || '').slice(0, 220),
          emoji: '📅',
          year,
        });
      }
    }
  } catch (err) {
    // Ignore and proceed to EN query
  }

  // If we need more international events, query Wikipedia English
  if (items.length < 3) {
    try {
      const enUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${mm}/${dd}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(enUrl, {
        signal: controller.signal,
        headers: { 'User-Agent': 'UniversarioApp/1.0 (contact@universario.app)' },
        next: { revalidate: 86400 },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const allEn = [
          ...(data.events || []),
          ...(data.selected || []),
          ...(data.births || []),
          ...(data.deaths || []),
        ];

        const exactEn = allEn.filter((ev: { year?: number }) => ev.year === year);
        for (const ev of exactEn) {
          if (!items.some((it) => it.description.includes(ev.text?.slice(0, 20)))) {
            const title = ev.pages?.[0]?.titles?.normalized || `Evento em ${year}`;
            items.push({
              title: String(title).slice(0, 60),
              category: 'mundo',
              description: String(ev.text || '').slice(0, 220),
              emoji: '🌍',
              year,
            });
          }
        }
      }
    } catch {
      // Continue gracefully
    }
  }

  return items;
}

// 2. Fetch NASA APOD if date is >= 1995-06-16
export async function fetchNasaApod(dateStr: string): Promise<{ title: string; explanation: string; url?: string } | null> {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const y = parseInt(yearStr, 10);
  const m = parseInt(monthStr, 10);
  const d = parseInt(dayStr, 10);

  // APOD started on June 16, 1995
  if (y < 1995 || (y === 1995 && (m < 6 || (m === 6 && d < 16)))) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${dateStr}&api_key=DEMO_KEY`,
      { signal: controller.signal, next: { revalidate: 86400 } }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        return {
          title: data.title,
          explanation: data.explanation ? String(data.explanation).slice(0, 250) + '...' : '',
          url: data.url,
        };
      }
    }
  } catch {
    // Fail silently
  }

  return null;
}

// 3. Gemini Structured Historical Grounding (If GEMINI_API_KEY is available)
export async function fetchGeminiDailyGrounding(
  dateStr: string,
  formattedDate: string,
  year: number
): Promise<DailyEnrichedData | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Você é um historiador e pesquisador cultural especialista.
Forneça com máxima precisão e rigor cronológico os dados históricos da data exata: ${formattedDate} (${dateStr}).

Retorne APENAS um JSON válido no seguinte formato:
{
  "exactNews": [
    {
      "title": "Título conciso da manchete do dia",
      "category": "brasil" ou "mundo" ou "ciencia" ou "esporte" ou "cultura",
      "description": "Explicação do que aconteceu exatamente naquele dia ou semana no Brasil/Mundo (máximo 160 caracteres)",
      "emoji": "emoji relevante"
    }
  ],
  "exactGlobalHit": {
    "title": "Nome da música #1 da Billboard Hot 100 naquela semana exata",
    "artist": "Nome do artista",
    "highlight": "Por que era #1 na semana"
  },
  "exactBrazilHit": {
    "title": "Nome da música mais tocada nas rádios/paradas do Brasil naquele mês/semana",
    "artist": "Artista brasileiro",
    "highlight": "Sucesso nacional da época"
  },
  "exactPopCulture": {
    "movie": "Filme líder de bilheteria nos cinemas naquela semana",
    "movieDirector": "Diretor",
    "movieFact": "Curiosidade sobre o filme",
    "tvShow": "Programa ou novela brasileira marcante na TV naquele período",
    "tech": "Invenção ou novidade tecnológica que estava em alta naquele ano",
    "nostalgia": ["Item 1", "Item 2", "Item 3", "Item 4"]
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      exactNews: parsed.exactNews || [],
      exactGlobalHit: parsed.exactGlobalHit,
      exactBrazilHit: parsed.exactBrazilHit,
      exactPopCulture: parsed.exactPopCulture
        ? {
            topMovie: {
              title: parsed.exactPopCulture.movie || 'Blockbuster em Cartaz',
              director: parsed.exactPopCulture.movieDirector || 'Cinema',
              year,
              tagline: '',
              funFact: parsed.exactPopCulture.movieFact || '',
            },
            topBrazilianTVOrCulture: parsed.exactPopCulture.tvShow || '',
            techMilestone: parsed.exactPopCulture.tech || '',
            nostalgiaItems: parsed.exactPopCulture.nostalgia || [],
          }
        : undefined,
    };
  } catch (err) {
    console.warn('Gemini grounding fallback:', err);
    return null;
  }
}
