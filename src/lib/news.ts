import { NewsItem } from '@/types/universario';

interface FallbackYearNews {
  events: NewsItem[];
}

const HISTORICAL_ERA_NEWS: Record<number, FallbackYearNews> = {
  1969: {
    events: [
      { title: 'O Homem Pisa na Lua', category: 'ciencia', description: 'Neil Armstrong e Buzz Aldrin descem na superfície lunar na histórica missão Apollo 11.', emoji: '🚀', year: 1969 },
      { title: 'Festival de Woodstock', category: 'cultura', description: 'Quase meio milhão de pessoas se reúnem em Bethel (NY) para 3 dias de paz, amor e música.', emoji: '🎸', year: 1969 },
      { title: 'Criação da ARPANET', category: 'ciencia', description: 'Os primeiros nós da precursora da Internet são conectados entre universidades americanas.', emoji: '💻', year: 1969 }
    ]
  },
  1970: {
    events: [
      { title: 'Brasil Tricampeão Mundial', category: 'esporte', description: 'A Seleção de Pelé, Tostão e Jairzinho encanta o planeta e conquista o Tri na Copa do México.', emoji: '⚽', year: 1970 },
      { title: 'O Fim dos Beatles', category: 'cultura', description: 'Paul McCartney anuncia publicamente sua saída, marcando o término oficial da maior banda do mundo.', emoji: '🎤', year: 1970 }
    ]
  },
  1980: {
    events: [
      { title: 'Lançamento do Pac-Man', category: 'cultura', description: 'O jogo do bichinho amarelo comedor de pastilhas chega aos fliperamas e vira febre global.', emoji: '🕹️', year: 1980 },
      { title: 'Lennon e a Comoção Mundial', category: 'cultura', description: 'Milhões de fãs no mundo inteiro choram a partida de John Lennon em Nova York.', emoji: '🕊️', year: 1980 }
    ]
  },
  1985: {
    events: [
      { title: 'Fim da Ditadura e Nova República no Brasil', category: 'brasil', description: 'Tancredo Neves é eleito e José Sarney assume a presidência, marcando a redemocratização.', emoji: '🇧🇷', year: 1985 },
      { title: 'Primeiro Rock in Rio', category: 'cultura', description: 'Queen, Iron Maiden e Barão Vermelho levam mais de 1,3 milhão de pessoas à Cidade do Rock.', emoji: '⚡', year: 1985 },
      { title: 'Live Aid nos EUA e Londres', category: 'mundo', description: 'O maior concerto beneficente da história é transmitido para 1,9 bilhão de pessoas.', emoji: '🌍', year: 1985 }
    ]
  },
  1988: {
    events: [
      { title: 'Promulgação da Constituição Cidadã', category: 'brasil', description: 'Ulysses Guimarães promulga a Constituição Brasileira de 1988, marco dos direitos civis.', emoji: '📜', year: 1988 },
      { title: 'Novela Vale Tudo Para o Brasil', category: 'cultura', description: 'O mistério "Quem matou Odete Roitman?" se torna o maior assunto nas ruas de todo o país.', emoji: '📺', year: 1988 }
    ]
  },
  1989: {
    events: [
      { title: 'Queda do Muro de Berlim', category: 'mundo', description: 'Cidadãos celebram em cima do muro que dividia a Alemanha, encerrando a Guerra Fria.', emoji: '🧱', year: 1989 },
      { title: 'Invenção da World Wide Web (WWW)', category: 'ciencia', description: 'Tim Berners-Lee escreve a proposta inicial do sistema que originou a navegação na internet.', emoji: '🌐', year: 1989 },
      { title: 'Eleições Diretas no Brasil', category: 'brasil', description: 'Brasileiros votam para presidente pelo voto direto pela primeira vez em quase 30 anos.', emoji: '🗳️', year: 1989 }
    ]
  },
  1994: {
    events: [
      { title: 'Lançamento do Plano Real', category: 'brasil', description: 'A nova moeda Real entra em circulação no dia 1º de julho, estabilizando a inflação histórica no Brasil.', emoji: '💵', year: 1994 },
      { title: 'Brasil Tetracampeão na Copa dos EUA', category: 'esporte', description: 'Romário e Bebeto comandam a seleção e Baggio chuta para fora: o Brasil é Tetra!', emoji: '🏆', year: 1994 },
      { title: 'Nelson Mandela Presidente', category: 'mundo', description: 'Primeira eleição multirracial na África do Sul consagra Mandela após décadas de Apartheid.', emoji: '🕊️', year: 1994 }
    ]
  },
  1997: {
    events: [
      { title: 'Lançamento do Primeiro Livro de Harry Potter', category: 'cultura', description: 'J.K. Rowling publica "A Pedra Filosofal", dando início à maior saga literária moderna.', emoji: '⚡', year: 1997 },
      { title: 'Supercomputador Deep Blue Vence Kasparov', category: 'ciencia', description: 'Pela primeira vez na história, a inteligência de uma máquina supera o campeão mundial de xadrez.', emoji: '♟️', year: 1997 },
      { title: 'A Ovelha Dolly é Apresentada ao Mundo', category: 'ciencia', description: 'Cientistas escoceses anunciam a primeira clonagem bem-sucedida de um mamífero.', emoji: '🐑', year: 1997 }
    ]
  },
  1998: {
    events: [
      { title: 'Fundação do Google', category: 'ciencia', description: 'Larry Page e Sergey Brin registram formalmente o Google na Califórnia em setembro de 1998.', emoji: '🔍', year: 1998 },
      { title: 'Copa do Mundo na França', category: 'esporte', description: 'A França de Zidane vence o Brasil na final em Paris e levanta sua primeira taça mundial.', emoji: '⚽', year: 1998 },
      { title: 'Lançamento do Game Boy Color', category: 'cultura', description: 'A Nintendo traz cor portátil para milhões de jogadores com a febre de Pokémon Red/Blue.', emoji: '🎮', year: 1998 }
    ]
  },
  2000: {
    events: [
      { title: 'Virada do Milênio e Alívio do Bug do Ano 2000', category: 'mundo', description: 'O planeta celebra a chegada dos anos 2000 com fogos em todo o globo sem falhas digitais.', emoji: '🎆', year: 2000 },
      { title: 'Estação Espacial Internacional (ISS) é Ocupada', category: 'ciencia', description: 'Os primeiros tripulantes chegam à ISS para presença humana ininterrupta no espaço.', emoji: '🛰️', year: 2000 }
    ]
  },
  2002: {
    events: [
      { title: 'Brasil Pentacampeão na Copa do Japão e Coreia', category: 'esporte', description: 'Ronaldo Fenômeno marca dois gols na final contra a Alemanha e o Brasil é Penta!', emoji: '⭐', year: 2002 },
      { title: 'O Euro Entra em Circulação', category: 'mundo', description: 'As cédulas e moedas do Euro passam a ser usadas diariamente por 12 países europeus.', emoji: '💶', year: 2002 },
      { title: 'Estreia do Big Brother Brasil (BBB)', category: 'cultura', description: 'A Rede Globo lança o reality show que se tornaria uma tradição anual na TV brasileira.', emoji: '👁️', year: 2002 }
    ]
  },
  2004: {
    events: [
      { title: 'Criação do Facebook e Orkut', category: 'ciencia', description: 'O Orkut vira febre no Brasil enquanto Mark Zuckerberg cria o Facebook em Harvard.', emoji: '💬', year: 2004 },
      { title: 'Sondas Spirit e Opportunity Pousam em Marte', category: 'ciencia', description: 'A NASA envia robôs geológicos para explorar a superfície do Planeta Vermelho.', emoji: '🪐', year: 2004 }
    ]
  },
  2007: {
    events: [
      { title: 'Steve Jobs Apresenta o Primeiro iPhone', category: 'ciencia', description: 'A Apple revoluciona o mercado de tecnologia integrando iPod, telefone e navegador web.', emoji: '📱', year: 2007 },
      { title: 'Descoberta do Pré-Sal no Brasil', category: 'brasil', description: 'A Petrobras anuncia a descoberta de reservas gigantes de petróleo na costa brasileira.', emoji: '🛢️', year: 2007 }
    ]
  },
  2010: {
    events: [
      { title: 'Copa do Mundo na África do Sul', category: 'esporte', description: 'A Espanha conquista seu primeiro título mundial ao som de vuvuzelas e Waka Waka.', emoji: '🎺', year: 2010 },
      { title: 'Lançamento do Instagram e iPad', category: 'ciencia', description: 'Dois produtos que redefiniram o consumo de mídia e fotos nasceram em 2010.', emoji: '📸', year: 2010 }
    ]
  },
  2014: {
    events: [
      { title: 'Copa do Mundo no Brasil', category: 'esporte', description: 'O Brasil sedia a Copa com estádios lotados, turistas e a Alemanha campeã no Maracanã.', emoji: '🇧🇷', year: 2014 },
      { title: 'Sonda Rosetta Pousa no Cometa 67P', category: 'ciencia', description: 'Pela primeira vez na história, a humanidade realiza um pouso suave sobre um cometa.', emoji: '☄️', year: 2014 }
    ]
  },
  2016: {
    events: [
      { title: 'Jogos Olímpicos no Rio de Janeiro (Rio 2016)', category: 'esporte', description: 'A primeira Olimpíada na América do Sul encanta o mundo e o Brasil vence o ouro no futebol.', emoji: '🥇', year: 2016 },
      { title: 'Febre do Pokémon GO', category: 'cultura', description: 'Milhões de pessoas saem às ruas ao redor do mundo para capturar monstrinhos em realidade aumentada.', emoji: '📱', year: 2016 }
    ]
  },
  2020: {
    events: [
      { title: 'O Ano que o Mundo Parou', category: 'mundo', description: 'A humanidade se une em quarentenas globais, teletrabalho e avanço recorde na ciência médica.', emoji: '🌍', year: 2020 },
      { title: 'Sonda Perseverance Parte para Marte', category: 'ciencia', description: 'A missão da NASA viaja levando o helicóptero Ingenuity para voar em outro planeta.', emoji: '🚁', year: 2020 }
    ]
  },
  2022: {
    events: [
      { title: 'Lançamento do ChatGPT e Revolução da IA', category: 'ciencia', description: 'A OpenAI lança o ChatGPT para o público, inaugurando uma nova era tecnológica.', emoji: '🤖', year: 2022 },
      { title: 'Telescópio James Webb Revela o Universo Primordial', category: 'ciencia', description: 'As primeiras imagens em infravermelho de galáxias distantes deixam a ciência boquiaberta.', emoji: '🔭', year: 2022 },
      { title: 'Argentina de Messi Campeã do Mundo', category: 'esporte', description: 'Uma das finais mais eletrizantes da história da Copa do Mundo consagra Lionel Messi.', emoji: '🏆', year: 2022 }
    ]
  }
};

