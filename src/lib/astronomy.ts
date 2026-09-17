import { AstronomyData, CosmicStats } from '@/types/universario';

const ZODIAC_SIGNS = [
  { name: 'Capricórnio', symbol: '♑', element: 'Terra' as const, dates: '22 dez - 19 jan', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: 'Aquário', symbol: '♒', element: 'Ar' as const, dates: '20 jan - 18 fev', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: 'Peixes', symbol: '♓', element: 'Água' as const, dates: '19 fev - 20 mar', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: 'Áries', symbol: '♈', element: 'Fogo' as const, dates: '21 mar - 19 abr', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: 'Touro', symbol: '♉', element: 'Terra' as const, dates: '20 abr - 20 mai', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: 'Gêmeos', symbol: '♊', element: 'Ar' as const, dates: '21 mai - 20 jun', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: 'Câncer', symbol: '♋', element: 'Água' as const, dates: '21 jun - 22 jul', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: 'Leão', symbol: '♌', element: 'Fogo' as const, dates: '23 jul - 22 ago', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: 'Virgem', symbol: '♍', element: 'Terra' as const, dates: '23 ago - 22 set', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: 'Libra', symbol: '♎', element: 'Ar' as const, dates: '23 set - 22 out', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: 'Escorpião', symbol: '♏', element: 'Água' as const, dates: '23 out - 21 nov', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: 'Sagitário', symbol: '♐', element: 'Fogo' as const, dates: '22 nov - 21 dez', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

const CHINESE_ANIMALS = [
  { name: 'Rato', emoji: '🐀' },
  { name: 'Boi', emoji: '🐂' },
  { name: 'Tigre', emoji: '🐅' },
  { name: 'Coelho', emoji: '🐇' },
  { name: 'Dragão', emoji: '🐉' },
  { name: 'Serpente', emoji: '🐍' },
  { name: 'Cavalo', emoji: '🐎' },
  { name: 'Cabra', emoji: '🐐' },
  { name: 'Macaco', emoji: '🐒' },
  { name: 'Galo', emoji: '🐓' },
  { name: 'Cão', emoji: '🐕' },
  { name: 'Porco', emoji: '🐖' }
];

// Historical world population benchmarks (year -> billions)
const POPULATION_DATA: Record<number, number> = {
  1940: 2.30,
  1950: 2.54,
  1960: 3.03,
  1970: 3.70,
  1980: 4.45,
  1985: 4.87,
  1990: 5.33,
  1995: 5.75,
  2000: 6.14,
  2005: 6.54,
  2010: 6.96,
  2015: 7.38,
  2020: 7.84,
  2024: 8.12,
  2026: 8.20,
};

export function calculateMoonPhase(date: Date): {
  phaseName: string;
  illumination: number;
  ageDays: number;
  emoji: string;
  index: number;
} {
  // Trigonometric approximation of lunar cycle (synodic month = 29.53058867 days)
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)); // Known reference new moon
  const diffTime = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const synodicMonth = 29.53058867;
  
  let phaseAge = diffDays % synodicMonth;
  if (phaseAge < 0) phaseAge += synodicMonth;

  const phaseNormalized = phaseAge / synodicMonth; // 0 to 1
  // Illumination calculation (0 to 100%)
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phaseNormalized)) / 2 * 100);

  let phaseName = 'Lua Nova';
  let emoji = '🌑';
  let index = 0;

  if (phaseNormalized < 0.03 || phaseNormalized >= 0.97) {
    phaseName = 'Lua Nova';
    emoji = '🌑';
    index = 0;
  } else if (phaseNormalized < 0.22) {
    phaseName = 'Lua Crescente Côncava';
    emoji = '🌒';
    index = 1;
  } else if (phaseNormalized < 0.28) {
    phaseName = 'Quarto Crescente';
    emoji = '🌓';
    index = 2;
  } else if (phaseNormalized < 0.47) {
    phaseName = 'Lua Gibosa Crescente';
    emoji = '🌔';
    index = 3;
  } else if (phaseNormalized < 0.53) {
    phaseName = 'Lua Cheia';
    emoji = '🌕';
    index = 4;
  } else if (phaseNormalized < 0.72) {
    phaseName = 'Lua Gibosa Minguante';
    emoji = '🌖';
    index = 5;
  } else if (phaseNormalized < 0.78) {
    phaseName = 'Quarto Minguante';
    emoji = '🌗';
    index = 6;
  } else {
    phaseName = 'Lua Minguante Côncava';
    emoji = '🌘';
    index = 7;
  }

  return {
    phaseName,
    illumination,
    ageDays: Math.round(phaseAge * 10) / 10,
    emoji,
    index,
  };
}

export function getZodiacSign(month: number, day: number) {
  // month is 1-indexed (1 to 12)
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === 12 && sign.endMonth === 1) {
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) {
        return sign;
      }
    } else {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }
  return ZODIAC_SIGNS[0];
}

export function getChineseZodiac(year: number) {
  // 1900 was Year of the Rat
  const index = ((year - 1900) % 12 + 12) % 12;
  return CHINESE_ANIMALS[index];
}

