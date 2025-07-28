# 🚀 CV Generator Performance Optimization Roadmap

## 📊 Current Status
- **Server:** DigitalOcean Droplet (2GB RAM, 1 vCPU)
- **Current Limit:** ~5-10 samtidiga PDF-genereringar innan server stress
- **Decision:** Behåll Puppeteer för högkvalitativa PDFs

## 🎯 8-Step Implementation Plan

### Step 1: PDF Queue System (Priority: HIGH)
**Problem:** Många samtidiga PDF-requests kan krascha servern  
**Solution:** Bull queue + Redis för kontrollerad processing

```bash
npm install bull redis
```

```javascript
// server.js
const Queue = require('bull');
const pdfQueue = new Queue('pdf generation', {
  redis: { port: 6379, host: '127.0.0.1' }
});

// Max 2 samtidiga PDF-genereringar
pdfQueue.process(2, async (job) => {
  const { htmlContent, templateName } = job.data;
  return await generatePDF(htmlContent);
});

// API endpoint update
app.post('/api/generate-pdf', async (req, res) => {
  const job = await pdfQueue.add({
    htmlContent: req.body.htmlContent,
    templateName: req.body.templateName
  });
  
  res.json({ jobId: job.id });
});
```

### Step 2: Browser Pool (Priority: HIGH)
**Problem:** Varje PDF startar ny Puppeteer-instans (dyrt!)  
**Solution:** Återanvänd browser-instanser

```javascript
const browserPool = [];
const MAX_BROWSERS = 2;

async function getBrowser() {
  if (browserPool.length > 0) {
    return browserPool.pop();
  }
  
  return await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
}

async function releaseBrowser(browser) {
  if (browserPool.length < MAX_BROWSERS) {
    browserPool.push(browser);
  } else {
    await browser.close();
  }
}
```

### Step 3: Loading State & Progress (Priority: MEDIUM)
**Problem:** Användare vet inte att PDF genereras  
**Solution:** Real-time progress updates

```javascript
// Frontend
const GeneratePDFButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    // Start job
    const { jobId } = await startPDFGeneration();
    
    // Poll for progress
    const interval = setInterval(async () => {
      const job = await checkJobStatus(jobId);
      setProgress(job.progress);
      
      if (job.finished) {
        clearInterval(interval);
        downloadPDF(job.result);
        setIsGenerating(false);
      }
    }, 1000);
  };
  
  return (
    <button disabled={isGenerating}>
      {isGenerating ? `Genererar PDF... ${progress}%` : 'Ladda ner PDF'}
    </button>
  );
};
```

### Step 4: PDF Caching (Priority: MEDIUM)
**Problem:** Samma CV genereras flera gånger  
**Solution:** Cache baserat på innehåll

```javascript
const crypto = require('crypto');
const pdfCache = new Map();

function generateCacheKey(templateName, cvData) {
  const hash = crypto
    .createHash('md5')
    .update(JSON.stringify({ templateName, cvData }))
    .digest('hex');
  return `pdf_${templateName}_${hash}`;
}

// Check cache before generating
const cacheKey = generateCacheKey(templateName, cvData);
if (pdfCache.has(cacheKey)) {
  return pdfCache.get(cacheKey);
}

// Store in cache (1 hour TTL)
pdfCache.set(cacheKey, pdfBuffer);
setTimeout(() => pdfCache.delete(cacheKey), 3600000);
```

### Step 5: PM2 Cluster Mode (Priority: LOW)
**Problem:** Single process kan inte utnyttja all CPU  
**Solution:** PM2 cluster mode med memory limits

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'cv-backend',
    script: './server.js',
    instances: 2, // 2 workers för 2GB RAM
    exec_mode: 'cluster',
    max_memory_restart: '500M', // Restart vid 500MB
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log'
  }]
};
```

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 6: Enhanced Rate Limiting (Priority: HIGH)
**Problem:** För generös rate limit kan överbelasta servern  
**Solution:** Striktare limits för PDF endpoint

```javascript
const rateLimit = require('express-rate-limit');

