import { PopCultureData } from '@/types/universario';

interface YearPopCulture {
  topMovie: { title: string; director: string; tagline: string; funFact: string };
  topBrazilianTVOrCulture: string;
  techMilestone: string;
  curiousTrend: string;
  nostalgiaItems: string[];
}

const POP_CULTURE_DB: Record<number, YearPopCulture> = {
  1969: {
    topMovie: {
      title: 'Easy Rider (Sem Destino)',
      director: 'Dennis Hopper',
      tagline: 'Um homem saiu à procura da América e não conseguiu encontrá-la em lugar nenhum.',
      funFact: 'Clássico contracultura do cinema que redefiniu Hollywood nos anos 70.'
    },
    topBrazilianTVOrCulture: 'Estreia do Jornal Nacional na TV Globo, primeira transmissão ao vivo em rede nacional.',
    techMilestone: 'Primeira mensagem enviada pela rede ARPANET (tentaram digitar "LOGIN" e travou no "LO").',
    curiousTrend: 'Moda hippie, calças boca de sino, batas coloridas e cabelos longos.',
    nostalgiaItems: ['Discos de Vinil', 'Máquinas de Escrever', 'Telefones de Disco', 'Fusca']
  },
  1977: {
    topMovie: {
      title: 'Star Wars: Episódio IV - Uma Nova Esperança',
      director: 'George Lucas',
      tagline: 'Há muito tempo, em uma galáxia muito, muito distante...',
      funFact: 'Filas quilométricas nos cinemas e o nascimento do conceito moderno de blockbuster de ficção.'
    },
    topBrazilianTVOrCulture: 'Exibição da novela "Locomotivas", primeira novela das sete gravada em cores pela Globo.',
    techMilestone: 'Lançamento do computador Apple II e da fita de videocassete VHS.',
    curiousTrend: 'Macacões brilhantes de discoteca, patins de 4 rodas e pistas de dança iluminadas.',
    nostalgiaItems: ['Fita K7', 'Patinete com freio traseiro', 'TV de Tubo em cores', 'Atari 2600']
  },
  1982: {
    topMovie: {
      title: 'E.T. - O Extraterrestre',
      director: 'Steven Spielberg',
      tagline: 'Ele tem medo. Ele está totalmente sozinho. Ele está a 3 milhões de anos-luz de casa.',
      funFact: 'Maior bilheteria da história do cinema por mais de 10 anos seguidos.'
    },
    topBrazilianTVOrCulture: 'Programa Cassino do Chacrinha com as Chacretes e o lendário bordão "Quem não se comunica, se trumbica!".',
    techMilestone: 'Lançamento do Compact Disc (CD) e do computador Commodore 64.',
    curiousTrend: 'Cores neon fluorescentes, polainas nos tornozelos e cabelos com laquê volumoso.',
    nostalgiaItems: ['Cubo Mágico', 'Walkman da Sony', 'Revista Recreio', 'Fita VHS']
  },
  1985: {
    topMovie: {
      title: 'De Volta Para o Futuro',
      director: 'Robert Zemeckis',
      tagline: 'Ele nunca esteve em seu tempo na vida inteira.',
      funFact: 'O icônico DeLorean viajava no tempo quando atingia exatos 88 mph (140 km/h).'
    },
    topBrazilianTVOrCulture: 'A novela "Roque Santeiro" paralisa o Brasil com Sinhozinho Malta (Lima Duarte) e Viúva Porcina (Regina Duarte).',
    techMilestone: 'Lançamento do console Nintendo Entertainment System (NES) nos EUA e do Windows 1.0.',
    curiousTrend: 'Jaquetas de couro com zíperes gigantes, óculos Ray-Ban Wayfarer e skate.',
    nostalgiaItems: ['Fitas K7 regraváveis', 'Orelhões com ficha telefônica', 'Bolo de aniversário com papel crepom']
  },
  1988: {
    topMovie: {
      title: 'Uma Cilada para Roger Rabbit',
      director: 'Robert Zemeckis',
      tagline: 'Não é fácil ser um desenho animado.',
      funFact: 'Revolução visual unindo atores reais com animações desenhadas à mão quadro a quadro.'
    },
    topBrazilianTVOrCulture: 'A novela "Vale Tudo" para o país na noite de Natal para revelar a morte de Odete Roitman.',
    techMilestone: 'Chegada do Game Boy portátil e popularização dos primeiros telefones celulares "tijolão".',
    curiousTrend: 'Ombreiras gigantescas em ternos e camisas, permanentes cacheados e jaquetas jeans folgadas.',
    nostalgiaItems: ['Pense Bem da Tec Toy', 'Balas Soft', 'Mini-chicletes Ping Pong']
  },
  1989: {
    topMovie: {
      title: 'Indiana Jones e a Última Cruzada / Batman',
      director: 'Steven Spielberg / Tim Burton',
      tagline: 'O homem com o chapéu está de volta. E desta vez ele trouxe o pai.',
      funFact: 'Indiana Jones estreou nos cinemas exatamente em 24 de maio de 1989, quebrando recordes de bilheteria mundial.'
    },
    topBrazilianTVOrCulture: 'A novela sátira "Que Rei Sou Eu?" na TV Globo e a estreia de "Tieta" com Betty Faria paralisam as noites brasileiras.',
    techMilestone: 'Proposta inicial da World Wide Web (WWW) por Tim Berners-Lee e o lançamento do Game Boy pela Nintendo.',
    curiousTrend: 'Bolsas esportivas neon, cortes de cabelo com franja repicada e fita K7 no rádio gravador estéreo.',
    nostalgiaItems: ['Fita VHS rebobinada', 'Fliperama de Street Fighter', 'Disquete 5.25 polegadas', 'Chiclete Bubbaloo']
  },

  1991: {
    topMovie: {
      title: 'O Exterminador do Futuro 2: O Julgamento Final',
      director: 'James Cameron',
      tagline: 'Hasta la vista, baby.',
      funFact: 'Primeiro filme a usar computação gráfica hiper-realista para criar o androide T-1000 de metal líquido.'
    },
    topBrazilianTVOrCulture: 'O auge do programa Show da Xuxa e a estreia da novela "Vamp" com vampiros de capa preta e rock.',
    techMilestone: 'Linus Torvalds lança a primeira versão do sistema operacional Linux.',
    curiousTrend: 'Camisas xadrez de flanela amarradas na cintura, coturnos e bermudas jeans rasgadas (era Grunge).',
    nostalgiaItems: ['Super Nintendo 16-bits', 'Fitas VHS rebobinadas no carrinho', 'Tazos colecionáveis']
  },
  1994: {
    topMovie: {
      title: 'O Rei Leão / Forrest Gump',
      director: 'Roger Allers / Robert Zemeckis',
      tagline: 'A vida é como uma caixa de chocolates...',
      funFact: '1994 é considerado pela crítica um dos maiores anos da história de Hollywood (Pulp Fiction, Rei Leão, Forrest Gump).'
    },
    topBrazilianTVOrCulture: 'Estreia do inesquecível "Castelo Rá-Tim-Bum" na TV Cultura ("Bum, bum, bum, Castelo Rá-Tim-Bum!").',
    techMilestone: 'Chegada do primeiro PlayStation pela Sony no Japão e início do comércio eletrônico (Amazon fundada).',
    curiousTrend: 'Coleção de tazos nos salgadinhos Elma Chips e gargantilhas pretas no pescoço.',
    nostalgiaItems: ['Tazos', 'Cartões telefônicos colecionáveis', 'Bichinho Virtual (Tamagotchi)', 'Fita K7 no Walkman']
  },
  1997: {
    topMovie: {
      title: 'Titanic',
      director: 'James Cameron',
      tagline: 'Nada na Terra poderia separar o amor deles.',
      funFact: 'Primeiro filme da história a ultrapassar a marca colossal de 1 bilhão de dólares de bilheteria.'
    },
    topBrazilianTVOrCulture: 'A novela "Por Amor" e a clássica troca de bebês de Helena (Regina Duarte) emocionam o Brasil.',
    techMilestone: 'Lançamento do primeiro aparelho reprodutor de DVD comercial e o computador Deep Blue vencendo no xadrez.',
    curiousTrend: 'Presilhas borboleta no cabelo, calças cargo largas e tênis de plataforma.',
    nostalgiaItems: ['Tamagotchi no chaveiro', 'Nintendo 64 com Mario 64', 'Locadora de fitas VHS no final de semana']
  },
  1998: {
    topMovie: {
      title: 'O Resgate do Soldado Ryan',
      director: 'Steven Spielberg',
      tagline: 'Na floresta, na praia, a missão é encontrar um homem.',
      funFact: 'A sequência de abertura do desembarque na Normandia redefiniu o realismo nos filmes de guerra.'
    },
    topBrazilianTVOrCulture: 'A novela "Torre de Babel" e a explosão do shopping center paralisam as noites da TV.',
    techMilestone: 'Lançamento do iMac G3 colorido translúcido pela Apple e o nascimento do Google.',
    curiousTrend: 'Calça de cintura baixa, correntes de carteira, CDs piratas com 100 músicas MP3.',
    nostalgiaItems: ['Discman com proteção anti-choque', 'ICQ com o som "Uh-Oh!"', 'Game Boy Color']
  },
  1999: {
    topMovie: {
      title: 'Matrix',
      director: 'Lana & Lilly Wachowski',
      tagline: 'Bem-vindo ao mundo real.',
      funFact: 'Revolucionou a história com o efeito de câmera lenta orbital 360° ("Bullet Time").'
    },
    topBrazilianTVOrCulture: 'Estreia do programa "Sandy & Junior" aos domingos e a novela "Terra Nostra".',
    techMilestone: 'Lançamento do Napster e a revolução do compartilhamento de arquivos MP3 na internet discada.',
    curiousTrend: 'Medo coletivo do "Bug do Milênio" (Y2K), roupas pretas de vinil estilo Neo e óculos escuros finos.',
    nostalgiaItems: ['Internet discada aos fins de semana', 'Winamp com skins personalizadas', 'Fitas gravadas da rádio']
  },
  2000: {
    topMovie: {
      title: 'Gladiador',
      director: 'Ridley Scott',
      tagline: 'O que fazemos na vida ecoa pela eternidade.',
      funFact: 'Venceu 5 Oscars incluindo Melhor Filme e reviveu o gênero épico no cinema mundial.'
    },
    topBrazilianTVOrCulture: 'A novela "Laços de Família" e a cena antológica de Camila (Carolina Dieckmann) raspando a cabeça ao som de Love By Grace.',
    techMilestone: 'Lançamento do PlayStation 2, que se tornaria o console de videogame mais vendido de todos os tempos.',
    curiousTrend: 'Celulares Nokia 3310 ("o indestrutível") com o clássico jogo da Cobrinha (Snake).',
    nostalgiaItems: ['Nokia 3310', 'Jogo da Cobrinha', 'MSN Messenger', 'Cadernos de enquete e perguntas']
  },
  2002: {
    topMovie: {
      title: 'O Senhor dos Anéis: As Duas Torres / Homem-Aranha',
      director: 'Peter Jackson / Sam Raimi',
      tagline: 'Com grandes poderes vêm grandes responsabilidades.',
      funFact: 'Homem-Aranha de Tobey Maguire foi o primeiro filme a arrecadar mais de $100 milhões em um único fim de semana.'
    },
    topBrazilianTVOrCulture: 'A novela "O Clone" coloca o país dançando a dança do ventre e repetindo os bordões de Dona Jura e Odete.',
    techMilestone: 'Popularização do pendrive USB e aposentadoria definitiva dos disquetes de 3,5 polegadas.',
    curiousTrend: 'Camisetas de bandas de rock, munhequeiras pretas, bonés Von Dutch e calças largas.',
    nostalgiaItems: ['Celular com toque monofônico', 'Kazaa e eMule', 'Lan Houses cheias de CS 1.6']
  },
  2005: {
    topMovie: {
      title: 'Harry Potter e o Cálice de Fogo',
      director: 'Mike Newell',
      tagline: 'Tempos sombrios e difíceis estão por vir.',
      funFact: 'Maior bilheteria mundial de 2005 com a épica disputa do Torneio Tribruxo.'
    },
    topBrazilianTVOrCulture: 'O auge do Orkut no Brasil com depoimentos secretos, recados no mural e comunidades hilárias.',
    techMilestone: 'Fundação do YouTube (o primeiro vídeo "Me at the zoo" foi postado em abril de 2005).',
    curiousTrend: 'Cabelos com franja emo cobrindo os olhos, lápis preto, munhequeira quadriculada e All Star desenhado.',
    nostalgiaItems: ['Comunidades do Orkut', 'MSN Messenger com "Chamar Atenção"', 'MP3 Player em formato de caneta']
  },
  2008: {
    topMovie: {
      title: 'Batman: O Cavaleiro das Trevas / Homem de Ferro',
      director: 'Christopher Nolan / Jon Favreau',
      tagline: 'Por que tão sério?',
      funFact: 'A atuação lendária de Heath Ledger como Coringa e o pontapé inicial do Universo Cinematográfico Marvel (MCU).'
    },
    topBrazilianTVOrCulture: 'A novela "A Favorita" com a histórica reviravolta entre Flora (Patricia Pillar) e Donatela (Claudia Raia).',
    techMilestone: 'Lançamento da App Store no iPhone e o primeiro celular com sistema Android.',
    curiousTrend: 'Fotolog, posts com câmeras digitais compactas Cyber-shot e poses com paz e amor ✌️.',
    nostalgiaItems: ['Câmera digital Sony Cyber-shot', 'Toques de chamada polifônicos / MP3', 'Mural de recados do Orkut']
  },
  2010: {
    topMovie: {
      title: 'A Origem (Inception) / Toy Story 3',
      director: 'Christopher Nolan / Lee Unkrich',
      tagline: 'Sua mente é a cena do crime.',
      funFact: 'Toy Story 3 levou adultos e crianças às lágrimas no cinema com o adeus aos brinquedos de Andy.'
    },
    topBrazilianTVOrCulture: 'O filme nacional "Tropa de Elite 2" bate o recorde histórico de maior bilheteria do cinema brasileiro.',
    techMilestone: 'Lançamento do primeiro iPad pela Apple e o aplicativo de fotos Instagram.',
    curiousTrend: 'Óculos estilo Wayfarer sem lente ou coloridos, calças skinny coloridas (estilo Restart).',
    nostalgiaItems: ['Angry Birds no celular', 'Foursquare dando check-in', 'Orkut dando espaço para o Facebook']
  },
  2012: {
    topMovie: {
      title: 'Os Vingadores (The Avengers)',
      director: 'Joss Whedon',
      tagline: 'Vingadores, avante!',
      funFact: 'Primeira reunião de super-heróis da Marvel nos cinemas que quebrou recordes mundiais.'
    },
    topBrazilianTVOrCulture: 'O fenômeno "Avenida Brasil" com Carminha, Nina e o congelamento clássico de tela no final de cada episódio.',
    techMilestone: 'Aterrissagem histórica do robô Curiosity em Marte e o salto estratosférico de Felix Baumgartner.',
    curiousTrend: 'Memes com o formato "Keep Calm and...", bigodes desenhados nos dedos e fotos no espelho com filtros fortes.',
    nostalgiaItems: ['Flappy Bird', 'Temple Run', 'Status no Facebook com músicas', 'Blackberry Messenger']
  },
  2015: {
    topMovie: {
      title: 'Star Wars: O Despertar da Força / Mad Max: Estrada da Fúria',
      director: 'J.J. Abrams / George Miller',
      tagline: 'A Força está chamando você. Apenas deixe-a entrar.',
      funFact: 'Maior bilheteria de todos os tempos nos cinemas dos Estados Unidos.'
    },
    topBrazilianTVOrCulture: 'A novela "Verdades Secretas" vira sensação nas noites e redes sociais.',
    techMilestone: 'Lançamento do primeiro Apple Watch e a popularização maciça dos aplicativos de transporte (Uber).',
    curiousTrend: 'Pau de selfie em viagens, filtros com orelha de cachorro no Snapchat e o meme do vestido "Azul e Preto ou Branco e Dourado?".',
    nostalgiaItems: ['Snapchat com sequência de fogo', 'Pau de selfie', 'Fidget Spinner (nascendo)']
  },
  2018: {
    topMovie: {
      title: 'Vingadores: Guerra Infinita / Pantera Negra',
      director: 'Irmãos Russo / Ryan Coogler',
      tagline: 'Wakanda Forever!',
      funFact: 'O estalo de Thanos no cinema gerou um dos maiores silêncios e choques coletivos da história das salas de cinema.'
    },
    topBrazilianTVOrCulture: 'Memes de canarinho pistola na Copa da Rússia e o hit "Vai Malandra".',
    techMilestone: 'A SpaceX de Elon Musk lança o foguete Falcon Heavy levando um carro Tesla ao espaço com Starman no volante.',
    curiousTrend: 'Dancinhas do jogo Fortnite (Floss), stories do Instagram com figurinhas e perguntas na caixinha.',
    nostalgiaItems: ['Fortnite no auge', 'Figurinhas no WhatsApp', 'Caixas de som portáteis Bluetooth']
  },
  2022: {
    topMovie: {
      title: 'Top Gun: Maverick / Avatar: O Caminho da Água',
      director: 'Joseph Kosinski / James Cameron',
      tagline: 'Sinta a necessidade... A necessidade de velocidade!',
      funFact: 'Tom Cruise filmou todas as cenas de voo a jato real sem dublês, salvando as bilheterias pós-pandemia.'
    },
    topBrazilianTVOrCulture: 'O remake épico da novela "Pantanal" com Juma Marruá que virava onça e Maria Bruaca.',
    techMilestone: 'Lançamento do ChatGPT-3.5 e primeiras imagens de alta definição do Telescópio Espacial James Webb.',
    curiousTrend: 'Áudios virais de 15 segundos no TikTok, filtros de IA que transformam fotos em anime.',
    nostalgiaItems: ['Álbum da Copa do Mundo do Catar', 'Wordle / Termo diário', 'Lives de streamers de games']
  },
  2024: {
    topMovie: {
      title: 'Duna: Parte 2 / Divertida Mente 2',
      director: 'Denis Villeneuve / Kelsey Mann',
      tagline: 'Vida longa aos guerreiros!',
      funFact: 'Divertida Mente 2 se tornou a maior bilheteria de uma animação de todos os tempos no cinema brasileiro e mundial.'
    },
    topBrazilianTVOrCulture: 'O remake de "Renascer" e memes diários nas redes do BBB 24.',
    techMilestone: 'Lançamento dos óculos de realidade mista Apple Vision Pro e modelos generativos multimodais de IA.',
    curiousTrend: 'Criação de vídeos hiper-realistas com IA, garrafas Stanley térmicas e estética Y2K reinventada pela Geração Z.',
    nostalgiaItems: ['Áudios acelerados em 2x', 'Trends do TikTok', 'IA gerando imagens e histórias instantâneas']
  }
};

export function getPopCultureForDate(year: number): PopCultureData {
  const availableYears = Object.keys(POP_CULTURE_DB).map(Number).sort((a, b) => a - b);
  let closestYear = availableYears[0];
  let minDiff = Infinity;
  for (const y of availableYears) {
    const diff = Math.abs(y - year);
    if (diff < minDiff) {
      minDiff = diff;
      closestYear = y;
    }
  }

  const data = POP_CULTURE_DB[closestYear];

  return {
    topMovie: {
      title: data.topMovie.title,
      director: data.topMovie.director,
      year: closestYear,
      tagline: data.topMovie.tagline,
      funFact: data.topMovie.funFact,
    },
    topBrazilianTVOrCulture: data.topBrazilianTVOrCulture,
    techMilestone: data.techMilestone,
    curiousTrend: data.curiousTrend,
    nostalgiaItems: data.nostalgiaItems,
  };
}
