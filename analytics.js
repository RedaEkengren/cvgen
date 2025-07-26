// CV Generator Analytics System
// Tracks template usage, PDF generations, and user behavior

import fs from 'fs/promises';
import path from 'path';

class CVAnalytics {
  constructor() {
    this.analyticsFile = path.join(process.cwd(), 'analytics-data.json');
    this.dailyFile = path.join(process.cwd(), 'daily-analytics.json');
    this.init();
  }

  async init() {
    // Create analytics files if they don't exist
    try {
      await fs.access(this.analyticsFile);
    } catch {
      await this.createInitialAnalyticsFile();
    }

    try {
      await fs.access(this.dailyFile);
    } catch {
      await this.createDailyAnalyticsFile();
    }
  }

  async createInitialAnalyticsFile() {
    const initialData = {
      templates: {
        'modern': { views: 0, downloads: 0, lastUsed: null },
        'executive': { views: 0, downloads: 0, lastUsed: null },
        'bold': { views: 0, downloads: 0, lastUsed: null },
        'creative': { views: 0, downloads: 0, lastUsed: null },
        'gradient': { views: 0, downloads: 0, lastUsed: null },
        'minimal': { views: 0, downloads: 0, lastUsed: null },
        'neon': { views: 0, downloads: 0, lastUsed: null },
        'retro': { views: 0, downloads: 0, lastUsed: null }
      },
      summary: {
        totalViews: 0,
        totalDownloads: 0,
        startDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      },
      userSessions: [],
      errorTracking: {
        pdfGenerationFailures: 0,
        templateLoadErrors: 0
      }
    };

    await fs.writeFile(this.analyticsFile, JSON.stringify(initialData, null, 2));
  }

  async createDailyAnalyticsFile() {
    const today = new Date().toISOString().split('T')[0];
    const dailyData = {
      [today]: {
        templates: {},
        totalViews: 0,
        totalDownloads: 0,
        uniqueSessions: 0,
        errors: 0
      }
    };

    await fs.writeFile(this.dailyFile, JSON.stringify(dailyData, null, 2));
  }

