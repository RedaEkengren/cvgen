import { useRef } from 'react'
import { useCV } from '../context/CVContext'
import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react'
import html2pdf from 'html2pdf.js'

export default function Preview() {
  const { state } = useCV()
  const cvRef = useRef()

  const exportToPDF = () => {
    const element = cvRef.current
    const opt = {
      margin: 0,
      filename: `CV_${state.personalInfo.firstName}_${state.personalInfo.lastName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf().set(opt).from(element).save()
  }

  const ModernTemplate = () => (
    <div className="max-w-3xl mx-auto p-10 bg-white text-gray-900 font-sans leading-relaxed" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          {state.personalInfo.firstName} {state.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mt-1">IT-Student & Utvecklare</p>
        <div className="text-sm mt-2 text-gray-500">
          <p>
            {[
              state.personalInfo.email,
              state.personalInfo.phone,
              state.personalInfo.city
            ].filter(Boolean).join(' • ')}
          </p>
          {(state.personalInfo.linkedIn || state.personalInfo.github) && (
            <p className="mt-1">
              {[
                state.personalInfo.linkedIn && state.personalInfo.linkedIn.replace('https://', '').replace('http://', ''),
                state.personalInfo.github && state.personalInfo.github.replace('https://', '').replace('http://', '')
              ].filter(Boolean).join(' • ')}
            </p>
          )}
        </div>
      </header>

      {/* Profil */}
      {state.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Profil</h2>
          <p>{state.personalInfo.summary}</p>
        </section>
      )}

      {/* Erfarenhet */}
      {state.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Arbetslivserfarenhet</h2>
          {state.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between text-sm text-gray-500">
                <p className="font-medium text-gray-800">
                  {exp.position} – {exp.company}
                </p>
                <p>{exp.startDate}–{exp.current ? 'Pågående' : exp.endDate}</p>
              </div>
              {exp.description && (
                <ul className="list-disc list-inside mt-1 text-sm">
                  {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Utbildning */}
      {state.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Utbildning</h2>
          {state.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between text-sm text-gray-500">
                <p className="font-medium text-gray-800">
                  {edu.degree} – {edu.school}
                </p>
                <p>{edu.startDate}–{edu.endDate}</p>
              </div>
              {(edu.field || edu.description) && (
                <p className="text-sm mt-1">
                  {[edu.field && `Inriktning: ${edu.field}`, edu.description]
                    .filter(Boolean)
                    .join('. ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projekt */}
      {(state.projects.length > 0 || state.githubProjects.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Projekt</h2>
          {/* Manual projects */}
          {state.projects.map((project, index) => (
            <div key={`manual-${index}`} className="mb-3">
              <p className="font-medium text-gray-800">{project.name}</p>
              <p className="text-sm mt-1">{project.description}</p>
              {project.technologies && (
                <p className="text-sm text-gray-600 mt-1">Teknologier: {project.technologies}</p>
              )}
            </div>
          ))}
          {/* GitHub projects */}
          {state.githubProjects.map((project, index) => (
            <div key={`github-${index}`} className="mb-3">
              <p className="font-medium text-gray-800">{project.name}</p>
              <p className="text-sm mt-1">{project.description}</p>
              <p className="text-sm text-gray-600 mt-1">Språk: {project.technologies} • ⭐ {project.stars}</p>
            </div>
          ))}
        </section>
      )}

      {/* Färdigheter */}
      {state.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Färdigheter</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Programmeringsspråk */}
            {state.skills.some(skill => skill.category === 'languages') && (
              <div>
                <p className="font-medium text-gray-800">Programmering</p>
                <ul className="list-disc list-inside">
                  {state.skills
                    .filter(skill => skill.category === 'languages')
                    .map((skill, index) => (
                      <li key={index}>{skill.name}</li>
                    ))}
                </ul>
              </div>
            )}
            
            {/* Ramverk & Verktyg */}
            {state.skills.some(skill => skill.category === 'frameworks' || skill.category === 'tools') && (
              <div>
                <p className="font-medium text-gray-800">Ramverk & Verktyg</p>
                <ul className="list-disc list-inside">
                  {state.skills
                    .filter(skill => skill.category === 'frameworks' || skill.category === 'tools')
                    .map((skill, index) => (
                      <li key={index}>{skill.name}</li>
                    ))}
                </ul>
              </div>
            )}
            
            {/* Fallback för gamla skill-format */}
            {state.skills.some(skill => typeof skill === 'string') && (
              <div className="col-span-2">
                <p className="font-medium text-gray-800">Färdigheter</p>
                <ul className="list-disc list-inside">
                  {state.skills
                    .filter(skill => typeof skill === 'string')
                    .map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-2 border-primary-500 rounded-lg p-4 bg-primary-50">
                <div className="text-center">
                  <div className="w-16 h-20 bg-white border border-gray-200 rounded mx-auto mb-3"></div>
                  <h4 className="font-medium text-gray-900">Modern</h4>
                  <p className="text-sm text-gray-600 mt-1">Aktuell mall</p>
                </div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 opacity-60">
                <div className="text-center">
                  <div className="w-16 h-20 bg-white border border-gray-200 rounded mx-auto mb-3"></div>
                  <h4 className="font-medium text-gray-500">Klassisk</h4>
                  <p className="text-sm text-gray-400 mt-1">Kommer snart...</p>
                </div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 opacity-60">
                <div className="text-center">
                  <div className="w-16 h-20 bg-white border border-gray-200 rounded mx-auto mb-3"></div>
                  <h4 className="font-medium text-gray-500">Kreativ</h4>
                  <p className="text-sm text-gray-400 mt-1">Kommer snart...</p>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              🎨 Fler mallar kommer snart...
            </p>
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
            <ModernTemplate />
          </div>
        )}
      </div>
    </div>
  )
}