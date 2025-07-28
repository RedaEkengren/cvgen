// Browser Pool Implementation for server.js
// Add this at the top of server.js after imports

const browserPool = [];
const MAX_BROWSERS = 2;

async function getBrowser() {
  if (browserPool.length > 0) {
    console.log('Reusing browser from pool');
    return browserPool.pop();
  }
  
  console.log('Creating new browser instance');
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

  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    puppeteerOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  return await puppeteer.launch(puppeteerOptions);
}

async function releaseBrowser(browser) {
  if (browserPool.length < MAX_BROWSERS && browser && browser.isConnected()) {
    console.log('Returning browser to pool');
    browserPool.push(browser);
  } else if (browser) {
    console.log('Closing browser (pool full)');
    await browser.close();
  }
}

// Update the PDF generation endpoint to use getBrowser() instead of puppeteer.launch()
// and releaseBrowser() instead of browser.close()

// Add cleanup on exit:
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing browser pool...');
  for (const browser of browserPool) {
    await browser.close();
  }
  process.exit(0);
});