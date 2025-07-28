// PDF Cache Implementation for server.js
// Add this after imports

const crypto = require('crypto');
const pdfCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function generateCacheKey(templateName, htmlContent) {
  const hash = crypto
    .createHash('md5')
    .update(JSON.stringify({ templateName, htmlContent }))
    .digest('hex');
  return `pdf_${templateName}_${hash}`;
}

// In the PDF generation endpoint, add this before generating:
/*
// Check cache first
const cacheKey = generateCacheKey(templateName, sanitizedHtml);
const cached = pdfCache.get(cacheKey);

if (cached) {
  console.log('Returning cached PDF');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('X-PDF-Cached', 'true');
  return res.end(cached, 'binary');
}
*/

// After generating PDF, before sending response:
/*
// Cache the result
pdfCache.set(cacheKey, pdfBuffer);
setTimeout(() => pdfCache.delete(cacheKey), CACHE_TTL);
*/

// Optional: Add cache stats to health endpoint
/*
pdfCacheStats: {
  size: pdfCache.size,
  keys: Array.from(pdfCache.keys())
}
*/