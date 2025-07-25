# CV Generator för IT-studenter

En modern, responsiv CV-generator speciellt designad för svenska IT-studenter. Helt gratis - inget konto behövs, allt körs i webbläsaren med localStorage för datalagring.

## ✨ Funktioner

- **Modern design**: Professionella mallar optimerade för IT-branschen
- **Live-förhandsgranskning**: Se ditt CV uppdateras i realtid
- **PDF-export**: Ladda ner som perfekt formaterad PDF
- **GitHub-integration**: Visa automatiskt dina senaste projekt
- **Responsiv**: Fungerar perfekt på mobil, tablet och desktop
- **Inget konto**: All data sparas lokalt i webbläsaren
- **Premium-funktioner**: Låses upp med aktiveringskod

## 🚀 Kom igång

### Utveckling

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev

# Bygga för produktion
npm run build

# Förhandsgranska build
npm run preview
```

### Deployment till DigitalOcean App Platform

1. Pusha koden till GitHub
2. Skapa ny app på DigitalOcean App Platform
3. Anslut GitHub-repository
4. Konfigurera:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Node Version**: 18+

## 🛠️ Teknisk stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Formulär**: React Hook Form
- **Ikoner**: Lucide React
- **PDF**: html2pdf.js
- **State**: React Context + useReducer

## 📱 Sektioner

### Gratis funktioner:
- ✅ Personlig information
- ✅ Utbildning
- ✅ Arbetslivserfarenhet
- ✅ Projekt (manuella + GitHub)
- ✅ Färdigheter
- ✅ GitHub-integration
- ✅ PDF-export
- ✅ Modern CV-mall

### Kommande funktioner:
- 🔮 Extra CV-mallar
- 🔮 Färgteman och anpassning
- 🔮 Avancerade layoutalternativ
- 🔮 Import från LinkedIn

<!-- Premium system temporarily disabled - ready for future activation
## 🔐 Premium-aktivering

Aktiveringskoder köps via Gumroad. Giltiga koder:
- `PREMIUM2024`
- `GUMROAD_PREMIUM` 
- `STUDENT_PRO`
-->

## 📂 Projektstruktur

```
src/
├── components/          # Återanvändbara komponenter
│   ├── Header.jsx
│   └── PremiumModal.jsx
├── pages/              # Sidor/views
│   ├── Home.jsx
│   ├── CVBuilder.jsx
│   └── Preview.jsx
├── context/            # State management
│   └── CVContext.jsx
├── utils/              # Utility funktioner
│   └── storage.js
└── index.css          # Global styles
```

## 🎨 Design-principer

- **Minimalistisk**: Rent och professionellt utseende
- **Användarvänlig**: Intuitiv navigation och formulär
- **Mobilvänlig**: Responsiv design för alla enheter
- **Snabb**: Optimerad prestanda med Vite
- **Tillgänglig**: Semantisk HTML och ARIA-labels

## 🚀 Framtida funktioner

- [ ] Fler CV-mallar
- [ ] Import från LinkedIn
- [ ] Språkstöd (engelska)
- [ ] Mörkt tema
- [ ] Export till andra format
- [ ] CV-analys och tips

## 📝 Licens

MIT License - fri att använda för personliga och kommersiella projekt.

---

Byggt med ❤️ för svenska IT-studenter