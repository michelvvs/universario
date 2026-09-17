import { MusicData, MusicTrack, MusicCategoryRanking } from '@/types/universario';

interface YearMusicRanking {
  era: string;
  billboardTop5: Array<{ title: string; artist: string; highlight?: string; genre?: string; position?: number }>;
  brazilRadioTop5: Array<{ title: string; artist: string; highlight?: string; genre?: string; position?: number }>;
  brazilSalesTop5: Array<{ title: string; artist: string; highlight?: string; genre?: string; position?: number }>;
  radioSource?: string;
  salesSource?: string;
}

// Complete, curated historical charts across decades with distinct Radio and Sales rankings
const HISTORICAL_MUSIC_DB: Record<number, YearMusicRanking> = {
  // 1950s - 1960s
  1958: {
    era: 'Era de Ouro do Rock & Bossa Nova',
    radioSource: 'Rádios Nacionais (RJ/SP) & IBOPE',
    salesSource: 'Vendas de Discos 78 RPM e LPs',
    billboardTop5: [
      { title: 'Nel Blu Dipinto Di Blu (Volare)', artist: 'Domenico Modugno', highlight: '#1 do ano na Billboard' },
      { title: 'All I Have to Do Is Dream', artist: 'The Everly Brothers', highlight: 'Clássico vocal imortal' },
      { title: "Don't / I Beg of You", artist: 'Elvis Presley', highlight: 'Rei do Rock no topo' },
      { title: 'Johnny B. Goode', artist: 'Chuck Berry', highlight: 'Hino seminal do Rock and Roll' },
      { title: 'Tequila', artist: 'The Champs', highlight: 'Grande sucesso instrumental' }
    ],
    brazilRadioTop5: [
      { title: 'Chega de Saudade', artist: 'João Gilberto', highlight: 'Marco inicial da Bossa Nova nas rádios' },
      { title: 'Meu Mundo Caiu', artist: 'Maysa', highlight: 'Samba-canção mais executado' },
      { title: 'Conceição', artist: 'Cauby Peixoto', highlight: 'A voz de ouro das emissoras' },
      { title: 'A Noite do Meu Bem', artist: 'Dolores Duran', highlight: 'Clássico da noite carioca' },
      { title: 'Desafinado', artist: 'Tom Jobim / João Gilberto', highlight: 'Manifesto moderno da MPB' }
    ],
    brazilSalesTop5: [
      { title: 'Chega de Saudade (Compacto 78 RPM)', artist: 'João Gilberto (Odeon)', highlight: 'Divisor de águas na indústria' },
      { title: 'Convite para Ouvir Maysa nº 3', artist: 'Maysa (RGE)', highlight: 'Líder de vendas de LPs' },
      { title: 'Ouvindo Cauby', artist: 'Cauby Peixoto (Columbia)', highlight: 'Fenômeno de vendagem' },
      { title: 'Canção do Amor Demais', artist: 'Elizeth Cardoso (Festa)', highlight: 'Com violão de João Gilberto' },
      { title: 'Os Grandes Sucessos de Nelson Gonçalves', artist: 'Nelson Gonçalves (RCA)', highlight: 'Campeão de discos de vinil' }
    ]
  },
  1965: {
    era: 'Invasão Britânica e Jovem Guarda',
    radioSource: 'Rádios AM/FM Jovens e Festivais',
    salesSource: 'Auditoria NOPEM / Discos',
    billboardTop5: [
      { title: '(I Can\'t Get No) Satisfaction', artist: 'The Rolling Stones', highlight: 'Hino definitivo da contracultura' },
      { title: 'Yesterday', artist: 'The Beatles', highlight: 'Canção mais executada da história' },
      { title: 'Help!', artist: 'The Beatles', highlight: 'Febre mundial da Beatlemania' },
      { title: 'I Got You Babe', artist: 'Sonny & Cher', highlight: 'Dueto marcante dos anos 60' },
      { title: 'Like a Rolling Stone', artist: 'Bob Dylan', highlight: 'Revolução poética no folk-rock' }
    ],
    brazilRadioTop5: [
      { title: 'Quero Que Vá Tudo Pro Inferno', artist: 'Roberto Carlos', highlight: 'Explosão do programa Jovem Guarda' },
      { title: 'Arrastão', artist: 'Elis Regina', highlight: 'Consagração no I Festival de MPB' },
      { title: 'O Calhambeque', artist: 'Roberto Carlos', highlight: 'Hit obrigatório em todas as emissoras' },
      { title: 'Garota de Ipanema', artist: 'Astrud Gilberto & Tom Jobim', highlight: 'Fenômeno no Brasil e exterior' },
      { title: 'Trem das Onze', artist: 'Demônios da Garoa', highlight: 'Samba paulistano em alta' }
    ],
    brazilSalesTop5: [
      { title: 'Jovem Guarda (LP)', artist: 'Roberto Carlos (CBS)', highlight: 'Fenômeno de vendas com meio milhão' },
      { title: 'Samba, Eu Canto Assim', artist: 'Elis Regina (CBD/Philips)', highlight: 'Disco consagrado de estreia' },
      { title: 'Canta Para a Juventude', artist: 'Roberto Carlos (CBS)', highlight: 'Disco de platina da época' },
      { title: 'The Beatles 65', artist: 'The Beatles (Odeon)', highlight: 'LP internacional mais vendido' },
      { title: 'Festa de Arromba', artist: 'Erasmo Carlos (RGE)', highlight: 'Primeiro grande disco solo de Erasmo' }
    ]
  },
  1968: {
    era: 'Tropicalismo e Psicodelia',
    radioSource: 'Paradas de Sucesso Rádios RJ/SP',
    salesSource: 'NOPEM / Vendas de LPs',
    billboardTop5: [
      { title: 'Hey Jude', artist: 'The Beatles', highlight: '9 semanas consecutivas em #1' },
      { title: 'Mrs. Robinson', artist: 'Simon & Garfunkel', highlight: 'Trilha clássica de A Primeira Noite' },
      { title: 'Love Is Blue', artist: 'Paul Mauriat', highlight: 'Sucesso orquestral mundial' },
      { title: 'I Heard It Through the Grapevine', artist: 'Marvin Gaye', highlight: 'Obra-prima da Motown' },
      { title: 'Jumpin\' Jack Flash', artist: 'The Rolling Stones', highlight: 'Clássico supremo do rock' }
    ],
    brazilRadioTop5: [
      { title: 'Alegria, Alegria', artist: 'Caetano Veloso', highlight: 'Marco revolucionário da Tropicália' },
      { title: 'Sá Marina', artist: 'Wilson Simonal', highlight: 'Sucesso absoluto do Pilantragem' },
      { title: 'Pra Não Dizer Que Não Falei das Flores', artist: 'Geraldo Vandré', highlight: 'Hino histórico do FIC' },
      { title: 'Roda Viva', artist: 'Chico Buarque & MPB4', highlight: 'Sucesso crítico e popular' },
      { title: 'As Curvas da Estrada de Santos', artist: 'Roberto Carlos', highlight: 'Início da fase soul de Roberto' }
    ],
    brazilSalesTop5: [
      { title: 'O Inimitável', artist: 'Roberto Carlos (CBS)', highlight: 'LP seminal mais vendido de 1968' },
      { title: 'Tropicália ou Panis et Circencis', artist: 'Vários Artistas (Philips)', highlight: 'Manifesto do movimento tropicalista' },
      { title: 'Caetano Veloso (1968)', artist: 'Caetano Veloso (Philips)', highlight: 'Álbum icônico da nova MPB' },
      { title: 'Os Mutantes (1968)', artist: 'Os Mutantes (Polydor)', highlight: 'Álbum psicodélico de destaque' },
      { title: 'Show em Simonal', artist: 'Wilson Simonal (Odeon)', highlight: 'Campeão de vendagem do selo Odeon' }
    ]
  },
  1975: {
    era: 'Disco Music e MPB Clássica',
    radioSource: 'NOPEM / Rádios AM & FM',
    salesSource: 'NOPEM / Auditoria Fonográfica',
    billboardTop5: [
      { title: 'Love Will Keep Us Together', artist: 'Captain & Tennille', highlight: '#1 do ano na Billboard' },
      { title: 'Bohemian Rhapsody', artist: 'Queen', highlight: 'Obra-prima revolucionária do rock' },
      { title: 'Fame', artist: 'David Bowie', highlight: 'Primeiro #1 de Bowie nos EUA' },
      { title: 'Shining Star', artist: 'Earth, Wind & Fire', highlight: 'Hino funk e disco' },
      { title: 'Listen to What the Man Said', artist: 'Paul McCartney & Wings', highlight: 'Hit pop global' }
    ],
    brazilRadioTop5: [
      { title: 'Como Nossos Pais', artist: 'Elis Regina', highlight: 'Hino atemporal da MPB nas rádios' },
      { title: 'Juventude Transviada', artist: 'Luiz Melodia', highlight: 'Trilha inesquecível de novela' },
      { title: 'Além do Horizonte', artist: 'Roberto Carlos', highlight: 'Sucesso massivo nas emissoras' },
      { title: 'O Mestre-Sala dos Mares', artist: 'Elis Regina', highlight: 'Composição magistral de Aldir Blanc' },
      { title: 'Gita', artist: 'Raul Seixas', highlight: 'Misticismo e rock em alta rotação' }
    ],
    brazilSalesTop5: [
      { title: 'Roberto Carlos (1975 - Além do Horizonte)', artist: 'Roberto Carlos (CBS)', highlight: 'Mais de 1 milhão de cópias' },
      { title: 'Falso Brilhante', artist: 'Elis Regina (Phonogram)', highlight: 'Álbum histórico mais vendido da cantora' },
      { title: 'Novo Aeon / Gita', artist: 'Raul Seixas (Philips)', highlight: 'Disco de ouro de vendagem' },
      { title: 'Gabriela (Trilha Nacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Trilha sonora campeã de vendas' },
      { title: 'Minha História', artist: 'Wando (Beverly)', highlight: 'Explosão de estreia romântica' }
    ]
  },
  1977: {
    era: 'Febre da Disco e Glamour',
    radioSource: 'NOPEM / Rádios FM e Discotecas',
    salesSource: 'NOPEM / Rankings de LPs',
    billboardTop5: [
      { title: 'Stayin\' Alive', artist: 'Bee Gees', highlight: 'Fenômeno mundial da era disco' },
      { title: 'Hotel California', artist: 'Eagles', highlight: 'Clássico imortal das rádios' },
      { title: 'Sir Duke', artist: 'Stevie Wonder', highlight: 'Hino do funk/soul' },
      { title: 'Dancing Queen', artist: 'ABBA', highlight: '#1 do pop europeu e global' },
      { title: 'I Feel Love', artist: 'Donna Summer', highlight: 'Marco inicial da música eletrônica' }
    ],
    brazilRadioTop5: [
      { title: 'Amigo', artist: 'Roberto Carlos', highlight: 'Música mais tocada no país em 1977' },
      { title: 'Tigresa', artist: 'Caetano Veloso', highlight: 'Poesia consagrada em todas as rádios' },
      { title: 'Não Chore Mais (No Woman No Cry)', artist: 'Gilberto Gil', highlight: 'O reggae ganhando o Brasil' },
      { title: 'Cavalo de Pau', artist: 'Alceu Valença', highlight: 'Inovação da música nordestina' },
      { title: 'Folhetim', artist: 'Gal Costa / Chico Buarque', highlight: 'Trilha refinada de rádio' }
    ],
    brazilSalesTop5: [
      { title: 'Roberto Carlos (1977 - Amigo)', artist: 'Roberto Carlos (CBS)', highlight: 'Vendeu mais de 1,5 milhão de LPs' },
      { title: 'Saturday Night Fever (Trilha)', artist: 'Bee Gees (RSO/Phonogram)', highlight: 'LP internacional mais vendido' },
      { title: 'Bicho', artist: 'Caetano Veloso (Philips)', highlight: 'Grande vendagem de MPB dançante' },
      { title: 'Locomotivas (Trilha Internacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Trilha de novela recordista' },
      { title: 'Refavela', artist: 'Gilberto Gil (Philips)', highlight: 'Álbum clássico premiado' }
    ]
  },
  1980: {
    era: 'Início dos Anos 80 e Pop Cintilante',
    radioSource: 'NOPEM / Rádios FM RJ-SP',
    salesSource: 'NOPEM / LPs e Compactos',
    billboardTop5: [
      { title: 'Call Me', artist: 'Blondie', highlight: '#1 do ano na Billboard' },
      { title: 'Another One Bites the Dust', artist: 'Queen', highlight: 'Dominou rádios e pistas de dança' },
      { title: 'Woman in Love', artist: 'Barbra Streisand', highlight: 'Sucesso romântico planetário' },
      { title: 'Rock with You', artist: 'Michael Jackson', highlight: 'Consagração do álbum Off the Wall' },
      { title: '(Just Like) Starting Over', artist: 'John Lennon', highlight: 'Retorno histórico de John Lennon' }
    ],
    brazilRadioTop5: [
      { title: 'Lança Perfume', artist: 'Rita Lee', highlight: 'Explosão nas rádios do Brasil e exterior' },
      { title: 'Menino do Rio', artist: 'Baby do Brasil', highlight: 'Hino do verão carioca' },
      { title: 'Amante à Moda Antiga', artist: 'Roberto Carlos', highlight: 'Líder romântico nas rádios AM/FM' },
      { title: 'Baila Comigo', artist: 'Rita Lee', highlight: 'Hit pop definitivo de 1980' },
      { title: 'Meu Bem, Meu Mal', artist: 'Gal Costa', highlight: 'Trilha marcante de novela' }
    ],
    brazilSalesTop5: [
      { title: 'Rita Lee (1980 - Lança Perfume)', artist: 'Rita Lee (Som Livre)', highlight: 'Mais de 800 mil cópias vendidas' },
      { title: 'Roberto Carlos (1980)', artist: 'Roberto Carlos (CBS)', highlight: 'Líder anual absoluto de vendas' },
      { title: 'Água Viva (Trilha Nacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Fenômeno de vendagem em vinil' },
      { title: 'Aquarela do Brasil', artist: 'Gal Costa (Philips)', highlight: 'Disco de platina' },
      { title: 'Coração Leviano', artist: 'Beth Carvalho (RCA)', highlight: 'Samba em altíssima vendagem' }
    ]
  },
  1985: {
    era: 'Rock in Rio e Grandes Hinos Mundiais',
    radioSource: 'NOPEM / Rádios FM e Fluminense FM',
    salesSource: 'NOPEM / Vendas Físicas de LPs',
    billboardTop5: [
      { title: 'Careless Whisper', artist: 'George Michael', highlight: '#1 do ano na Billboard' },
      { title: 'We Are the World', artist: 'USA for Africa', highlight: 'Maior encontro de astros do pop' },
      { title: 'Take On Me', artist: 'a-ha', highlight: 'Inovação em synth-pop e clipe lendário' },
      { title: 'Like a Virgin', artist: 'Madonna', highlight: 'Consagração da Rainha do Pop' },
      { title: 'Money for Nothing', artist: 'Dire Straits', highlight: 'Clipe inaugural da MTV europeia' }
    ],
    brazilRadioTop5: [
      { title: 'Exagerado', artist: 'Cazuza', highlight: 'Estreia solo consagrada no Rock in Rio' },
      { title: 'Dona', artist: 'Roupa Nova', highlight: 'Trilha histórica da novela Roque Santeiro' },
      { title: 'Será', artist: 'Legião Urbana', highlight: 'Hino da juventude da redemocratização' },
      { title: 'Whisky a Go-Go', artist: 'Roupa Nova', highlight: 'Tocou sem parar nas rádios' },
      { title: 'Sonífera Ilha', artist: 'Titãs', highlight: 'O ska-pop dos Titãs dominando as FMs' }
    ],
    brazilSalesTop5: [
      { title: 'Roque Santeiro (Trilha Nacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Mais de 2,5 milhões de cópias vendidas' },
      { title: 'Roberto Carlos (1985 - Verde e Amarelo)', artist: 'Roberto Carlos (CBS)', highlight: 'Mais de 1,5 milhão de LPs' },
      { title: 'Legião Urbana (1985)', artist: 'Legião Urbana (EMI)', highlight: 'Disco de platina de estreia' },
      { title: 'Roupa Nova (1985 - Dona)', artist: 'Roupa Nova (RCA)', highlight: 'Um dos discos mais vendidos do ano' },
      { title: 'Exagerado (LP)', artist: 'Cazuza (Som Livre)', highlight: 'Sucesso de vendagem do rock nacional' }
    ]
  },
  1988: {
    era: 'Consagração do Pop/Rock Oitentista',
    radioSource: 'NOPEM / Rádios FM Brasileiras',
    salesSource: 'NOPEM / Auditoria de LPs',
    billboardTop5: [
      { title: 'Faith', artist: 'George Michael', highlight: '#1 do ano na Billboard' },
      { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', highlight: 'Clássico #1 da Billboard e MTV' },
      { title: 'Never Gonna Give You Up', artist: 'Rick Astley', highlight: 'Fenômeno global nas pistas' },
      { title: 'One More Try', artist: 'George Michael', highlight: 'Balada soul no topo das paradas' },
      { title: 'Man in the Mirror', artist: 'Michael Jackson', highlight: 'Hino do álbum Bad' }
    ],
    brazilRadioTop5: [
      { title: 'Faz Parte do Meu Show', artist: 'Cazuza', highlight: 'Bossa-rock mais tocada do ano' },
      { title: 'Faroeste Caboclo', artist: 'Legião Urbana', highlight: 'Obra épica de 9 minutos tocada sem cortes' },
      { title: 'Brasil', artist: 'Gal Costa / Cazuza', highlight: 'Abertura inesquecível da novela Vale Tudo' },
      { title: 'Quase Sem Querer', artist: 'Legião Urbana', highlight: 'Hit contínuo nas FMs' },
      { title: 'Astronauta de Mármore (Início)', artist: 'Nenhum de Nós', highlight: 'Estreando nas paradas' }
    ],
    brazilSalesTop5: [
      { title: 'Ideologia', artist: 'Cazuza (PolyGram/Philips)', highlight: 'Mais de 500 mil cópias vendidas' },
      { title: 'Que País É Este', artist: 'Legião Urbana (EMI)', highlight: 'Mais de 1 milhão de LPs vendidos' },
      { title: 'Xou da Xuxa 3', artist: 'Xuxa (Som Livre)', highlight: 'Recorde com 3,2 milhões de LPs' },
      { title: 'Roberto Carlos (1988)', artist: 'Roberto Carlos (CBS)', highlight: 'Líder em vendagem' },
      { title: 'Vale Tudo (Trilha Nacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Top 1 de trilhas de novela' }
    ]
  },
  1989: {
    era: 'A Virada de Era: Pop Sintetizado e Fim dos Anos 80',
    radioSource: 'NOPEM / Crowley / Rádios FM (Maio/1989)',
    salesSource: 'Instituto NOPEM / Vendas Físicas de LPs (1989)',
    billboardTop5: [
      { title: 'Forever Your Girl', artist: 'Paula Abdul', highlight: '#1 na Billboard Hot 100 na semana de 20-26 de maio de 1989', position: 1 },
      { title: 'Like a Prayer', artist: 'Madonna', highlight: 'Sucesso mundial estrondoso e clipe lendário', position: 2 },
      { title: 'Patience', artist: 'Guns N\' Roses', highlight: 'Clássico acústico no Top 3 da Billboard', position: 3 },
      { title: 'I\'ll Be There for You', artist: 'Bon Jovi', highlight: 'Hino do hard rock oitentista', position: 4 },
      { title: 'The Look', artist: 'Roxette', highlight: 'Estreia pop sueca que conquistou o mundo', position: 5 }
    ],
    brazilRadioTop5: [
      { title: 'Astronauta de Mármore', artist: 'Nenhum de Nós', highlight: 'Canção nacional mais tocada nas rádios FM do Brasil em maio/1989', position: 1 },
      { title: 'Mordida de Amor (Love Bites)', artist: 'Yahoo', highlight: 'Balada de rock em altíssima rotação nas FMs', position: 2 },
      { title: 'Meu Universo É Você', artist: 'Roupa Nova', highlight: 'Pop romântico nas primeiras posições de rádio', position: 3 },
      { title: 'Há Tempos', artist: 'Legião Urbana', highlight: 'Lançamento marcante do álbum As Quatro Estações', position: 4 },
      { title: 'Lanterna dos Afogados', artist: 'Os Paralamas do Sucesso', highlight: 'Clássico melancólico executado diariamente', position: 5 }
    ],
    brazilSalesTop5: [
      { title: 'O Tempo Não Pára', artist: 'Cazuza (PolyGram/Philips)', highlight: 'Disco ao vivo mais vendido do rock nacional (>560 mil cópias)', position: 1 },
      { title: 'Angélica (1988/1989 - Vou de Táxi)', artist: 'Angélica (CBS)', highlight: 'Fenômeno infantil e pop com mais de 1 milhão de LPs', position: 2 },
      { title: 'Xou da Xuxa 4 / 3', artist: 'Xuxa (Som Livre)', highlight: 'Líder histórica de vendas na auditoria da NOPEM', position: 3 },
      { title: 'Roberto Carlos (1988/1989)', artist: 'Roberto Carlos (CBS)', highlight: 'Presença garantida no topo dos mais vendidos', position: 4 },
      { title: 'Cardume', artist: 'Nenhum de Nós (BMG/RCA)', highlight: 'Mais de 250 mil cópias impulsionadas pelo compacto', position: 5 }
    ]
  },
  1991: {
    era: 'Revolução Grunge e Sertanejo Romântico',
    radioSource: 'Crowley Broadcast / Rádios AM-FM',
    salesSource: 'NOPEM / Vendas Físicas',
    billboardTop5: [
      { title: '(Everything I Do) I Do It for You', artist: 'Bryan Adams', highlight: '#1 absoluto em dezenas de países' },
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana', highlight: 'A virada que mudou o rock mundial' },
      { title: 'Black or White', artist: 'Michael Jackson', highlight: 'Mega-lançamento do álbum Dangerous' },
      { title: 'Rush Rush', artist: 'Paula Abdul', highlight: '5 semanas no topo do Hot 100' },
      { title: 'Losing My Religion', artist: 'R.E.M.', highlight: 'Consagração do rock alternativo' }
    ],
    brazilRadioTop5: [
      { title: 'É o Amor', artist: 'Zezé Di Camargo & Luciano', highlight: 'Fenômeno que inaugurou a era sertaneja nas rádios' },
      { title: 'Pense em Mim', artist: 'Leandro & Leonardo', highlight: 'Canção mais pedida pelos ouvintes' },
      { title: 'Vento no Litoral', artist: 'Legião Urbana', highlight: 'Poesia melancólica que marcou a década' },
      { title: 'Sonhos', artist: 'Peninha', highlight: 'Sucesso romântico nas rádios AM/FM' },
      { title: 'O Amor e o Poder (Como Uma Deusa)', artist: 'Rosana', highlight: 'Clássico romântico nas paradas' }
    ],
    brazilSalesTop5: [
      { title: 'É o Amor (Zezé Di Camargo & Luciano)', artist: 'Zezé Di Camargo & Luciano (Copacabana)', highlight: 'Mais de 1,1 milhão de cópias vendidas' },
      { title: 'Leandro & Leonardo Vol. 5', artist: 'Leandro & Leonardo (Chantecler)', highlight: 'Mais de 2 milhões de cópias' },
      { title: 'V / As Quatro Estações', artist: 'Legião Urbana (EMI)', highlight: 'Platina quádrupla' },
      { title: 'Xou da Xuxa Seis', artist: 'Xuxa (Som Livre)', highlight: 'Campeão anual de vendas' },
      { title: 'Roberto Carlos (1991)', artist: 'Roberto Carlos (Sony Music)', highlight: 'Líder de vendas da gravadora' }
    ]
  },
  1994: {
    era: 'Tetra no Futebol e Axé/Pagode em Alta',
    radioSource: 'Crowley Broadcast / Rádios FM',
    salesSource: 'ABPD / NOPEM',
    billboardTop5: [
      { title: 'The Sign', artist: 'Ace of Base', highlight: '#1 do ano na Billboard' },
      { title: 'I Swear', artist: 'All-4-One', highlight: '11 semanas consecutivas em #1' },
      { title: 'I\'ll Make Love to You', artist: 'Boyz II Men', highlight: '14 semanas no topo do Hot 100' },
      { title: 'Stay (I Missed You)', artist: 'Lisa Loeb', highlight: 'Trilha de Caindo na Real' },
      { title: 'Hero', artist: 'Mariah Carey', highlight: 'Clássico vocal dos anos 90' }
    ],
    brazilRadioTop5: [
      { title: 'Me Leva', artist: 'Latino', highlight: 'Febre jovem e pop nas rádios' },
      { title: 'O Canto da Cidade', artist: 'Daniela Mercury', highlight: 'Axé music em consagração nacional' },
      { title: 'Coração da Bola / Hino do Tetra', artist: 'Vários Artistas', highlight: 'Embalou a conquista da Copa nos EUA' },
      { title: 'Ciúme de Você', artist: 'Raça Negra', highlight: 'Pagode romântico em altíssima rotação' },
      { title: 'Temporal', artist: 'Art Popular', highlight: 'Sucesso nas emissoras de SP e RJ' }
    ],
    brazilSalesTop5: [
      { title: 'É Demais', artist: 'Só Pra Contrariar (RCA/BMG)', highlight: 'Mais de 1,2 milhão de cópias' },
      { title: 'Raça Negra Vol. 5', artist: 'Raça Negra (RGE)', highlight: 'Disco de diamante de vendagem' },
      { title: 'Daniela Mercury (Música de Rua)', artist: 'Daniela Mercury (Sony Music)', highlight: 'Top vendas de axé' },
      { title: 'Marcas de Amor', artist: 'Latino (Columbia)', highlight: 'Fenômeno de estreia pop/dance' },
      { title: 'Chitãozinho & Xororó (1994)', artist: 'Chitãozinho & Xororó (PolyGram)', highlight: 'Mais de 1 milhão de cópias' }
    ]
  },
  1995: {
    era: 'Explosão dos Mamonas Assassinas e Coolio',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'ABPD (Pro-Música Brasil)',
    billboardTop5: [
      { title: 'Gangsta\'s Paradise', artist: 'Coolio feat. L.V.', highlight: '#1 do ano na Billboard e trilha de Mentes Perigosas' },
      { title: 'Waterfalls', artist: 'TLC', highlight: '7 semanas no topo do Hot 100' },
      { title: 'Creep', artist: 'TLC', highlight: 'Clássico de R&B da década' },
      { title: 'Fantasy', artist: 'Mariah Carey', highlight: 'Estreou direto em #1 na Billboard' },
      { title: 'Kiss from a Rose', artist: 'Seal', highlight: 'Trilha de Batman Eternamente' }
    ],
    brazilRadioTop5: [
      { title: 'Pelados em Santos', artist: 'Mamonas Assassinas', highlight: 'Fenômeno absoluto e meteórico nas FMs' },
      { title: 'Robocop Gay', artist: 'Mamonas Assassinas', highlight: 'Executada em todas as rádios do país' },
      { title: 'Mulher de Fases', artist: 'Raimundos', highlight: 'Rock nacional acelerado em alta' },
      { title: 'Papo de Jacaré', artist: 'P.O. Box', highlight: 'Hit descontraído das rádios' },
      { title: 'A Barata', artist: 'Só Pra Contrariar', highlight: 'Pagode divertido tocando sem parar' }
    ],
    brazilSalesTop5: [
      { title: 'Mamonas Assassinas (LP/CD)', artist: 'Mamonas Assassinas (EMI)', highlight: 'Quase 3 milhões de cópias em tempo recorde' },
      { title: 'Lavô Tá Novo', artist: 'Raimundos (Warner)', highlight: 'Mais de 400 mil cópias vendidas' },
      { title: 'O Samba Pede Passagem', artist: 'Só Pra Contrariar (BMG)', highlight: 'Disco de diamante' },
      { title: 'Leandro & Leonardo Vol. 9', artist: 'Leandro & Leonardo (Chantecler)', highlight: 'Mais de 1,5 milhão de cópias' },
      { title: 'A Próxima Vítima (Nacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Trilha campeã de vendas' }
    ]
  },
  1998: {
    era: 'Titanic, Copa da França e Pagode 90',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'ABPD (Pro-Música Brasil)',
    billboardTop5: [
      { title: 'My Heart Will Go On', artist: 'Celine Dion', highlight: 'Tema de Titanic, Oscar e Grammy de Música do Ano' },
      { title: 'Too Close', artist: 'Next', highlight: '#1 do ano na Billboard' },
      { title: 'The Boy Is Mine', artist: 'Brandy & Monica', highlight: '13 semanas consecutivas em #1' },
      { title: 'Truly Madly Deeply', artist: 'Savage Garden', highlight: 'Balada pop global' },
      { title: 'The Cup of Life (La Copa de la Vida)', artist: 'Ricky Martin', highlight: 'Hino oficial da Copa do Mundo 98' }
    ],
    brazilRadioTop5: [
      { title: 'Sozinho', artist: 'Caetano Veloso', highlight: 'Trilha de Suave Veneno, maior hit da MPB nos anos 90' },
      { title: 'Depois do Prazer', artist: 'Só Pra Contrariar', highlight: 'Canção mais executada nas rádios do Brasil em 1998' },
      { title: 'Sai da Minha Aba', artist: 'Só Pra Contrariar', highlight: 'Hit obrigatório em todas as emissoras' },
      { title: 'Garota Nacional', artist: 'Skank', highlight: 'Pop-rock nacional dominando as FMs' },
      { title: 'Resposta', artist: 'Skank', highlight: 'Balada composta com Nando Reis' }
    ],
    brazilSalesTop5: [
      { title: 'Só Pra Contrariar (1997/1998)', artist: 'Só Pra Contrariar (BMG)', highlight: 'Mais de 3,2 milhões de CDs (Recorde histórico)' },
      { title: 'Prenda Minha', artist: 'Caetano Veloso (Universal)', highlight: 'Mais de 1 milhão de cópias vendidas' },
      { title: 'Titanic: Music from the Motion Picture', artist: 'James Horner / Celine Dion (Sony)', highlight: 'Mais de 1 milhão de cópias no Brasil' },
      { title: 'Era Uma Vez... Ao Vivo', artist: 'Sandy & Junior (PolyGram)', highlight: 'Mais de 1 milhão de CDs' },
      { title: 'Siderado', artist: 'Skank (Sony Music)', highlight: 'Disco de platina triplo' }
    ]
  },
  2000: {
    era: 'Virada do Milênio e Pop Teen',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'ABPD / Certificados de Disco de Diamante',
    billboardTop5: [
      { title: 'Say My Name', artist: 'Destiny\'s Child', highlight: 'Clássico R&B que marcou a virada de milênio' },
      { title: 'Music', artist: 'Madonna', highlight: '#1 em 25 países simultaneamente' },
      { title: 'It\'s Gonna Be Me', artist: '*NSYNC', highlight: 'Febre boyband nos EUA' },
      { title: 'Maria Maria', artist: 'Santana feat. The Product G&B', highlight: '10 semanas no topo do Hot 100' },
      { title: 'Oops!... I Did It Again', artist: 'Britney Spears', highlight: 'Fenômeno pop global' }
    ],
    brazilRadioTop5: [
      { title: 'A Lenda', artist: 'Sandy & Junior', highlight: 'Hino pop absoluto tocado em todas as rádios' },
      { title: 'Amor I Love You', artist: 'Marisa Monte', highlight: 'Poema de Arnaldo Antunes que marcou época' },
      { title: 'Tô Nem Aí', artist: 'Luka', highlight: 'Sucesso pop nacional e internacional' },
      { title: 'Primeiros Erros (Chove)', artist: 'Capital Inicial (Acústico MTV)', highlight: 'Ressurgimento do BRock nas rádios' },
      { title: 'Se Eu Não Te Amasse Tanto Assim', artist: 'Ivete Sangalo', highlight: 'Trilha de novela e sucesso romântico' }
    ],
    brazilSalesTop5: [
      { title: 'Quatro Estações: O Show', artist: 'Sandy & Junior (Universal)', highlight: 'Mais de 3 milhões de cópias vendidas' },
      { title: 'Acústico MTV: Capital Inicial', artist: 'Capital Inicial (BMG)', highlight: 'Mais de 1 milhão de CDs vendidos' },
      { title: 'Memórias, Crônicas e Declarações de Amor', artist: 'Marisa Monte (EMI)', highlight: 'Disco de diamante' },
      { title: 'Laços de Família (Trilha Nacional)', artist: 'Vários Artistas (Som Livre)', highlight: 'Trilha sonora campeã de vendas' },
      { title: 'Ivete Sangalo (1999/2000)', artist: 'Ivete Sangalo (Universal)', highlight: 'Disco de platina duplo solo' }
    ]
  },
  2005: {
    era: 'Era dos iPods, Emo e Black Eyed Peas',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'ABPD / Vendas Digitais & Físicas',
    billboardTop5: [
      { title: 'We Belong Together', artist: 'Mariah Carey', highlight: 'Música da década de 2000 na Billboard' },
      { title: 'Hollaback Girl', artist: 'Gwen Stefani', highlight: 'Primeira música com 1 milhão de downloads' },
      { title: 'Don\'t Phunk with My Heart', artist: 'The Black Eyed Peas', highlight: 'Hit global de pistas e rádios' },
      { title: 'Boulevard of Broken Dreams', artist: 'Green Day', highlight: 'Grammy de Gravação do Ano' },
      { title: 'Gold Digger', artist: 'Kanye West feat. Jamie Foxx', highlight: '10 semanas no topo da Billboard' }
    ],
    brazilRadioTop5: [
      { title: 'Você Sempre Será', artist: 'Marjorie Estiano', highlight: 'Hit da Vagabanda em Malhação em #1 nas rádios' },
      { title: 'Um Minuto Para o Fim do Mundo', artist: 'CPM 22', highlight: 'Rock hardcore melódico no topo das paradas' },
      { title: 'Na Sua Estante', artist: 'Pitty', highlight: 'Rock feminino brasileiro com alta execução' },
      { title: 'Vamos Fugir', artist: 'Skank', highlight: 'Regravação de Gilberto Gil que virou hino' },
      { title: 'Ela Vai Voltar', artist: 'Charlie Brown Jr.', highlight: 'Sucesso comovente nas FMs' }
    ],
    brazilSalesTop5: [
      { title: 'Marjorie Estiano (Álbum de Estreia)', artist: 'Marjorie Estiano (Universal)', highlight: 'Disco de platina em vendagem' },
      { title: 'Felicidade Instantânea', artist: 'CPM 22 (Arsenal/Sony)', highlight: 'Platina de vendagem' },
      { title: 'Anacrônico', artist: 'Pitty (Deckdisc)', highlight: 'Disco de platina' },
      { title: 'MTV Ao Vivo: Ivete Sangalo', artist: 'Ivete Sangalo (Universal)', highlight: 'Mais de 1,5 milhão de cópias/DVDs' },
      { title: 'Imunidade Musical', artist: 'Charlie Brown Jr. (EMI)', highlight: 'Disco de ouro e platina' }
    ]
  },
  2010: {
    era: 'Waka Waka, Copa na África e Sertanejo Universitário',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'ABPD / iTunes Brasil / Streaming',
    billboardTop5: [
      { title: 'Tik Tok', artist: 'Kesha', highlight: '#1 do ano na Billboard Hot 100' },
      { title: 'Waka Waka (This Time for Africa)', artist: 'Shakira', highlight: 'Hino oficial da Copa do Mundo 2010' },
      { title: 'Bad Romance', artist: 'Lady Gaga', highlight: 'Clipe mais assistido da internet na época' },
      { title: 'California Gurls', artist: 'Katy Perry feat. Snoop Dogg', highlight: 'Sucesso do álbum Teenage Dream' },
      { title: 'Love the Way You Lie', artist: 'Eminem feat. Rihanna', highlight: '7 semanas no topo da Billboard' }
    ],
    brazilRadioTop5: [
      { title: 'Meteoro', artist: 'Luan Santana', highlight: 'Canção que lançou o fenômeno jovem do sertanejo' },
      { title: 'Fugidinha', artist: 'Michel Teló', highlight: 'Comemoração dos gols de Neymar e hit nas rádios' },
      { title: 'Pra Você', artist: 'Paula Fernandes', highlight: 'Recorde de execuções nas rádios' },
      { title: 'Adocica / Garota Safada', artist: 'Wesley Safadão', highlight: 'Início da explosão do forró eletrônico' },
      { title: 'Paga Pau', artist: 'Fernando & Sorocaba', highlight: 'Hit consagrado do sertanejo universitário' }
    ],
    brazilSalesTop5: [
      { title: 'Ao Vivo no Rio (CD/DVD)', artist: 'Luan Santana (Som Livre)', highlight: 'Mais de 1 milhão de cópias vendidas' },
      { title: 'Paula Fernandes: Ao Vivo', artist: 'Paula Fernandes (Universal)', highlight: 'Mais de 1,6 milhão de cópias vendidas' },
      { title: 'Balada Sertaneja', artist: 'Michel Teló (Som Livre)', highlight: 'Certificação de platina' },
      { title: 'Acústico MTV: Charlie Brown Jr.', artist: 'Charlie Brown Jr. (EMI)', highlight: 'Campeão de catálogo' },
      { title: 'The Fame Monster', artist: 'Lady Gaga (Universal)', highlight: 'Álbum internacional mais vendido no país' }
    ]
  },
  2015: {
    era: 'Streaming, Trap e Ascensão do Feminejo',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'Pro-Música Brasil / Spotify Brasil',
    billboardTop5: [
      { title: 'Uptown Funk', artist: 'Mark Ronson feat. Bruno Mars', highlight: '14 semanas no topo do Hot 100' },
      { title: 'See You Again', artist: 'Wiz Khalifa feat. Charlie Puth', highlight: 'Trilha emotiva de Velozes e Furiosos 7' },
      { title: 'Hello', artist: 'Adele', highlight: 'Primeira canção a vender 1 milhão de downloads em 1 semana' },
      { title: 'Can\'t Feel My Face', artist: 'The Weeknd', highlight: 'Consagração pop mundial de The Weeknd' },
      { title: 'Sugar', artist: 'Maroon 5', highlight: 'Hit pop radiofônico de grande alcance' }
    ],
    brazilRadioTop5: [
      { title: 'Aquele 1%', artist: 'Marcos & Belutti feat. Wesley Safadão', highlight: 'Música mais executada nas rádios do Brasil em 2015' },
      { title: 'Escreve Aí', artist: 'Luan Santana', highlight: 'Líder nas rádios do país durante meses' },
      { title: 'Suíte 14', artist: 'Henrique & Diego feat. MC Guimê', highlight: 'Fusão de sertanejo com funk nas rádios' },
      { title: 'Infiel', artist: 'Marília Mendonça', highlight: 'Início do movimento histórico do Feminejo' },
      { title: 'Bang', artist: 'Anitta', highlight: 'Clipe e coreografia que revolucionaram o pop brasileiro' }
    ],
    brazilSalesTop5: [
      { title: 'Marília Mendonça: Ao Vivo', artist: 'Marília Mendonça (Som Livre)', highlight: 'Disco de diamante triplo em streaming e vendas' },
      { title: 'Acústico', artist: 'Luan Santana (Som Livre)', highlight: 'Mais de 300 mil cópias vendidas' },
      { title: 'Bang (Álbum)', artist: 'Anitta (Warner Music)', highlight: 'Disco de platina de streaming' },
      { title: 'Novas Histórias', artist: 'Henrique & Juliano (Som Livre)', highlight: 'Um dos mais ouvidos do ano no Spotify' },
      { title: 'Como Sempre Feito Nunca', artist: 'Jorge & Mateus (Som Livre)', highlight: 'Certificado de diamante' }
    ]
  },
  2020: {
    era: 'TikTok Hits, Blinding Lights e Pisadinha',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'Pro-Música Brasil / Top 50 Spotify Brasil',
    billboardTop5: [
      { title: 'Blinding Lights', artist: 'The Weeknd', highlight: 'Música mais ouvida da história da Billboard Hot 100' },
      { title: 'Watermelon Sugar', artist: 'Harry Styles', highlight: 'Hino do pop moderno e vencedor do Grammy' },
      { title: 'Dynamite', artist: 'BTS', highlight: 'Primeiro #1 do k-pop na história da Billboard' },
      { title: 'The Box', artist: 'Roddy Ricch', highlight: '11 semanas consecutivas em #1' },
      { title: 'Don\'t Start Now', artist: 'Dua Lipa', highlight: 'Consagração do disco Future Nostalgia' }
    ],
    brazilRadioTop5: [
      { title: 'Liberdade Provisória', artist: 'Henrique & Juliano', highlight: 'Música mais executada nas rádios do Brasil em 2020' },
      { title: 'A Gente Fez Amor', artist: 'Gusttavo Lima', highlight: 'Hit absoluto nas lives da quarentena' },
      { title: 'Recairei', artist: 'Os Barões da Pisadinha', highlight: 'Consagração do piseiro nas emissoras do país' },
      { title: 'Graveto', artist: 'Marília Mendonça', highlight: 'Mais de 100 mil execuções em rádios' },
      { title: 'Com Amor Me Esquecer', artist: 'Zé Neto & Cristiano', highlight: 'Top 5 das paradas de rádio' }
    ],
    brazilSalesTop5: [
      { title: 'Recairei (Streaming)', artist: 'Os Barões da Pisadinha (Sony)', highlight: 'Diamante sêxtuplo no Spotify Brasil' },
      { title: 'Liberdade Provisória', artist: 'Henrique & Juliano (Universal)', highlight: 'Música mais reproduzida do ano no Brasil' },
      { title: 'Basta Você Me Ligar', artist: 'Os Barões da Pisadinha ft. Xand Avião', highlight: 'Fenômeno de reproduções digitais' },
      { title: 'Áudio', artist: 'Diego & Victor Hugo', highlight: 'Disco de diamante' },
      { title: 'BRISA / Dona de Mim', artist: 'IZA (Warner)', highlight: 'Diamante em execuções de streaming' }
    ]
  },
  2024: {
    era: 'Eras Tour, Pop Synth & Sertanejo Acústico',
    radioSource: 'Crowley Broadcast Analysis',
    salesSource: 'Pro-Música Brasil / Top 50 Spotify Brasil',
    billboardTop5: [
      { title: 'Cruel Summer / Fortnight', artist: 'Taylor Swift', highlight: 'Dominou o streaming planetário' },
      { title: 'Espresso', artist: 'Sabrina Carpenter', highlight: 'O hit mais chiclete e viral do ano' },
      { title: 'Beautiful Things', artist: 'Benson Boone', highlight: 'Voz marcante e explosão no TikTok' },
      { title: 'Lose Control', artist: 'Teddy Swims', highlight: 'Soul moderno no topo do Hot 100' },
      { title: 'Houdini', artist: 'Dua Lipa', highlight: 'Hit pop dançante internacional' }
    ],
    brazilRadioTop5: [
      { title: 'Barulho do Foguete', artist: 'Zé Neto & Cristiano', highlight: 'Música mais tocada nas rádios do Brasil em 2024' },
      { title: 'Nosso Quadro', artist: 'Ana Castela', highlight: 'Ana Castela no posto de artista mais ouvida do país' },
      { title: 'Escrito nas Estrelas (Regravação)', artist: 'Lauana Prado', highlight: 'Viral arrebatador em todas as emissoras' },
      { title: 'Daqui pra Sempre', artist: 'Manu Bahtidão ft. Simone Mendes', highlight: 'Tecnomelody e sertanejo no topo das FMs' },
      { title: 'Haverá Sinais', artist: 'Jorge & Mateus ft. Lauana Prado', highlight: 'Sucesso massivo nas programações' }
    ],
    brazilSalesTop5: [
      { title: 'Nosso Quadro (Streaming)', artist: 'Ana Castela (AgroPlay)', highlight: 'Diamante quádruplo de streaming no Brasil' },
      { title: 'Let\'s Go 4', artist: 'DJ GBR, MC IG, MC Ryan SP', highlight: 'Mais de 200 milhões de streams' },
      { title: 'Me Leva Pra Casa / Escrito nas Estrelas', artist: 'Lauana Prado (Universal)', highlight: '#1 no Spotify Brasil' },
      { title: 'Barulho do Foguete', artist: 'Zé Neto & Cristiano (Som Livre)', highlight: 'Top 3 em streams nacionais' },
      { title: 'Canudinho', artist: 'Gusttavo Lima ft. Ana Castela', highlight: 'Sucesso absoluto de reproduções' }
    ]
  }
};

export function getMusicForDate(year: number, month: number): MusicData {
  // Find closest year in database
  const availableYears = Object.keys(HISTORICAL_MUSIC_DB).map(Number).sort((a, b) => a - b);

  let closestYear = availableYears[0];
  let minDiff = Infinity;
  for (const y of availableYears) {
    const diff = Math.abs(y - year);
    if (diff < minDiff) {
      minDiff = diff;
      closestYear = y;
    }
  }

  const data = HISTORICAL_MUSIC_DB[closestYear];

  // Map tracks to full MusicTrack objects with 1-based positions
  const billboardTop5: MusicTrack[] = data.billboardTop5.map((t, idx) => ({
    title: t.title,
    artist: t.artist,
    year: closestYear,
    highlight: t.highlight || `#${idx + 1} na Billboard Hot 100`,
    genre: t.genre || 'Pop / Billboard Hot 100',
    position: idx + 1,
    chartContext: 'Billboard Hot 100 (EUA / Internacional)',
  }));

  const brazilRadioTop5: MusicTrack[] = data.brazilRadioTop5.map((t, idx) => ({
    title: t.title,
    artist: t.artist,
    year: closestYear,
    highlight: t.highlight || `#${idx + 1} nas rádios brasileiras em ${month}/${year}`,
    genre: t.genre || 'Música Brasileira / Rádio',
    position: idx + 1,
    chartContext: 'Rádios Brasil (Airplay)',
  }));

  const brazilSalesTop5: MusicTrack[] = data.brazilSalesTop5.map((t, idx) => ({
    title: t.title,
    artist: t.artist,
    year: closestYear,
    highlight: t.highlight || `#${idx + 1} em vendas / streaming no Brasil em ${year}`,
    genre: t.genre || 'Vendas Físicas / Streaming Brasil',
    position: idx + 1,
    chartContext: 'Vendas & Streaming Brasil',
  }));

  const categories: MusicCategoryRanking[] = [
    {
      id: 'radio_br',
      categoryName: 'Rádios Brasil',
      subtitle: 'Mais tocadas nas emissoras de rádio',
      source: data.radioSource || 'Crowley Broadcast / NOPEM / ECAD',
      icon: 'radio',
      tracks: brazilRadioTop5,
    },
    {
      id: 'sales_br',
      categoryName: 'Vendas Brasil',
      subtitle: 'Discos, LPs, Compactos e Streaming',
      source: data.salesSource || 'NOPEM / Pro-Música Brasil / ABPD',
      icon: 'disc',
      tracks: brazilSalesTop5,
    },
    {
      id: 'billboard',
      categoryName: 'Billboard Hot 100',
      subtitle: 'Parada oficial nos Estados Unidos e mundo',
      source: 'Billboard Hot 100 (EUA)',
      icon: 'globe',
      tracks: billboardTop5,
    },
  ];
  return {
    globalTopTrack: billboardTop5[0],
    brazilTopTrack: brazilRadioTop5[0],
    brazilSalesTrack: brazilSalesTop5[0],
    billboardTop5,
    brazilRadioTop5,
    brazilSalesTop5,
    categories,
    musicEra: data.era,
    runnerUpTracks: [
      brazilRadioTop5[1] || brazilRadioTop5[0],
      brazilSalesTop5[0] || brazilRadioTop5[0],
      billboardTop5[1] || billboardTop5[0],
    ],
  };
}

import { fetchMusicCoverUrl } from './music-cover';

export async function enrichMusicWithCovers(music: MusicData): Promise<MusicData> {
  const tasks: Array<Promise<void>> = [];

  const enrichTrack = async (track: MusicTrack) => {
    if (!track.coverUrl) {
      try {
        const cover = await fetchMusicCoverUrl(track.title, track.artist);
        if (cover) {
          track.coverUrl = cover;
        }
      } catch {}
    }
  };

  // Enrich global top 1, brazil radio top 1, brazil sales top 1
  if (music.globalTopTrack) tasks.push(enrichTrack(music.globalTopTrack));
  if (music.brazilTopTrack) tasks.push(enrichTrack(music.brazilTopTrack));
  if (music.brazilSalesTrack) tasks.push(enrichTrack(music.brazilSalesTrack));

  // Enrich all #1s in categories
  if (music.categories) {
    for (const cat of music.categories) {
      if (cat.tracks && cat.tracks.length > 0) {
        tasks.push(enrichTrack(cat.tracks[0]));
      }
    }
  }

  // Also enrich billboardTop5[0], brazilRadioTop5[0], brazilSalesTop5[0]
  if (music.billboardTop5?.[0]) tasks.push(enrichTrack(music.billboardTop5[0]));
  if (music.brazilRadioTop5?.[0]) tasks.push(enrichTrack(music.brazilRadioTop5[0]));
  if (music.brazilSalesTop5?.[0]) tasks.push(enrichTrack(music.brazilSalesTop5[0]));

  await Promise.all(tasks);

  // Sync covers across instances
  if (music.billboardTop5?.[0]?.coverUrl && music.globalTopTrack) {
    music.globalTopTrack.coverUrl = music.billboardTop5[0].coverUrl;
  }
  if (music.brazilRadioTop5?.[0]?.coverUrl && music.brazilTopTrack) {
    music.brazilTopTrack.coverUrl = music.brazilRadioTop5[0].coverUrl;
  }
  if (music.brazilSalesTop5?.[0]?.coverUrl && music.brazilSalesTrack) {
    music.brazilSalesTrack.coverUrl = music.brazilSalesTop5[0].coverUrl;
  }

  return music;
}

