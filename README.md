# 📼✨ Universário — Sua Cápsula do Tempo Retrô Anos 80

> **Uma viagem nostálgica no tempo em formato de Instagram Stories (9:16), revelando como era o mundo e o universo no dia exato do seu nascimento.**

---

## 🌟 Sobre o Projeto

O **Universário** é uma experiência interativa e imersiva inspirada na vibrante estética **Memphis Design dos anos 80**, sintetizadores, fitas K7 e televisores CRT de tubo.

Ao informar uma data de nascimento, a aplicação compila instantaneamente uma retrospectiva personalizada com dados astronômicos, fatos históricos, cultura pop e as paradas musicais daquela exata semana.

---

## 🚀 Funcionalidades Principais

- 📼 **Estética Retrô Anos 80 (Memphis & Vaporwave)**:
  - Efeitos de scanlines CRT, granulação de filme procedural analógico e aberração cromática.
  - Molduras Polaroid com fita adesiva (*washi tape*), fitas cassete com carretéis giratórios e formas geométricas Memphis.
- 🎵 **3 Paradas Musicais Históricas Semanais (Top 5)**:
  - 📻 **Top 5 Rádios Brasil**: Músicas nacionais e internacionais mais tocadas nas rádios brasileiras (dados históricos NOPEM).
  - 💿 **Top 5 Vendas no Brasil**: Discos e fitas K7 mais vendidos no país (dados ABPD / NOPEM).
  - 🌎 **Top 5 Billboard Hot 100**: Os maiores hits mundiais da semana nos Estados Unidos.
  - 📀 **Vinil 3D Interativo**: O hit #1 de cada categoria ganha destaque com vinil giratório e capa do álbum em alta resolução obtida dinamicamente da API da Apple Music / iTunes.
- 🌙 **Cosmos & Astronomia**:
  - Fase da Lua exata calculada para o dia (ex: Cheia, Minguante, Nova, Crescente) com percentual de iluminação.
  - Signo do zodíaco e cálculo dinâmico de odômetro cósmico (distância percorrida ao redor do Sol).
- 📰 **Manchetes & Fatos Históricos**:
  - Edição especial estilo recorte de jornal antigo com os grandes acontecimentos do Brasil e do mundo no período.
- 🕹️ **Cultura Pop & Nostalgia**:
  - Filmes campeões de bilheteria nos cinemas, brinquedos marcantes e marcos culturais da época.
- 📱 **Visualizador de Stories 9:16 Completo**:
  - Navegação fluida por clique/toque (avanço, retrocesso, pausa com clique simples).
  - Suporte a atalhos de teclado (Espaço para pausar/despausar, Setas para navegar).
  - Barras de progresso com tempo individual por story.
- 📸 **Exportação de Imagens em Alta Resolução**:
  - Download individual de qualquer story em formato PNG 9:16 pronto para publicar no Instagram, WhatsApp ou TikTok.
  - Cartão de Resumo estilo Passe VIP / J-Card Mixtape.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade |
|---|---|
| **[Next.js](https://nextjs.org/) (v15+)** | Framework React com App Router e Server/Client Components |
| **[React 19](https://react.dev/)** | Biblioteca de interface de usuário reativa |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estática robusta para modelos históricos e astrofísicos |
| **[Tailwind CSS](https://tailwindcss.com/)** | Estilização utilitária moderna com extensões retrô personalizadas |
| **CSS Nativo & Keyframes** | Animações Memphis, rotação de vinil 3D, scanlines CRT e aberrações cromáticas |
| **[Lucide React](https://lucide.dev/)** | Ícones vetoriais elegantes e responsivos |
| **[html-to-image](https://github.com/bubkoo/html-to-image)** | Conversão e renderização de elementos DOM para exportação em imagem PNG |
| **Apple iTunes Search API** | Resolução em tempo real de capas de álbuns originais com cache local |

---

## 📂 Estrutura de Diretórios

```
universario/
├── data/
│   ├── charts/                # Dados históricos locais das paradas semanais
│   │   ├── billboard_*.json   # Base histórica da Billboard Hot 100
│   │   └── covers_cache.json  # Cache permanente de capas de álbuns
│   └── cache/                 # Cache temporário de consultas por data
├── src/
│   ├── app/
│   │   ├── api/birth-data/    # Endpoint que agrega astronomia, músicas e história
│   │   ├── globals.css        # Efeitos retrô (CRT, scanlines, memphis, vinil)
│   │   ├── layout.tsx         # Fontes Google (Press Start 2P, Outfit, Inter)
│   │   └── page.tsx           # Página principal e orquestrador dos Stories
│   ├── components/
│   │   ├── DateInputForm.tsx  # Entrada da data com tema retrô
│   │   ├── StoryViewer.tsx    # Container de reprodução de stories 9:16
│   │   ├── ExportControls.tsx # Controles de exportação e download
│   │   └── slides/            # 9 Slides interativos temáticos
│   │       ├── SlideIntro.tsx
│   │       ├── SlideMoonAstronomy.tsx
│   │       ├── SlideMusicCategory.tsx
│   │       ├── SlideNewsHistory.tsx
│   │       ├── SlidePopCulture.tsx
│   │       ├── SlideCosmicStats.tsx
│   │       └── SlideSummaryCard.tsx
│   ├── lib/
│   │   ├── astronomy.ts       # Algoritmos de fases lunares e posições cósmicas
│   │   ├── historical-resolver.ts # Unificador de dados por data
│   │   ├── music.ts           # Paradas de sucesso (Rádios BR, Vendas BR, Billboard)
│   │   ├── music-cover.ts     # Integração com iTunes API para capas de vinil
│   │   ├── news.ts            # Base de manchetes e acontecimentos
│   │   └── export-image.ts    # Utilitário de exportação para PNG
│   └── types/
│       └── universario.ts     # Definições de tipos TypeScript
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- Gerenciador de pacotes **npm**, **pnpm**, **yarn** ou **bun**

### 1. Clonar o repositório
```bash
git clone git@github.com:michelvvs/universario.git
cd universario
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o Universário rodando! 🚀

---

## 📜 Licença

Este projeto é de uso pessoal e aberto sob a licença [MIT](LICENSE).
