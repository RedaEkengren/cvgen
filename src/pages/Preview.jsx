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
    <div className="bg-white shadow-lg max-w-4xl mx-auto border border-gray-200" style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header Section */}
      <div className="p-8 pb-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {state.personalInfo.firstName} {state.personalInfo.lastName}
          </h1>
          <h2 className="text-xl text-blue-700 font-medium mb-4">
            IT-Student & Utvecklare
          </h2>
        </div>
        
        {/* Contact Information - Horizontal Layout */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-6">
          {state.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>{state.personalInfo.email}</span>
            </div>
          )}
          {state.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>{state.personalInfo.phone}</span>
            </div>
          )}
          {state.personalInfo.city && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span>{state.personalInfo.city}</span>
            </div>
          )}
          {state.personalInfo.linkedIn && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-2 text-gray-500" />
              <span className="break-all">{state.personalInfo.linkedIn.replace('https://', '').replace('http://', '')}</span>
            </div>
          )}
          {state.personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-2 text-gray-500" />
              <span className="break-all">{state.personalInfo.github.replace('https://', '').replace('http://', '')}</span>
            </div>
          )}
          {state.personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-gray-500" />
              <span className="break-all">{state.personalInfo.website.replace('https://', '').replace('http://', '')}</span>
            </div>
          )}
        </div>
        
        {/* Professional Summary */}
        {state.personalInfo.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b-2 border-blue-700">
              Profil
            </h3>
            <p className="text-gray-700 leading-relaxed">{state.personalInfo.summary}</p>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="px-8 pb-8">
        <div className="space-y-8">
          
          {/* Experience Section */}
          {state.experience.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b-2 border-blue-700">
                Arbetslivserfarenhet
              </h3>
              <div className="space-y-4">
                {state.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-base font-semibold text-gray-900">{exp.position}</h4>
                      <span className="text-sm text-gray-600 font-medium">
                        {exp.startDate} - {exp.current ? 'Pågående' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-blue-700 font-medium text-sm mb-2">{exp.company}</p>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {state.education.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b-2 border-blue-700">
                Utbildning
              </h3>
              <div className="space-y-4">
                {state.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-base font-semibold text-gray-900">{edu.degree}</h4>
                      <span className="text-sm text-gray-600 font-medium">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-blue-700 font-medium text-sm mb-2">{edu.school}</p>
                    {edu.field && (
                      <p className="text-gray-600 text-sm mb-2">Inriktning: {edu.field}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {state.skills.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b-2 border-blue-700">
                Färdigheter
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Programmeringsspråk</h4>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.filter(skill => skill.category === 'languages').map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Ramverk & Verktyg</h4>
                  <div className="flex flex-wrap gap-2">
                    {state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded font-medium">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Fallback for old skill format */}
              {state.skills.some(skill => typeof skill === 'string') && (
                <div className="flex flex-wrap gap-2">
                  {state.skills.filter(skill => typeof skill === 'string').map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Projects Section */}
          {(state.projects.length > 0 || state.githubProjects.length > 0) && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-1 border-b-2 border-blue-700">
                Projekt
              </h3>
              <div className="space-y-4">
                {/* Manual projects */}
                {state.projects.map((project, index) => (
                  <div key={`manual-${index}`} className="mb-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{project.description}</p>
                    {project.technologies && (
                      <p className="text-blue-700 text-sm font-medium mb-1">
                        Teknologier: {project.technologies}
                      </p>
                    )}
                    {(project.link || project.github) && (
                      <div className="flex space-x-4 text-xs">
                        {project.link && (
                          <span className="text-gray-600">🔗 {project.link.replace('https://', '').replace('http://', '')}</span>
                        )}
                        {project.github && (
                          <span className="text-gray-600">📱 {project.github.replace('https://', '').replace('http://', '')}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* GitHub projects */}
                {state.githubProjects.map((project, index) => (
                  <div key={`github-${index}`} className="mb-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{project.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-700 font-medium">
                        Språk: {project.technologies}
                      </span>
                      <span className="text-gray-600">⭐ {project.stars}</span>
                      <span className="text-gray-600">📱 GitHub</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
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