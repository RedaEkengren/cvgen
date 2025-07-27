// Test Analytics System - Generate sample data
import CVAnalytics from './analytics.js';

const analytics = new CVAnalytics();

async function generateTestData() {
  console.log('🧪 Starting Analytics Test...\n');

  // Define templates with realistic usage patterns
  const templatePatterns = {
    modern: { viewWeight: 30, conversionRate: 0.45 },      // Most popular
    executive: { viewWeight: 25, conversionRate: 0.40 },   // Second most popular
    creative: { viewWeight: 15, conversionRate: 0.35 },    // Creative niche
    gradient: { viewWeight: 10, conversionRate: 0.30 },    // Trendy
    minimal: { viewWeight: 8, conversionRate: 0.50 },      // High conversion
    bold: { viewWeight: 5, conversionRate: 0.25 },         // Lower performing
    neon: { viewWeight: 4, conversionRate: 0.20 },         // Niche appeal
    retro: { viewWeight: 3, conversionRate: 0.15 }         // Least popular
  };

  // Generate sessions
  const sessions = [];
  for (let i = 0; i < 20; i++) {
    sessions.push(`test_session_${Date.now()}_${i}`);
  }

  console.log('📊 Generating template views and downloads...\n');

  // Generate views and downloads based on patterns
  for (const [template, pattern] of Object.entries(templatePatterns)) {
    const viewCount = Math.floor(pattern.viewWeight * (2 + Math.random()));
    
    console.log(`\n${template.toUpperCase()} Template:`);
    console.log(`- Generating ${viewCount} views`);
    
    // Generate views
    for (let i = 0; i < viewCount; i++) {
      const sessionId = sessions[Math.floor(Math.random() * sessions.length)];
      await analytics.trackTemplateView(template, sessionId);
      
      // Some views convert to downloads
      if (Math.random() < pattern.conversionRate) {
        await analytics.trackPDFGeneration(template, sessionId, true);
        console.log(`  ✅ PDF generated`);
      }
      
      // Simulate some failures
      if (Math.random() < 0.05) { // 5% failure rate
        await analytics.trackPDFGeneration(template, sessionId, false);
        console.log(`  ❌ PDF generation failed`);
      }
    }
  }

  // Generate some daily historical data
  console.log('\n📅 Generating historical daily data...');
  const dailyData = await analytics.loadDailyAnalytics();
  
  for (let daysAgo = 6; daysAgo >= 1; daysAgo--) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toISOString().split('T')[0];
    
    dailyData[dateStr] = {
      templates: {},
      totalViews: 0,
      totalDownloads: 0,
      uniqueSessions: Math.floor(10 + Math.random() * 20),
      errors: Math.floor(Math.random() * 5)
    };
    
    // Add template data for each day
    for (const [template, pattern] of Object.entries(templatePatterns)) {
      const dayViews = Math.floor(pattern.viewWeight * Math.random());
      const dayDownloads = Math.floor(dayViews * pattern.conversionRate);
      
      dailyData[dateStr].templates[template] = {
        views: dayViews,
        downloads: dayDownloads,
        errors: Math.floor(Math.random() * 2)
      };
      
      dailyData[dateStr].totalViews += dayViews;
      dailyData[dateStr].totalDownloads += dayDownloads;
    }
  }
  
  await analytics.saveAnalytics(await analytics.loadAnalytics());
  await analytics.saveDailyAnalytics(dailyData);

  console.log('\n📊 Generating final reports...\n');

  // Get and display results
  const popularity = await analytics.getPopularityRanking();
  const dailyReport = await analytics.getDailyReport();
  const insights = await analytics.getTemplateInsights();

  console.log('🏆 TEMPLATE POPULARITY RANKING:');
  console.log('================================');
  popularity.ranking.forEach((template, index) => {
    console.log(`${index + 1}. ${template.name.toUpperCase()}`);
    console.log(`   Views: ${template.views} | Downloads: ${template.downloads}`);
    console.log(`   Conversion: ${template.conversionRate}% | Score: ${template.popularityScore}`);
    console.log('');
  });

  console.log('\n📈 TODAY\'S ACTIVITY:');
  console.log('==================');
  console.log(`Total Views: ${dailyReport.summary.totalViews}`);
  console.log(`Total Downloads: ${dailyReport.summary.totalDownloads}`);
  console.log(`Errors: ${dailyReport.summary.errors}`);

  console.log('\n💡 INSIGHTS & RECOMMENDATIONS:');
  console.log('==============================');
  console.log(`Most Popular: ${insights.mostPopular?.name} (Score: ${insights.mostPopular?.popularityScore})`);
  console.log(`Best Conversion: ${insights.bestConversion?.name} (${(insights.bestConversion?.conversionRate * 100).toFixed(1)}%)`);
  console.log(`Least Popular: ${insights.leastPopular?.name} (Score: ${insights.leastPopular?.popularityScore})`);
  
  if (insights.recommendations.length > 0) {
    console.log('\nRecommendations:');
    insights.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
  }

  console.log('\n✅ Analytics test completed successfully!');
  console.log('\n🎯 Next steps:');
  console.log('1. Start the server: npm run dev:server');
  console.log('2. Start the frontend: npm run dev');
  console.log('3. Navigate to: http://localhost:5173/analytics');
  console.log('4. View the analytics dashboard with test data!');
}

// Run the test
generateTestData().catch(console.error);