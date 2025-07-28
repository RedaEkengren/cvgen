import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Bull from 'bull';
import CVAnalytics from './analytics.js';
import DOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const analytics = new CVAnalytics();

// Initialize DOMPurify with JSDOM for server-side sanitization
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Report cache
const reportCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// =========================
// STEP 1: PDF Queue System
// =========================
const pdfQueue = new Bull('pdf generation', {
  redis: { 
    port: 6379, 
    host: '127.0.0.1' 
  }
});

// Process max 2 PDFs at the same time
pdfQueue.process(2, async (job) => {
  const { htmlContent, templateName, sessionId } = job.data;
  try {
    const pdfBuffer = await generatePDF(htmlContent);
    await analytics.trackPDFGeneration(templateName, sessionId, true);
    return pdfBuffer;
  } catch (error) {
    await analytics.trackPDFGeneration(templateName, sessionId, false);
    throw error;
  }
});

// =========================
// STEP 2: Browser Pool
// =========================
const browserPool = [];
const MAX_BROWSERS = 2;

async function getBrowser() {
  if (browserPool.length > 0) {
    return browserPool.pop();
  }
  
  const puppeteerOptions = {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-web-security',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  };

  // Production path
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    puppeteerOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  return await puppeteer.launch(puppeteerOptions);
}

async function releaseBrowser(browser) {
  if (browserPool.length < MAX_BROWSERS && browser && browser.isConnected()) {
    browserPool.push(browser);
  } else if (browser) {
    await browser.close();
  }
}

// =========================
// STEP 4: PDF Caching
// =========================
const pdfCache = new Map();

function generateCacheKey(templateName, cvData) {
  const hash = crypto
    .createHash('md5')
    .update(JSON.stringify({ templateName, cvData }))
    .digest('hex');
  return `pdf_${templateName}_${hash}`;
}

// =========================
// Core PDF Generation Function
// =========================
async function generatePDF(htmlContent) {
  let browser = null;
  let page = null;
  
  try {
    browser = await getBrowser();
    page = await browser.newPage();
    
    await page.setViewport({ 
      width: 800,
      height: 1130,
      deviceScaleFactor: 1
    });
    
    // Disable unnecessary features
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image' || req.resourceType() === 'font') {
        if (!req.url().includes('fonts.googleapis.com')) {
          req.abort();
          return;
        }
      }
      req.continue();
    });
    
    // Create complete HTML with enhanced page break CSS
    const fullHtml = `
    <!DOCTYPE html>
    <html lang="sv">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CV PDF Export</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .cv-container {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          padding: 20mm;
        }
        
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          
          .cv-container {
            max-width: none;
            margin: 0;
            padding: 15mm;
            box-shadow: none;
          }
        }
        
        /* Enhanced page break control */
        .section {
          break-inside: avoid;
          page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin-bottom: 1.5rem;
        }
        
        .experience-item,
        .education-item,
        .project-item,
        .skills-section {
          break-inside: avoid;
          page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin-bottom: 1rem;
        }
        
        h1, h2, h3, h4, h5, h6 {
          break-after: avoid;
          page-break-after: avoid;
          margin-bottom: 0.5rem;
        }
        
        p {
          orphans: 3;
          widows: 3;
        }
        
        ul, ol {
          margin: 0.5rem 0;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        li {
          margin-bottom: 0.25rem;
          break-inside: avoid;
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        ${htmlContent}
      </div>
    </body>
    </html>`;

    await page.setContent(fullHtml, { 
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm', 
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      scale: 0.95
    });
    
    await page.close();
    return pdfBuffer;
    
  } finally {
    if (page && !page.isClosed()) {
      await page.close();
    }
    if (browser) {
      await releaseBrowser(browser);
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  }
}

// Enhanced rate limiting
const pdfGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    error: 'För många PDF-förfrågningar. Vänligen vänta 15 minuter innan du försöker igen.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'unknown';
    return `${ip}_${userAgent}`;
  }
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('trust proxy', true);

// =========================
// STEP 3: Queue-based PDF endpoint
// =========================
app.post('/api/generate-pdf', pdfGenerationLimiter, async (req, res) => {
  console.log('PDF generation requested');
  
  try {
    const { htmlContent, templateName = 'unknown', sessionId = null } = req.body;
    
    if (!htmlContent || typeof htmlContent !== 'string') {
      return res.status(400).json({ error: 'Invalid HTML content' });
    }

    // Sanitize HTML
    const sanitizedHtml = purify.sanitize(htmlContent, {
      ALLOWED_TAGS: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'br', 'strong', 'em', 'b', 'i', 'u', 's', 'section', 'article', 'header', 'footer', 'main', 'aside', 'a', 'img', 'table', 'tr', 'td', 'th', 'tbody', 'thead'],
      ALLOWED_ATTR: ['class', 'id', 'style', 'href', 'src', 'alt', 'title'],
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button', 'iframe', 'frame', 'frameset'],
      FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit']
    });

    // Check cache first (Step 4)
    const cacheKey = generateCacheKey(templateName, sanitizedHtml);
    const cached = pdfCache.get(cacheKey);
    
    if (cached) {
      console.log('Returning cached PDF');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');
      res.setHeader('X-PDF-Cached', 'true');
      return res.end(cached, 'binary');
    }

    // Add to queue (Step 1)
    const job = await pdfQueue.add({
      htmlContent: sanitizedHtml,
      templateName,
      sessionId
    });

    // Return job ID immediately for progress tracking
    res.json({ 
      jobId: job.id,
      message: 'PDF generation started',
      estimatedTime: 5000 // 5 seconds estimate
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    });
  }
});

// =========================
// STEP 3: Job status endpoint
// =========================
app.get('/api/pdf-status/:jobId', async (req, res) => {
  try {
    const job = await pdfQueue.getJob(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress();
    
    if (state === 'completed') {
      const pdfBuffer = job.returnvalue;
      
      // Cache the result (Step 4)
      const { templateName, htmlContent } = job.data;
      const cacheKey = generateCacheKey(templateName, htmlContent);
      pdfCache.set(cacheKey, pdfBuffer);
      setTimeout(() => pdfCache.delete(cacheKey), 3600000); // 1 hour TTL
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');
      res.end(pdfBuffer, 'binary');
    } else {
      res.json({
        state,
        progress,
        estimatedTime: state === 'active' ? 3000 : 5000
      });
    }
  } catch (error) {
    console.error('Job status error:', error);
    res.status(500).json({ error: 'Failed to get job status' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const { execSync } = await import('child_process');
  const chromiumPaths = [];
  
  const testPaths = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable'
  ];
  
  for (const path of testPaths) {
    try {
      execSync(`test -f ${path}`, { stdio: 'ignore' });
      chromiumPaths.push(path);
    } catch (e) {
      // Path doesn't exist
    }
  }
  
  // Check queue health
  const queueHealth = await pdfQueue.getJobCounts();
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: process.env.NODE_ENV,
    platform: process.platform,
    puppeteerPath: process.env.PUPPETEER_EXECUTABLE_PATH || 'default',
    chromiumFound: chromiumPaths,
    queue: queueHealth,
    browserPool: {
      active: MAX_BROWSERS - browserPool.length,
      available: browserPool.length
    }
  });
});

// All other analytics endpoints remain the same...
// [Copy the rest of the analytics endpoints from the original server.js]

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Cleanup on exit
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing browser pool...');
  for (const browser of browserPool) {
    await browser.close();
  }
  await pdfQueue.close();
  process.exit(0);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log('PDF Queue System: Active');
  console.log('Browser Pool: Active');
  console.log('PDF Caching: Active');
});