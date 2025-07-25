import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import CVBuilder from './pages/CVBuilder'
import Preview from './pages/Preview'
import { CVProvider } from './context/CVContext'

function App() {
  return (
    <CVProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<CVBuilder />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </main>
      </div>
    </CVProvider>
  )
}

export default App