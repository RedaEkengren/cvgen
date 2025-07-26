import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// PDF generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  console.log('PDF generation requested');
  let browser = null;
  
  try {
    const { htmlContent, filename = 'CV.pdf' } = req.body;
    
    if (!htmlContent) {
      console.error('No HTML content provided');
      return res.status(400).json({ error: 'HTML content is required' });
    }
    
    console.log('HTML content received, length:', htmlContent.length);

    // Launch Puppeteer with DigitalOcean-compatible options
    const isProduction = process.env.NODE_ENV === 'production';
    const puppeteerOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
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
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 1600 });
    
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
        ${htmlContent}
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

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    // Send PDF
    res.send(pdfBuffer);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error.message 
    });
  } finally {
    if (browser) {
      await browser.close();
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

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});