// Specifik limiter för PDF
const pdfLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuter
  max: 10, // Max 10 PDF per IP (ned från 30)
  message: {
    error: 'För många PDF-förfrågningar. Vänta 15 minuter.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/generate-pdf', pdfLimiter, async (req, res) => {
  // PDF generation logic
});
```

## 📈 Expected Results

### Med 2GB RAM (MVP):
- ✅ Stabil med upp till 50 samtidiga användare
- ✅ 2 samtidiga PDF-genereringar
- ✅ ~5-10 sekunder per PDF
- ✅ Ingen server-krasch vid peak usage

### När du bör uppgradera till 4GB:
- 📊 >100 dagliga användare
- 📊 >500 PDF-genereringar per dag
- 📊 Vill ha 4 samtidiga PDF-genereringar
- 📊 Vill minska väntetid till <3 sekunder

### Step 7: Code Optimization (Priority: HIGH)
**Problem:** Applikationen kan vara ineffektiv och slösa resurser  
**Solution:** Optimera kod för bättre performance

```javascript
// 1. Optimera HTML som skickas till Puppeteer
const optimizeHTMLForPDF = (html) => {
  // Ta bort onödiga scripts och tracking
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Inline critical CSS för snabbare rendering
  html = html.replace('</head>', `
    <style>
      /* Critical CSS här */
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
    </style>
    </head>
  `);
  
  return html;
};

// 2. Minska Puppeteer memory footprint
const pdfOptions = {
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: false,
  margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
  // Optimera för mindre memory usage
  deviceScaleFactor: 1, // Inte 2 som default
  scale: 0.9 // Lite mindre för snabbare rendering
};

// 3. Cleanup efter varje PDF
page.on('response', response => {
  // Clear unused resources
  if (response.status() === 404) {
    console.warn('Resource not found:', response.url());
  }
});

// 4. Aggressive garbage collection
if (global.gc) {
  global.gc();
}
```

### Step 8: Stress Testing & Capacity Planning (Priority: HIGH)
**Problem:** Vi vet inte exakt vad servern klarar  
**Solution:** Systematisk stress testing

```bash
# Install stress testing tools
npm install -D artillery autocannon

# Create stress test scenario
cat > stress-test.yml << EOF
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 1
      name: "Warm up"
    - duration: 120
      arrivalRate: 3
      name: "Test 3 concurrent PDFs"
    - duration: 120
      arrivalRate: 5
      name: "Push to limit"
scenarios:
  - name: "Generate PDF"
    flow:
      - post:
          url: "/api/generate-pdf"
          json:
            templateName: "modern"
            htmlContent: "{{ $randomString() }}"
EOF

# Run stress test
artillery run stress-test.yml
```

```javascript
// Monitor system during stress test
const monitorSystem = () => {
  const usage = process.memoryUsage();
  console.log({
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`,
    cpu: process.cpuUsage()
  });
};

// Log every 5 seconds during stress test
setInterval(monitorSystem, 5000);
```

**Stress Test Metrics att övervaka:**
- 🔍 Memory usage per PDF generation
- 🔍 CPU spikes during concurrent requests  
- 🔍 Response time degradation
- 🔍 Error rate vid olika load levels
- 🔍 Optimal concurrent PDF limit

**Förväntade resultat:**
- Med optimeringar: Kanske 3 samtidiga PDFs istället för 2
- Memory per PDF: ~150-200MB (ned från 300MB)
- CPU per PDF: 50-70% (ned från 100%)

## 🛠️ Implementation Order

1. **Week 1:** Step 7 (Code Optimization) + Step 8 (Stress Testing)
2. **Week 2:** Step 1 (Queue) + Step 6 (Rate Limit)
3. **Week 3:** Step 2 (Browser Pool)
4. **Week 4:** Step 3 (Loading State)
5. **Week 5:** Step 4 (Caching) + Step 5 (PM2)

## 💰 Cost Analysis

### Current (2GB Droplet):
- **Kostnad:** $12/månad
- **Kapacitet:** 50-100 dagliga användare
- **Performance:** Acceptabel för MVP

### Future (4GB Droplet):
- **Kostnad:** $24/månad
- **Kapacitet:** 500-1000 dagliga användare
- **Performance:** Snabb och responsiv

### Scale (Load Balanced):
- **Kostnad:** $48+/månad
- **Kapacitet:** Obegränsad
- **Performance:** Enterprise-grade

## ✅ Conclusion

**För MVP:** 2GB RAM + dessa 6 optimeringar = Perfekt start!

Implementera i ordning och du kommer ha ett robust system som klarar hundratals användare utan problem. När du växer, är det enkelt att uppgradera.