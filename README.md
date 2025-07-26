# CV Generator för IT-studenter 🎓

En modern, professionell CV-generator speciellt designad för svenska IT-studenter. Skapa snygga, rekryterarvänliga CV:n med flera mallar att välja mellan. Helt gratis - inget konto behövs!

## ✨ Funktioner

- **7 Professionella CV-mallar**: Modern, Executive, Creative, Gradient, Minimal, Neon, Retro
- **Live-förhandsgranskning**: Se ditt CV uppdateras i realtid medan du fyller i
- **Högkvalitativ PDF-export**: Puppeteer-driven backend för perfekta PDF:er
- **GitHub-integration**: Importera automatiskt dina senaste projekt från GitHub
- **Responsiv design**: Fungerar perfekt på mobil, tablet och desktop
- **Ingen registrering**: All data sparas lokalt i din webbläsare
- **Svensk anpassning**: Optimerad för svenska IT-studenters behov

## 🚀 Kom igång

### Utveckling

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver (frontend)
npm run dev

# Starta produktionsserver (frontend + backend)
npm start

# Bygga för produktion
npm run build

# Kör endast backend-server
npm run dev:server
```

### Deployment till DigitalOcean App Platform

1. Pusha koden till GitHub
2. Skapa ny app på DigitalOcean App Platform
3. Anslut GitHub-repository
4. Konfigurera Web Service:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
   - **Node Version**: 18+
   - **Port**: 3000

## 🛠️ Teknisk stack

- **Frontend**: React 19 + Vite
- **Backend**: Express.js + Puppeteer
- **Styling**: Tailwind CSS v4
- **Routing**: React Router
- **Formulär**: React Hook Form
- **Ikoner**: Lucide React
- **PDF-generering**: Puppeteer (server-side)
- **State Management**: React Context + useReducer
- **Data Storage**: localStorage

## 📱 CV-sektioner

### Tillgängliga sektioner:
- ✅ **Personlig information**: Namn, kontaktuppgifter, sammanfattning
- ✅ **Utbildning**: Skola, program, datum, beskrivning
- ✅ **Arbetslivserfarenhet**: Företag, position, datum, arbetsuppgifter
- ✅ **Projekt**: Manuella projekt + automatisk GitHub-import
- ✅ **Färdigheter**: Kategoriserade (Programmeringsspråk, Ramverk, Verktyg)

## 🎨 CV-mallar

1. **Modern** - Lila accenter med tvåkolumns layout
2. **Executive** - Elegant centrerad design för professionellt intryck
3. **Creative** - Färgglad design med ikoner och lekfulla element
4. **Gradient** - Modern design med lila/rosa gradienter
5. **Minimal** - Ultra-minimalistisk för clean presentation
6. **Neon** - Cyberpunk-inspirerad med neon-färger
7. **Retro** - 80-tals gaming-inspirerad design


## 📂 Projektstruktur

```
├── server.js               # Express server med Puppeteer PDF-generering
├── src/
│   ├── components/         # Återanvändbara komponenter
│   │   ├── Header.jsx
│   │   └── PremiumModal.jsx
│   ├── pages/              # Sidor/views
│   │   ├── Home.jsx        # Landningssida
│   │   ├── CVBuilder.jsx   # Formulär för CV-data
│   │   ├── Preview.jsx     # CV-förhandsgranskning och export
│   │   └── templates/      # CV-mallar
│   │       ├── Creative.jsx
│   │       ├── Gradient.jsx
│   │       ├── Minimal.jsx
│   │       ├── ModernTemplate.jsx
│   │       ├── Neon.jsx
│   │       ├── Retro.jsx
│   │       └── SleekTemplate.jsx
│   ├── context/            # State management
│   │   └── CVContext.jsx
│   ├── utils/              # Utility funktioner
│   │   └── storage.js
│   └── index.css          # Global styles
└── dist/                  # Byggd applikation
```

## 🎨 Design-principer

- **Minimalistisk**: Rent och professionellt utseende
- **Användarvänlig**: Intuitiv navigation och formulär
- **Mobilvänlig**: Responsiv design för alla enheter
- **Snabb**: Optimerad prestanda med Vite
- **Tillgänglig**: Semantisk HTML och ARIA-labels

## 🚀 Systemarkitektur

### Hybrid Frontend + Backend
- **Frontend**: React SPA för användargränssnitt
- **Backend**: Express + Puppeteer för PDF-generering
- **Data**: localStorage (ingen databas behövs)
- **PDF**: Server-side rendering med Puppeteer för hög kvalitet

### API Endpoints
- `GET /` - Serverar React-applikationen
- `POST /api/generate-pdf` - Genererar PDF från HTML
- `GET /api/health` - Health check för monitoring

## 🔮 Framtida funktioner

- [ ] Import från LinkedIn
- [ ] Språkstöd (engelska)
- [ ] Mörkt tema
- [ ] Export till Word/DOCX
- [ ] CV-analys och tips med AI
- [ ] Delningsfunktion med unik länk

## 🤝 Bidrag

Bidrag är välkomna! Skapa gärna issues eller pull requests på GitHub.

## 📝 Licens

MIT License - fri att använda för personliga och kommersiella projekt.

## 🙏 Tack till

- React-teamet för ett fantastiskt ramverk
- Tailwind CSS för smidig styling
- Puppeteer för högkvalitativ PDF-export
- Alla open source-projekt som gör detta möjligt

---

Byggt med ❤️ för svenska IT-studenter av utvecklare som förstår era behov.