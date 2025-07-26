import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Download, Eye, Calendar, Award } from 'lucide-react'

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('today')

  useEffect(() => {
    fetchAnalytics()
  }, [selectedPeriod])

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/analytics/report`
        : `${window.location.origin}/api/analytics/report`
      
      const response = await fetch(apiUrl)
      if (!response.ok) throw new Error('Failed to fetch analytics')
      
      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      setError(err.message)
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-medium">Analytics Error</h3>
        <p className="text-red-600 mt-2">{error}</p>
        <button 
          onClick={fetchAnalytics}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No Analytics Data</h3>
        <p className="mt-2 text-gray-600">Start using templates to see analytics</p>
      </div>
    )
  }

  const { popularity, summary, weeklyTrends, insights } = analytics

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="mr-3 h-6 w-6" />
          Template Analytics
        </h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date(analytics.generatedAt).toLocaleString('sv-SE')}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <Download className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalDownloads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{summary.averageConversion}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Template</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">{popularity.topTemplate?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Template Popularity Ranking */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="mr-2 h-5 w-5" />
          Template Popularity Ranking
        </h3>
        
        <div className="space-y-4">
          {popularity.ranking.map((template, index) => (
            <div key={template.name} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {template.name}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{template.views} views</span>
                  <span>{template.downloads} downloads</span>
                  <span>{template.conversionRate}% conversion</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.max(5, (template.popularityScore / popularity.ranking[0].popularityScore) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-sm font-medium text-gray-900">
                {template.popularityScore}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Weekly Activity Trends
        </h3>
        
        <div className="space-y-3">
          {weeklyTrends.map((day, index) => (
            <div key={day.date} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600">
                {new Date(day.date).toLocaleDateString('sv-SE', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.max(2, (day.views / Math.max(...weeklyTrends.map(d => d.views))) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16">{day.views} views</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ 
                        width: `${Math.max(2, (day.downloads / Math.max(...weeklyTrends.map(d => d.downloads))) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16">{day.downloads} PDFs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights and Recommendations */}
      {insights && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Insights & Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Performance Leaders</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Most Popular:</span>
                  <span className="font-medium capitalize">{insights.mostPopular?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Conversion:</span>
                  <span className="font-medium capitalize">{insights.bestConversion?.name} ({(insights.bestConversion?.conversionRate * 100).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
              <div className="space-y-1 text-sm text-gray-600">
                {insights.recommendations.length > 0 ? (
                  insights.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>{rec}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No specific recommendations at this time.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchAnalytics}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  )
}