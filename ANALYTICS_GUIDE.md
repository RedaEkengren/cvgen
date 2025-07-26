# 📊 CV Generator Analytics System

## 🎯 Overview

Komplett analytics-system som trackar template-popularitet, användarbeteende och conversion metrics för CV Generator. Perfekt för att förstå vilka mallar som är mest populära och optimera användarupplevelsen.

## 🔍 Vad Som Trackas

### Template Metrics
- **Views**: Antal gånger en mall visas
- **Downloads**: Antal PDF-genereringar per mall
- **Conversion Rate**: Downloads/Views ratio
- **Popularity Score**: Viktad poäng (Downloads × 3 + Views)
- **Last Used**: Senaste aktivitet per mall

### User Behavior
- **Session Tracking**: Unika sessioner med aktivitet
- **Template Journey**: Vilka mallar användare tittar på
- **PDF Generation Success/Failure**: Error tracking

### Time-based Analytics
- **Daily Reports**: Daglig aktivitet per mall
- **Weekly Trends**: 7-dagars trendanalys
- **Real-time Updates**: Live tracking av aktivitet

## 🏗️ System Architecture

### Backend Components

#### 1. Analytics Class (`analytics.js`)
```javascript
import CVAnalytics from './analytics.js'
const analytics = new CVAnalytics()

// Track template view
await analytics.trackTemplateView('modern', sessionId)

// Track PDF generation
await analytics.trackPDFGeneration('modern', sessionId, success)

// Get popularity ranking
const ranking = await analytics.getPopularityRanking()
```

#### 2. API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analytics/track-view` | POST | Track template view |
| `/api/analytics/popularity` | GET | Get popularity ranking |
| `/api/analytics/report` | GET | Full analytics report |
| `/api/analytics/daily/:date?` | GET | Daily activity report |
| `/api/analytics/trends` | GET | Weekly trends data |

#### 3. Data Storage
- **analytics-data.json**: Main analytics database
- **daily-analytics.json**: Day-by-day breakdown
- File-based storage (can easily migrate to database)

### Frontend Components

#### 1. Template Tracking (`Preview.jsx`)
```javascript
// Automatic view tracking
useEffect(() => {
  trackTemplateView(selectedTemplate)
}, [selectedTemplate])

// PDF generation tracking
const response = await fetch('/api/generate-pdf', {
  body: JSON.stringify({
    htmlContent,
    templateName: selectedTemplate,
    sessionId
  })
})
```

#### 2. Analytics Dashboard (`AnalyticsDashboard.jsx`)
- Real-time popularity ranking
- Conversion rate analysis
- Weekly trend visualization
- Insights and recommendations

## 📈 Key Metrics Explained

### Popularity Score
**Formula**: `(Downloads × 3) + Views`
- Downloads weighted 3x more than views
- Reflects actual usage vs browsing
- Used for ranking templates

### Conversion Rate
**Formula**: `(Downloads / Views) × 100`
- Percentage of views that result in PDF generation
- Indicates template appeal and usability
- Benchmark: >30% is excellent

### Template Insights
- **Most Popular**: Highest popularity score
- **Best Conversion**: Highest conversion rate
- **Trending**: Recent activity increases
- **Underperforming**: Low engagement templates

## 🎨 Template Performance Analysis

### Current Template Mapping
```javascript
const templates = {
  'sleek': 'Executive',      // Previous default
  'modern': 'Modern',        // New primary template
  'creative': 'Creative',    // Colorful design
  'gradient': 'Gradient',    // Modern gradients
  'minimal': 'Minimal',      // Ultra-clean
  'neon': 'Neon',           // Cyberpunk style
  'retro': 'Retro',         // 80s gaming style
  'bold': 'Bold'            // Strong typography
}
```

### Performance Indicators
- **High Performing**: >50 popularity score
- **Average**: 20-50 popularity score  
- **Needs Attention**: <20 popularity score

## 🔧 Implementation Guide

### 1. Server Setup

**Install Dependencies:**
```bash
# Already included in package.json
npm install  # analytics.js uses built-in fs/promises
```

**Start Server with Analytics:**
```bash
npm run dev:server  # Analytics automatically initialized
```

### 2. Enable Frontend Tracking

**Environment Variables:**
```bash
# For development
VITE_API_URL=http://localhost:3000

# For production
VITE_API_URL=http://your-domain.com
```