export async function fetchWikipediaOnThisDay(month: number, day: number, targetYear: number): Promise<NewsItem[]> {
  try {
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');

    // Wikimedia API endpoint for events on this day
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/pt/onthisday/events/${formattedMonth}/${formattedDay}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'UniversarioApp/1.0 (https://universario.app; contact@universario.app)'
      },
      next: { revalidate: 86400 }
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.events) && data.events.length > 0) {
        // Look for events close to target year first, or select notable events
        const sortedEvents = [...data.events].sort((a, b) => {
          const diffA = Math.abs((a.year || 0) - targetYear);
          const diffB = Math.abs((b.year || 0) - targetYear);
          return diffA - diffB;
        });

        const selected = sortedEvents.slice(0, 3).map((item: { text?: string; year?: number; pages?: Array<{ titles?: { normalized?: string } }> }) => {
          const yearText = item.year ? `Em ${item.year}: ` : '';
          const title = item.pages?.[0]?.titles?.normalized || `Fato Histórico de ${day}/${month}`;
          return {
            title: title.slice(0, 50),
            category: 'mundo' as const,
            description: `${yearText}${item.text || ''}`.slice(0, 200),
            emoji: '📅',
            year: item.year
          };
        });

        if (selected.length > 0) return selected;
      }
    }
  } catch {
    // If external Wikipedia API is slow/unavailable, seamlessly fallback
  }

  return [];
}

export function getNewsForDate(year: number, month: number, day: number, wikiEvents: NewsItem[] = []): NewsItem[] {
  // Find closest year in curated DB
  const availableYears = Object.keys(HISTORICAL_ERA_NEWS).map(Number).sort((a, b) => a - b);
  let closestYear = availableYears[0];
  let minDiff = Infinity;
  for (const y of availableYears) {
    const diff = Math.abs(y - year);
    if (diff < minDiff) {
      minDiff = diff;
      closestYear = y;
    }
  }

  const baseEvents = HISTORICAL_ERA_NEWS[closestYear]?.events || [];

  // Combine curated year events + Wikipedia on-this-day events
  const combined: NewsItem[] = [...baseEvents];

  if (wikiEvents.length > 0) {
    // Add Wikipedia specific day event at the top
    combined.unshift(wikiEvents[0]);
  }

  return combined.slice(0, 3);
}
