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
  let browser = null;
  
  try {
    const { htmlContent, filename = 'CV.pdf' } = req.body;
    
    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Launch Puppeteer with DigitalOcean-compatible options
    const puppeteerOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials'
      ]
    };
    
    // Use system Chromium if available (Docker/DigitalOcean)
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      puppeteerOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }
    
    browser = await puppeteer.launch(puppeteerOptions);

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
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});