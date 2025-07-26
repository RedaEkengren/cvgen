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
    <div className="min-h-screen bg-white p-8" style={{ minHeight: '297mm' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {state.personalInfo.firstName} {state.personalInfo.lastName}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">IT-Student & Utvecklare</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {state.personalInfo.email && (
              <a href={`mailto:${state.personalInfo.email}`} className="hover:text-gray-900 transition-colors">
                {state.personalInfo.email}
              </a>
            )}
            {state.personalInfo.phone && <span>{state.personalInfo.phone}</span>}
            {state.personalInfo.city && <span>{state.personalInfo.city}</span>}
            {state.personalInfo.linkedIn && (
              <a href={`https://${state.personalInfo.linkedIn.replace('https://', '').replace('http://', '')}`} className="hover:text-gray-900 transition-colors flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {state.personalInfo.github && (
              <a href={`https://${state.personalInfo.github.replace('https://', '').replace('http://', '')}`} className="hover:text-gray-900 transition-colors flex items-center gap-1">
                <Github className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
          </div>
        </header>

        {/* Profile */}
        {state.personalInfo.summary && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Profil
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {state.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {state.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Erfarenhet
            </h3>
            <div className="space-y-6">
              {state.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Nuvarande' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-0">
                      {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li key={i} className="leading-relaxed">{line.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {state.education.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Utbildning
            </h3>
            <div className="space-y-4">
              {state.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{edu.school}</h4>
                      <p className="text-gray-700">{edu.degree}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  {(edu.field || edu.description) && (
                    <p className="text-sm text-gray-600 mt-1">
                      {[edu.field && `Inriktning: ${edu.field}`, edu.description]
                        .filter(Boolean)
                        .join('. ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {(state.projects.length > 0 || state.githubProjects.length > 0) && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Projekt
            </h3>
            <div className="space-y-4">
              {/* Manual projects */}
              {state.projects.map((project, index) => (
                <div key={`manual-${index}`}>
                  <h4 className="text-base font-semibold text-gray-900">{project.name}</h4>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mt-1">Teknologier: {project.technologies}</p>
                  )}
                </div>
              ))}
              {/* GitHub projects */}
              {state.githubProjects.map((project, index) => (
                <div key={`github-${index}`}>
                  <h4 className="text-base font-semibold text-gray-900">{project.name}</h4>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  <p className="text-sm text-gray-600 mt-1">Språk: {project.technologies} • ⭐ {project.stars}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {state.skills.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Färdigheter
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Languages */}
              {state.skills.some(skill => skill.category === 'languages') && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Språk & Tekniker</h4>
                  <ul className="space-y-1">
                    {state.skills
                      .filter(skill => skill.category === 'languages')
                      .map((skill, index) => (
                        <li key={index} className="text-gray-700">{skill.name}</li>
                      ))}
                  </ul>
                </div>
              )}
              
              {/* Tools & Frameworks */}
              {state.skills.some(skill => skill.category === 'frameworks' || skill.category === 'tools') && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Verktyg & Ramverk</h4>
                  <ul className="space-y-1">
                    {state.skills
                      .filter(skill => skill.category === 'frameworks' || skill.category === 'tools')
                      .map((skill, index) => (
                        <li key={index} className="text-gray-700">{skill.name}</li>
                      ))}
                  </ul>
                </div>
              )}
              
              {/* Fallback for old skill format */}
              {state.skills.some(skill => typeof skill === 'string') && (
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Färdigheter</h4>
                  <ul className="space-y-1">
                    {state.skills
                      .filter(skill => typeof skill === 'string')
                      .map((skill, index) => (
                        <li key={index} className="text-gray-700">{skill}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
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