**Automatic Tracking:**
- Template views tracked automatically in Preview component
- PDF generations tracked in exportToPDF function
- Session IDs generated per user visit

### 3. Access Analytics Dashboard

**Navigation:**
- Go to `/analytics` route in the application
- New "Analytics" tab in header navigation
- Real-time data updates

## 📊 Analytics Dashboard Features

### Overview Cards
- **Total Views**: All-time template views
- **Total Downloads**: All-time PDF generations
- **Conversion Rate**: Overall success rate
- **Top Template**: Most popular template

### Popularity Ranking
- Ranked list of all templates
- Visual progress bars
- Conversion rates per template
- Popularity scores

### Weekly Trends
- 7-day activity visualization
- Views vs Downloads comparison
- Daily breakdown with trends

### Insights & Recommendations
- Performance leaders identification
- Automated recommendations
- Template optimization suggestions

## 📈 Business Intelligence

### Key Questions Answered

1. **Which templates should we promote?**
   - Look at popularity ranking
   - Focus on high-conversion templates

2. **Which templates need improvement?**
   - Low conversion rates (<20%)
   - High views but low downloads

3. **What time patterns exist?**
   - Weekly trends show peak usage
   - Daily reports identify active periods

4. **How effective are new templates?**
   - Track adoption rates
   - Compare with established templates

### Optimization Strategies

**For High-Performing Templates:**
- Feature prominently in UI
- Create similar design variations
- Use as defaults for new users

**For Underperforming Templates:**
- Analyze UX issues
- Improve preview quality
- Consider design updates or removal

**For Marketing:**
- Highlight popular templates in demos
- Use conversion rates in feature promotion
- Create case studies from success metrics

## 🔒 Privacy & Data Handling

### Data Collected
- **Anonymous Session IDs**: No personal information
- **Template Interactions**: Views and downloads only
- **Error Tracking**: Technical issues for improvement

### Data Retention
- **Analytics Data**: Stored indefinitely (small file sizes)
- **Daily Data**: 30-day rolling window
- **Session Data**: No persistent user identification

### GDPR Compliance
- No personal data collection
- Anonymous usage analytics only
- Can be disabled per user request

## 🚀 Advanced Features (Future)

### Real-time Analytics
```javascript
// WebSocket integration for live updates
const ws = new WebSocket('ws://localhost:3000/analytics')
ws.onmessage = (event) => {
  const { type, data } = JSON.parse(event.data)
  if (type === 'template_view') {
    updateRealTimeStats(data)
  }
}
```

### A/B Testing Framework
```javascript
// Test different template orders
const testGroup = sessionId % 2 === 0 ? 'group_a' : 'group_b'
const templateOrder = getTemplateOrder(testGroup)
```

### Export Analytics
```javascript
// CSV/Excel export functionality
app.get('/api/analytics/export', (req, res) => {
  const data = generateCSVReport()
  res.setHeader('Content-Type', 'text/csv')
  res.attachment('analytics-report.csv')
  res.send(data)
})
```

## 🔍 Troubleshooting

### Common Issues

**Analytics not tracking:**
```bash
# Check server logs
pm2 logs cv-backend

# Verify analytics files exist
ls -la analytics-data.json daily-analytics.json

# Test API endpoint
curl http://localhost:3000/api/analytics/popularity
```

**Dashboard not loading:**
```bash
# Check frontend connection
curl http://localhost:3000/api/analytics/report

# Verify route is configured
grep -r "analytics" src/App.jsx
```

**Data inconsistencies:**
```javascript
// Reset analytics (development only)
rm analytics-data.json daily-analytics.json
# Restart server to reinitialize
```

## 📋 Monitoring & Maintenance

### Daily Checks
- Verify analytics data is being written
- Check for error spikes
- Monitor popular template changes

### Weekly Reviews
- Analyze trend reports
- Review template performance
- Update recommendations

### Monthly Analysis
- Generate comprehensive reports
- Identify optimization opportunities
- Plan template roadmap updates

---

## 🎉 Success Metrics

**System Performance:**
- ✅ Real-time tracking implemented
- ✅ Zero-latency user experience
- ✅ Comprehensive dashboard available
- ✅ Privacy-compliant data collection

**Business Value:**
- 📊 Data-driven template decisions
- 🎯 Improved user experience optimization
- 📈 Conversion rate optimization
- 🔍 User behavior insights

**Ready to track and optimize CV template performance! 🚀**