export function estimateWorldPopulation(year: number): string {
  const years = Object.keys(POPULATION_DATA).map(Number).sort((a, b) => a - b);
  if (year <= years[0]) return `${POPULATION_DATA[years[0]]} bilhões`;
  if (year >= years[years.length - 1]) return `${POPULATION_DATA[years[years.length - 1]]} bilhões`;

  for (let i = 0; i < years.length - 1; i++) {
    const y1 = years[i];
    const y2 = years[i + 1];
    if (year >= y1 && year <= y2) {
      const p1 = POPULATION_DATA[y1];
      const p2 = POPULATION_DATA[y2];
      const ratio = (year - y1) / (y2 - y1);
      const est = p1 + ratio * (p2 - p1);
      return `${est.toFixed(2)} bilhões`;
    }
  }
  return '6.0 bilhões';
}

export function getGeneration(year: number): string {
  if (year >= 2013) return 'Geração Alpha (Nativos Digitais e IA)';
  if (year >= 1997) return 'Geração Z (Zoomers)';
  if (year >= 1981) return 'Millennials (Geração Y)';
  if (year >= 1965) return 'Geração X';
  if (year >= 1946) return 'Baby Boomers';
  return 'Geração Tradicionalista';
}

export function getCosmicQuote(element: string, moonPhase: string): string {
  const quotes: Record<string, string> = {
    Fogo: 'Nascido sob a centelha do fogo: energia vibrante, coragem e pioneirismo que iluminam o caminho.',
    Terra: 'Nascido sob a solidez da terra: determinação inabalável, visão prática e raízes profundas.',
    Ar: 'Nascido sob a leveza do ar: mente brilhante, curiosidade infinita e sede de conectar ideias.',
    Água: 'Nascido sob a profundidade da água: intuição aguçada, sensibilidade marcante e empatia cósmica.',
  };
  return `${quotes[element] || quotes.Fogo} O céu resplandecia com uma majestosa ${moonPhase}.`;
}

export function computeAstronomyAndStats(birthDateStr: string): {
  astronomy: AstronomyData;
  stats: CosmicStats;
  dayOfWeek: string;
  formattedDate: string;
  dayOfMonth: number;
  monthName: string;
  year: number;
} {
  const [yearStr, monthStr, dayStr] = birthDateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const birthDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const now = new Date();

  // Days alive calculation
  const diffTime = Math.max(0, now.getTime() - birthDate.getTime());
  const daysAlive = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hoursAlive = daysAlive * 24;

  // Moon phase calculation
  const moon = calculateMoonPhase(birthDate);

  // Zodiac
  const zodiac = getZodiacSign(month, day);
  const chineseZodiac = getChineseZodiac(year);

  // Astronomical / cosmic stats
  const sunOrbits = Math.floor(daysAlive / 365.25);
  // Average heart rate: 75 bpm -> 75 * 60 * 24 = 108,000 beats/day
  const heartbeats = (daysAlive * 108000).toLocaleString('pt-BR');
  // Average breaths: 16 bpm -> 16 * 60 * 24 = 23,040 breaths/day
  const breaths = (daysAlive * 23040).toLocaleString('pt-BR');
  // Earth travels ~940 million km around the Sun per year (~2.57 million km/day)
  const earthDistanceKm = (daysAlive * 2.57).toFixed(1).replace('.', ',');

  const worldPopThen = estimateWorldPopulation(year);
  const worldPopNow = '8,18 bilhões';

  const monthNames = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  const dayNames = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  const dayOfWeek = dayNames[birthDate.getUTCDay()];
  const monthName = monthNames[month - 1];
  const formattedDate = `${day} de ${monthName} de ${year}`;

  const skyHighlight = moon.illumination > 80
    ? `Noite de lua altamente brilhante (${moon.illumination}% iluminada), conferindo grande intensidade ao céu.`
    : moon.illumination < 15
    ? `Céu límpido e escuro com lua sutil (${moon.illumination}%), perfeito para visualização estelar da constelação de ${zodiac.name}.`
    : `O céu exibia a ${moon.phaseName} com ${moon.illumination}% de luminosidade ao lado do brilho de ${zodiac.name}.`;

  const astronomy: AstronomyData = {
    moonPhaseName: moon.phaseName,
    moonIlluminationPercent: moon.illumination,
    moonAgeDays: moon.ageDays,
    moonPhaseEmoji: moon.emoji,
    moonPhaseIndex: moon.index,
    zodiacSign: zodiac.name,
    zodiacElement: zodiac.element,
    zodiacSymbol: zodiac.symbol,
    zodiacDates: zodiac.dates,
    chineseZodiac: chineseZodiac.name,
    chineseZodiacEmoji: chineseZodiac.emoji,
    cosmicMessage: getCosmicQuote(zodiac.element, moon.phaseName),
    skyHighlight,
  };

  const stats: CosmicStats = {
    daysAlive,
    hoursAlive,
    sunOrbits,
    heartbeatsEstimated: heartbeats,
    breathsEstimated: breaths,
    earthTraveledMillionKm: `${earthDistanceKm} milhões de km`,
    worldPopulationThen: worldPopThen,
    worldPopulationNow: worldPopNow,
    generationName: getGeneration(year),
  };

  return {
    astronomy,
    stats,
    dayOfWeek,
    formattedDate,
    dayOfMonth: day,
    monthName,
    year,
  };
}
