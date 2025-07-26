import React, { useRef, useState } from 'react'
import { useCV } from '../context/CVContext'
import { Download } from 'lucide-react'
import ModernTemplate from './templates/ModernTemplate'
import SleekTemplate from './templates/SleekTemplate'
import Creative from './templates/Creative'
import Gradient from './templates/Gradient'
import Minimal from './templates/Minimal'
import Neon from './templates/Neon'
import Retro from './templates/Retro'

export default function Preview() {
  const { state } = useCV()
  const cvRef = useRef()
  const [selectedTemplate, setSelectedTemplate] = useState(state.selectedTemplate || 'sleek')

  const exportToPDF = async () => {
    const element = cvRef.current
    const filename = `CV_${state.personalInfo.firstName || 'Unknown'}_${state.personalInfo.lastName || 'User'}.pdf`
    
    try {
      // Get the HTML content
      const htmlContent = element.innerHTML
      
      // Send to backend API
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/generate-pdf`
        : `${window.location.origin}/api/generate-pdf`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent,
          filename
        })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('PDF generation error:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
    } catch (error) {
      console.error('PDF export failed:', error)
      alert('PDF-export misslyckades. Försök igen.')
    }
  }

  const hasContent = state.personalInfo.firstName || state.personalInfo.lastName ||
    state.education.length > 0 || state.experience.length > 0 ||
    state.projects.length > 0 || state.githubProjects.length > 0

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CV-förhandsgranskning</h1>
            <p className="text-gray-600 mt-2">Se hur ditt CV kommer att se ut</p>
          </div>
          {hasContent && (
            <button
              onClick={exportToPDF}
              className="flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Ladda ner PDF
            </button>
          )}
        </div>

        {/* Template Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Välj CV-mall</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setSelectedTemplate('modern')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'modern' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Modern</h4>
                <p className="text-sm text-gray-600 mt-1">Lila accenter med tvåkolumns layout</p>
              </button>
              
              <button
                onClick={() => setSelectedTemplate('sleek')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'sleek' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Executive</h4>
                <p className="text-sm text-gray-600 mt-1">Elegant centrerad design</p>
              </button>


              <button
                onClick={() => setSelectedTemplate('creative')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'creative' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Creative</h4>
                <p className="text-sm text-gray-600 mt-1">Kreativ design med färgglada accenter</p>
              </button>

              <button
                onClick={() => setSelectedTemplate('gradient')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'gradient' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Gradient</h4>
                <p className="text-sm text-gray-600 mt-1">Modern design med gradienter</p>
              </button>

              <button
                onClick={() => setSelectedTemplate('minimal')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'minimal' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Minimal</h4>
                <p className="text-sm text-gray-600 mt-1">Ultra-minimalistisk design</p>
              </button>

              <button
                onClick={() => setSelectedTemplate('neon')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'neon' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Neon</h4>
                <p className="text-sm text-gray-600 mt-1">Cyberpunk-inspirerad design</p>
              </button>

              <button
                onClick={() => setSelectedTemplate('retro')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'retro' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Retro</h4>
                <p className="text-sm text-gray-600 mt-1">80-tals inspirerad design</p>
              </button>
            </div>
          </div>
        </div>

        {!hasContent ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-12">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Ditt CV är tomt
              </h3>
              <p className="text-gray-600 mb-6">
                Börja med att fylla i din personliga information i CV-byggaren
              </p>
              <a
                href="/builder"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Gå till CV-byggare
              </a>
            </div>
          </div>
        ) : (
          <div ref={cvRef} className="cv-container">
            {selectedTemplate === 'modern' && (
              <ModernTemplate
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
            {selectedTemplate === 'sleek' && (
              <SleekTemplate
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
            {selectedTemplate === 'creative' && (
              <Creative
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                photoUrl={state.personalInfo.photoUrl || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
            {selectedTemplate === 'gradient' && (
              <Gradient
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                photoUrl={state.personalInfo.photoUrl || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
            {selectedTemplate === 'minimal' && (
              <Minimal
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                photoUrl={state.personalInfo.photoUrl || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
            {selectedTemplate === 'neon' && (
              <Neon
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                photoUrl={state.personalInfo.photoUrl || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
            {selectedTemplate === 'retro' && (
              <Retro
                name={state.personalInfo.firstName && state.personalInfo.lastName ? `${state.personalInfo.firstName} ${state.personalInfo.lastName}` : undefined}
                title={state.personalInfo.title || undefined}
                email={state.personalInfo.email || undefined}
                phone={state.personalInfo.phone || undefined}
                location={state.personalInfo.city || undefined}
                linkedin={state.personalInfo.linkedIn || undefined}
                github={state.personalInfo.github || undefined}
                photoUrl={state.personalInfo.photoUrl || undefined}
                profile={state.personalInfo.summary || undefined}
                experience={state.experience.length > 0 ? state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                })) : undefined}
                education={state.education.length > 0 ? state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                })) : undefined}
                skills={state.skills.length > 0 ? {
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                } : undefined}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