  async trackTemplateView(templateName, sessionId = null) {
    try {
      const data = await this.loadAnalytics();
      const today = new Date().toISOString().split('T')[0];
      
      // Track in main analytics
      if (data.templates[templateName]) {
        data.templates[templateName].views++;
        data.templates[templateName].lastUsed = new Date().toISOString();
        data.summary.totalViews++;
        data.summary.lastUpdate = new Date().toISOString();
      }

      // Track session if provided
      if (sessionId) {
        const existingSession = data.userSessions.find(s => s.id === sessionId);
        if (existingSession) {
          if (!existingSession.templatesViewed.includes(templateName)) {
            existingSession.templatesViewed.push(templateName);
          }
          existingSession.lastActivity = new Date().toISOString();
        } else {
          data.userSessions.push({
            id: sessionId,
            startTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            templatesViewed: [templateName],
            pdfsGenerated: []
          });
        }
      }

      await this.saveAnalytics(data);
      await this.trackDailyMetric('view', templateName);
      
      console.log(`📊 Analytics: Template '${templateName}' viewed`);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  async trackPDFGeneration(templateName, sessionId = null, success = true) {
    try {
      const data = await this.loadAnalytics();
      
      if (success) {
        // Track successful PDF generation
        if (data.templates[templateName]) {
          data.templates[templateName].downloads++;
          data.summary.totalDownloads++;
          data.summary.lastUpdate = new Date().toISOString();
        }

        // Track in session
        if (sessionId) {
          const session = data.userSessions.find(s => s.id === sessionId);
          if (session) {
            session.pdfsGenerated.push({
              template: templateName,
              timestamp: new Date().toISOString()
            });
            session.lastActivity = new Date().toISOString();
          }
        }

        await this.trackDailyMetric('download', templateName);
        console.log(`📊 Analytics: PDF generated for template '${templateName}'`);
      } else {
        // Track failed PDF generation
        data.errorTracking.pdfGenerationFailures++;
        await this.trackDailyMetric('error', templateName);
        console.log(`📊 Analytics: PDF generation failed for template '${templateName}'`);
      }

      await this.saveAnalytics(data);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  async trackDailyMetric(type, templateName) {
    try {
      const dailyData = await this.loadDailyAnalytics();
      const today = new Date().toISOString().split('T')[0];
      
      if (!dailyData[today]) {
        dailyData[today] = {
          templates: {},
          totalViews: 0,
          totalDownloads: 0,
          uniqueSessions: 0,
          errors: 0
        };
      }

      if (!dailyData[today].templates[templateName]) {
        dailyData[today].templates[templateName] = { views: 0, downloads: 0, errors: 0 };
      }

      switch (type) {
        case 'view':
          dailyData[today].templates[templateName].views++;
          dailyData[today].totalViews++;
          break;
        case 'download':
          dailyData[today].templates[templateName].downloads++;
          dailyData[today].totalDownloads++;
          break;
        case 'error':
          dailyData[today].templates[templateName].errors++;
          dailyData[today].errors++;
          break;
      }

      await fs.writeFile(this.dailyFile, JSON.stringify(dailyData, null, 2));
    } catch (error) {
      console.error('Daily analytics tracking error:', error);
    }
  }

  async getPopularityRanking() {
    try {
      const data = await this.loadAnalytics();
      
      // Calculate popularity score (downloads weighted more than views)
      const templateStats = Object.entries(data.templates).map(([name, stats]) => ({
        name,
        views: stats.views,
        downloads: stats.downloads,
        popularityScore: (stats.downloads * 3) + stats.views, // Downloads count 3x more
        conversionRate: stats.views > 0 ? (stats.downloads / stats.views * 100).toFixed(1) : 0,
        lastUsed: stats.lastUsed
      }));

      // Sort by popularity score
      templateStats.sort((a, b) => b.popularityScore - a.popularityScore);

      return {
        ranking: templateStats,
        summary: data.summary,
        topTemplate: templateStats[0],
        leastPopular: templateStats[templateStats.length - 1]
      };
    } catch (error) {
      console.error('Error getting popularity ranking:', error);
      return null;
    }
  }

  async getDailyReport(date = null) {
    try {
      const dailyData = await this.loadDailyAnalytics();
      const targetDate = date || new Date().toISOString().split('T')[0];
      
      if (!dailyData[targetDate]) {
        return { error: 'No data for specified date' };
      }

      const dayData = dailyData[targetDate];
      const templateRanking = Object.entries(dayData.templates).map(([name, stats]) => ({
        name,
        ...stats,
        popularityScore: (stats.downloads * 3) + stats.views
      })).sort((a, b) => b.popularityScore - a.popularityScore);

      return {
        date: targetDate,
        summary: {
          totalViews: dayData.totalViews,
          totalDownloads: dayData.totalDownloads,
          errors: dayData.errors
        },
        templateRanking,
        topTemplate: templateRanking[0] || null
      };
    } catch (error) {
      console.error('Error getting daily report:', error);
      return null;
    }
  }

  async getWeeklyTrends() {
    try {
      const dailyData = await this.loadDailyAnalytics();
      const last7Days = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        last7Days.push(dateStr);
      }

      const weeklyTrends = last7Days.map(date => {
        const dayData = dailyData[date] || { totalViews: 0, totalDownloads: 0, templates: {} };
        return {
          date,
          views: dayData.totalViews,
          downloads: dayData.totalDownloads,
          templates: dayData.templates
        };
      });

      return weeklyTrends;
    } catch (error) {
      console.error('Error getting weekly trends:', error);
      return [];
    }
  }

  async getTemplateInsights() {
    try {
      const data = await this.loadAnalytics();
      const weeklyTrends = await this.getWeeklyTrends();
      
      const insights = {
        mostPopular: null,
        leastPopular: null,
        bestConversion: null,
        trending: null,
        recommendations: []
      };

      // Calculate insights
      const templateStats = Object.entries(data.templates).map(([name, stats]) => ({
        name,
        views: stats.views,
        downloads: stats.downloads,
        conversionRate: stats.views > 0 ? stats.downloads / stats.views : 0,
        popularityScore: (stats.downloads * 3) + stats.views
      }));

      templateStats.sort((a, b) => b.popularityScore - a.popularityScore);

      insights.mostPopular = templateStats[0];
      insights.leastPopular = templateStats[templateStats.length - 1];
      insights.bestConversion = templateStats.sort((a, b) => b.conversionRate - a.conversionRate)[0];

      // Generate recommendations
      if (insights.mostPopular.popularityScore > insights.leastPopular.popularityScore * 5) {
        insights.recommendations.push(`Consider promoting ${insights.leastPopular.name} template or improving its design`);
      }

      if (insights.bestConversion.conversionRate > 0.5) {
        insights.recommendations.push(`${insights.bestConversion.name} has excellent conversion - consider similar designs`);
      }

      return insights;
    } catch (error) {
      console.error('Error getting template insights:', error);
      return null;
    }
  }

  async loadAnalytics() {
    const data = await fs.readFile(this.analyticsFile, 'utf-8');
    return JSON.parse(data);
  }

  async loadDailyAnalytics() {
    const data = await fs.readFile(this.dailyFile, 'utf-8');
    return JSON.parse(data);
  }

  async saveAnalytics(data) {
    await fs.writeFile(this.analyticsFile, JSON.stringify(data, null, 2));
  }
  
  async saveDailyAnalytics(data) {
    await fs.writeFile(this.dailyFile, JSON.stringify(data, null, 2));
  }

  // Generate analytics report
  async generateReport() {
    try {
      const popularity = await this.getPopularityRanking();
      const dailyReport = await this.getDailyReport();
      const weeklyTrends = await this.getWeeklyTrends();
      const insights = await this.getTemplateInsights();

      const report = {
        generatedAt: new Date().toISOString(),
        popularity,
        dailyReport,
        weeklyTrends,
        insights,
        summary: {
          totalTemplates: Object.keys(popularity.ranking).length,
          totalViews: popularity.summary.totalViews,
          totalDownloads: popularity.summary.totalDownloads,
          averageConversion: ((popularity.summary.totalDownloads / popularity.summary.totalViews) * 100).toFixed(1)
        }
      };

      return report;
    } catch (error) {
      console.error('Error generating analytics report:', error);
      return null;
    }
  }
}

export default CVAnalytics;