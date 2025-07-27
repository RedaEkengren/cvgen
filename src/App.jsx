import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import CVBuilder from './pages/CVBuilder'
import Preview from './pages/Preview'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import { CVProvider } from './context/CVContext'

function App() {
  return (
    <CVProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/builder" element={
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <CVBuilder />
            </main>
          </div>
        } />
        <Route path="/preview" element={
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Preview />
            </main>
          </div>
        } />
        <Route path="/analytics" element={
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <AnalyticsDashboard />
            </main>
          </div>
        } />
      </Routes>
    </CVProvider>
  )
}

export default App