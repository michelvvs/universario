export interface MusicTrack {
  title: string;
  artist: string;
  year?: number;
  highlight?: string;
  genre?: string;
  position?: number;
  chartContext?: string;
  coverUrl?: string;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  audioPreviewUrl?: string;
}

export interface MusicCategoryRanking {
  id: 'radio_br' | 'sales_br' | 'billboard';
  categoryName: string;
  subtitle: string;
  source: string;
  icon: string;
  tracks: MusicTrack[];
}

export interface MusicData {
  globalTopTrack: MusicTrack;
  brazilTopTrack: MusicTrack;
  brazilSalesTrack?: MusicTrack;
  runnerUpTracks: MusicTrack[];
  musicEra: string;
  billboardTop5: MusicTrack[];
  brazilRadioTop5: MusicTrack[];
  brazilSalesTop5: MusicTrack[];
  categories?: MusicCategoryRanking[];
}

export interface NewsItem {
  title: string;
  category: 'brasil' | 'mundo' | 'ciencia' | 'esporte' | 'cultura';
  description: string;
  emoji: string;
  year?: number;
}

export interface MovieInfo {
  title: string;
  director?: string;
  year?: number;
  tagline?: string;
  funFact?: string;
}

export interface AstronomyData {
  moonPhaseName: string;
  moonIlluminationPercent: number;
  moonAgeDays: number;
  moonPhaseEmoji: string;
  moonPhaseIndex: number; // 0 (Nova) to 7
  zodiacSign: string;
  zodiacElement: 'Fogo' | 'Terra' | 'Ar' | 'Água';
  zodiacSymbol: string;
  zodiacDates: string;
  chineseZodiac: string;
  chineseZodiacEmoji: string;
  cosmicMessage: string;
  skyHighlight: string;
  nasaApod?: {
    title: string;
    explanation: string;
    url?: string;
  };
}

export interface CosmicStats {
  daysAlive: number;
  hoursAlive: number;
  sunOrbits: number;
  heartbeatsEstimated: string;
  breathsEstimated: string;
  earthTraveledMillionKm: string;
  worldPopulationThen: string;
  worldPopulationNow: string;
  generationName: string;
}

export interface PopCultureData {
  topMovie: MovieInfo;
  topBrazilianTVOrCulture: string;
  techMilestone: string;
  curiousTrend: string;
  nostalgiaItems: string[];
}

export interface BirthDataPayload {
  birthDate: string; // YYYY-MM-DD
  name?: string;
  gender?: 'masculino' | 'feminino' | 'neutro';
  formattedDate: string;
  dayOfWeek: string;
  dayOfMonth: number;
  monthName: string;
  year: number;
  astronomy: AstronomyData;
  music: MusicData;
  news: NewsItem[];
  popCulture: PopCultureData;
  stats: CosmicStats;
  generatedAt: string;
  isCached?: boolean;
  userPhotoUrl?: string;
}

export type LoadingStep = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  status: 'pending' | 'active' | 'completed';
};
