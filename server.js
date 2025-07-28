import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import rateLimit from 'express-rate-limit';
import CVAnalytics from './analytics.js';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup DOMPurify for server-side HTML sanitization
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Initialize Analytics
const analytics = new CVAnalytics();

// Simple PDF Cache
const pdfCache = new Map();

function generateCacheKey(templateName, htmlContent) {
  return crypto.createHash('md5').update(templateName + htmlContent).digest('hex');
}

// Valid template names
const VALID_TEMPLATES = ['modern', 'executive', 'creative', 'gradient', 'minimal', 'neon', 'retro'];

// Report cache
const reportCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Rate limiting configuration - ENHANCED for 2GB server protection
const pdfGenerationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // REDUCED from 30 to 10 - protects 2GB server from overload
  message: {
    error: 'För många PDF-förfrågningar. Vänligen vänta 15 minuter innan du försöker igen.',
    retryAfter: 15 * 60 // 15 minutes in seconds
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Additional options for better protection
  skipSuccessfulRequests: false, // Count all requests, not just failed ones
  keyGenerator: (req, res) => {
    // Use built-in IP detection that handles IPv6 properly
    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || 'no-ua';
    
    // Log for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Rate limit key - IP: ${ip}, UA: ${userAgent.substring(0, 50)}...`);
    }
    
    return `${ip}:${userAgent}`;
  }
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Analytics-specific rate limiters
const analyticsWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit analytics writes to prevent manipulation
  message: {
    error: 'Too many analytics write requests, please try again later.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const analyticsReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit analytics reads
  message: {
    error: 'Too many analytics read requests, please try again later.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Analytics authentication middleware
const analyticsAuth = (req, res, next) => {
  const apiKey = req.headers['x-analytics-api-key'];
  const validApiKey = process.env.ANALYTICS_API_KEY || 'dev-analytics-key-2025';
  
  // For development, allow access without key
  if (process.env.NODE_ENV !== 'production' && !process.env.ANALYTICS_API_KEY) {
    return next();
  }
  
  if (!apiKey || apiKey !== validApiKey) {
    // Log unauthorized access attempt
    console.warn(`Unauthorized analytics access attempt from IP: ${req.ip}`);
    return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
  }
  
  next();
};

// Analytics access logging
const logAnalyticsAccess = (action, endpoint) => {
  return (req, res, next) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    console.log(`[Analytics Access] ${timestamp} | ${action} | ${endpoint} | IP: ${ip} | UA: ${userAgent}`);
    next();
  };
};

const app = express();
const PORT = process.env.PORT || 3000;

// CRITICAL: Trust proxy to get real IP addresses behind Nginx/Cloudflare
// Without this, all requests would appear to come from Nginx (127.0.0.1)
app.set('trust proxy', true); // Trust first proxy (Nginx)
// For Cloudflare + Nginx, use: app.set('trust proxy', 2);

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(generalLimiter); // Apply general rate limiting to all requests

// Only serve static files if not in API-only mode
if (!process.env.API_ONLY) {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// PDF generation endpoint with specific rate limiting
app.post('/api/generate-pdf', pdfGenerationLimiter, async (req, res) => {
  console.log('PDF generation requested');
  let browser = null;
  
  try {
    const { htmlContent, filename = 'CV.pdf', templateName = 'unknown', sessionId = null } = req.body;
    
    if (!htmlContent) {
      console.error('No HTML content provided');
      return res.status(400).json({ error: 'HTML content is required' });
    }
    
    // Add size limit check (5MB max)
    const MAX_HTML_SIZE = 5 * 1024 * 1024; // 5MB
    if (htmlContent.length > MAX_HTML_SIZE) {
      console.error(`HTML content too large: ${htmlContent.length} bytes (max ${MAX_HTML_SIZE})`);
      return res.status(413).json({ 
        error: 'HTML content för stort. Max 5MB tillåten.',
        size: htmlContent.length,
        maxSize: MAX_HTML_SIZE
      });
    }
    
    console.log('HTML content received, length:', htmlContent.length);
    
    // Log rate limit info
    const remaining = req.rateLimit ? req.rateLimit.remaining : 'N/A';
    const resetTime = req.rateLimit ? new Date(req.rateLimit.resetTime).toLocaleString('sv-SE') : 'N/A';
    console.log(`Rate limit info - Remaining: ${remaining}, Reset: ${resetTime}`);
    
    // Sanitize HTML content to prevent XSS attacks
    const sanitizedHtml = purify.sanitize(htmlContent, {
      ALLOWED_TAGS: [
        'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
        'section', 'article', 'header', 'footer', 'main', 'aside',
        'a', 'img', 'table', 'tr', 'td', 'th', 'tbody', 'thead'
      ],
      ALLOWED_ATTR: ['class', 'id', 'style', 'href', 'src', 'alt', 'title'],
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button', 'iframe', 'frame', 'frameset'],
      FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit']
    });

    // Check cache first
    const cacheKey = generateCacheKey(templateName, sanitizedHtml);
    if (pdfCache.has(cacheKey)) {
      console.log('🧠 Using cached PDF');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');
      return res.end(pdfCache.get(cacheKey), 'binary');
    }
    
    console.log('HTML sanitized, original length:', htmlContent.length, 'sanitized length:', sanitizedHtml.length);

    // Launch Puppeteer with DigitalOcean-compatible options
    const isProduction = process.env.NODE_ENV === 'production';
    const puppeteerOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        // Step 7 Memory optimizations
        '--disable-extensions',
        '--disable-background-networking',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-component-extensions-with-background-pages',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--disable-renderer-backgrounding',
        '--metrics-recording-only',
        '--no-default-browser-check',
        '--no-pings',
        '--memory-pressure-off',
        '--max_old_space_size=512'  // Limit V8 memory
      ]
    };
    
    // Add more args for production/DigitalOcean
    if (isProduction) {
      puppeteerOptions.args.push(
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials'
      );
    }
    
    // Try to find Chromium executable
    const possiblePaths = [
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/app/.cache/puppeteer/chrome/linux-*/chrome-linux/chrome'
    ];
    
    if (isProduction) {
      const { execSync } = await import('child_process');
      for (const chromePath of possiblePaths) {
        try {
          if (chromePath.includes('*')) {
            // Skip glob patterns for now
            continue;
          }
          execSync(`test -f ${chromePath}`, { stdio: 'ignore' });
          console.log('Found Chromium at:', chromePath);
          puppeteerOptions.executablePath = chromePath;
          break;
        } catch (e) {
          // Path doesn't exist, try next
        }
      }
    }
    
    console.log('Launching Puppeteer with options:', JSON.stringify(puppeteerOptions, null, 2));
    try {
      browser = await puppeteer.launch(puppeteerOptions);
      console.log('Puppeteer launched successfully');
    } catch (launchError) {
      console.error('Failed to launch Puppeteer:', launchError);
      
      // Try one more time with minimal options
      if (isProduction) {
        console.log('Trying minimal Puppeteer configuration...');
        const minimalOptions = {
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        };
        browser = await puppeteer.launch(minimalOptions);
      } else {
        throw new Error(`Puppeteer launch failed: ${launchError.message}`);
      }
    }

    const page = await browser.newPage();
    
    // Step 7: Memory optimization - reduce viewport size
    await page.setViewport({ 
      width: 800,  // Reduced from 1200
      height: 1130, // A4 proportions
      deviceScaleFactor: 1 // Reduced from default 2
    });
    
    // Step 7: Disable unnecessary features
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      // Block images, fonts from external sources
      if (req.resourceType() === 'image' || req.resourceType() === 'font') {
        if (!req.url().includes('fonts.googleapis.com')) {
          req.abort();
          return;
        }
      }
      req.continue();
    });
    
    // Create complete HTML document with embedded CSS
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
        
        /* Print-specific styles */
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
        
        /* Prevent page breaks in important sections */
        .section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        /* Ensure proper spacing */
        h1, h2, h3, h4 {
          break-after: avoid;
          page-break-after: avoid;
        }
        
        /* List formatting */
        ul, ol {
          margin: 0.5rem 0;
        }
        
        li {
          margin-bottom: 0.25rem;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        ${sanitizedHtml}
      </div>
    </body>
    </html>`;

    // Set content and wait for it to load
    await page.setContent(fullHtml, { 
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Generate PDF with high-quality settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '15mm',
        right: '15mm', 
        bottom: '15mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: false
    });

    // Cache the generated PDF
    pdfCache.set(cacheKey, pdfBuffer);
    console.log('💾 PDF cached, key:', cacheKey);
    
    // Step 7: Close page immediately to free memory
    await page.close();

    // Track successful PDF generation
    await analytics.trackPDFGeneration(templateName, sessionId, true);

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    // Save to cache before sending (1 hour TTL)
    pdfCache.set(cacheKey, pdfBuffer);
    console.log('💾 PDF cached, key:', cacheKey);
    setTimeout(() => {
      pdfCache.delete(cacheKey);
      console.log('🗑️ PDF cache expired, key:', cacheKey);
    }, 3600000); // 1 hour
    
    // Send PDF as binary - CRITICAL: Must use res.end with binary encoding
    res.end(pdfBuffer, 'binary');

  } catch (error) {
    console.error('PDF generation error:', error);
    
    // Track failed PDF generation
    const { templateName = 'unknown', sessionId = null } = req.body;
    await analytics.trackPDFGeneration(templateName, sessionId, false);
    
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    });
  } finally {
    if (browser) {
      await browser.close();
    }
    
    // Step 7: Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
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
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    env: process.env.NODE_ENV,
    platform: process.platform,
    puppeteerPath: process.env.PUPPETEER_EXECUTABLE_PATH || 'default',
    chromiumFound: chromiumPaths
  });
});

// Analytics endpoints with security enhancements
app.post('/api/analytics/track-view', analyticsWriteLimiter, logAnalyticsAccess('WRITE', 'track-view'), async (req, res) => {
  try {
    const { templateName, sessionId } = req.body;
    
    // Validate template name
    if (!templateName || !VALID_TEMPLATES.includes(templateName)) {
      return res.status(400).json({ error: 'Invalid template name' });
    }
    
    // Validate and sanitize session ID
    if (sessionId) {
      // Session ID should be alphanumeric with hyphens, max 50 chars
      const sessionIdRegex = /^[a-zA-Z0-9-]{1,50}$/;
      if (!sessionIdRegex.test(sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID format' });
      }
    }
    
    await analytics.trackTemplateView(templateName, sessionId);
    res.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ error: 'Failed to track view' });
  }
});

app.get('/api/analytics/popularity', analyticsAuth, analyticsReadLimiter, logAnalyticsAccess('READ', 'popularity'), async (req, res) => {
  try {
    const ranking = await analytics.getPopularityRanking();
    res.json(ranking);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to get popularity data' });
  }
});

app.get('/api/analytics/report', analyticsAuth, analyticsReadLimiter, logAnalyticsAccess('READ', 'report'), async (req, res) => {
  try {
    // Check cache first
    const cacheKey = 'analytics-report';
    const cached = reportCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      res.json(cached.data);
      return;
    }
    
    // Generate new report
    const report = await analytics.generateReport();
    
    // Cache the report
    reportCache.set(cacheKey, {
      data: report,
      timestamp: Date.now()
    });
    
    res.json(report);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

app.get('/api/analytics/daily/:date?', analyticsAuth, analyticsReadLimiter, logAnalyticsAccess('READ', 'daily'), async (req, res) => {
  try {
    const { date } = req.params;
    
    // Validate date format to prevent path traversal
    if (date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      }
      
      // Additional validation: ensure date is not in the future
      const requestedDate = new Date(date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (requestedDate > today) {
        return res.status(400).json({ error: 'Date cannot be in the future' });
      }
    }
    
    const report = await analytics.getDailyReport(date);
    res.json(report);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to get daily report' });
  }
});

app.get('/api/analytics/trends', analyticsAuth, analyticsReadLimiter, logAnalyticsAccess('READ', 'trends'), async (req, res) => {
  try {
    // Check cache
    const cacheKey = 'analytics-trends';
    const cached = reportCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      res.json(cached.data);
      return;
    }
    
    const trends = await analytics.getWeeklyTrends();
    
    // Cache the trends
    reportCache.set(cacheKey, {
      data: trends,
      timestamp: Date.now()
    });
    
    res.json(trends);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to get trends' });
  }
});

// Serve React app for all other routes (only if not in API-only mode)
if (!process.env.API_ONLY) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});