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
    <div className="bg-white shadow-xl max-w-4xl mx-auto" style={{ minHeight: '297mm' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {state.personalInfo.firstName} {state.personalInfo.lastName}
            </h1>
            <p className="text-slate-200 text-lg font-medium">IT-Student & Utvecklare</p>
          </div>
          <div className="mt-4 md:mt-0 space-y-2 text-sm">
            {state.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-slate-300" />
                <span>{state.personalInfo.email}</span>
              </div>
            )}
            {state.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-slate-300" />
                <span>{state.personalInfo.phone}</span>
              </div>
            )}
            {state.personalInfo.city && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-slate-300" />
                <span>{state.personalInfo.city}</span>
              </div>
            )}
          </div>
        </div>
        
        {state.personalInfo.summary && (
          <div className="mt-6 pt-6 border-t border-slate-600">
            <p className="text-slate-100 leading-relaxed">{state.personalInfo.summary}</p>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Education */}
            {state.education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-primary-500">
                  Utbildning
                </h2>
                <div className="space-y-4">
                  {state.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-primary-200 pl-4">
                      <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                      <p className="text-primary-600 font-medium">{edu.school}</p>
                      <p className="text-slate-600 text-sm">{edu.startDate} - {edu.endDate}</p>
                      {edu.description && (
                        <p className="text-slate-700 mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {state.experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-primary-500">
                  Erfarenhet
                </h2>
                <div className="space-y-4">
                  {state.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-primary-200 pl-4">
                      <h3 className="text-lg font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-primary-600 font-medium">{exp.company}</p>
                      <p className="text-slate-600 text-sm">
                        {exp.startDate} - {exp.current ? 'Pågående' : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-slate-700 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {(state.projects.length > 0 || state.githubProjects.length > 0) && (
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-primary-500">
                  Projekt
                </h2>
                <div className="space-y-4">
                  {/* Manual projects */}
                  {state.projects.map((project, index) => (
                    <div key={`manual-${index}`} className="border border-slate-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
                      <p className="text-slate-700 mt-1">{project.description}</p>
                      {project.technologies && (
                        <p className="text-primary-600 text-sm mt-2">
                          <span className="font-medium">Teknologier:</span> {project.technologies}
                        </p>
                      )}
                      <div className="flex space-x-4 mt-2">
                        {project.link && (
                          <a href={project.link} className="text-primary-600 text-sm hover:underline">
                            Visa projekt
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} className="text-slate-600 text-sm hover:underline">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* GitHub projects */}
                  {state.githubProjects.map((project, index) => (
                    <div key={`github-${index}`} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
                          <p className="text-slate-700 mt-1">{project.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="text-primary-600">
                              <span className="font-medium">Språk:</span> {project.technologies}
                            </span>
                            <span className="text-slate-600">⭐ {project.stars}</span>
                          </div>
                        </div>
                        <Github className="h-5 w-5 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Links */}
            <section className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Kontakt & Länkar</h3>
              <div className="space-y-3 text-sm">
                {state.personalInfo.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-slate-500" />
                    <a href={state.personalInfo.website} className="text-primary-600 hover:underline break-all">
                      {state.personalInfo.website.replace('https://', '')}
                    </a>
                  </div>
                )}
                {state.personalInfo.linkedIn && (
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-slate-500" />
                    <a href={`https://${state.personalInfo.linkedIn}`} className="text-primary-600 hover:underline break-all">
                      {state.personalInfo.linkedIn}
                    </a>
                  </div>
                )}
                {state.personalInfo.github && (
                  <div className="flex items-center">
                    <Github className="h-4 w-4 mr-2 text-slate-500" />
                    <a href={`https://${state.personalInfo.github}`} className="text-primary-600 hover:underline break-all">
                      {state.personalInfo.github}
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {state.skills.length > 0 && (
              <section className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Färdigheter</h3>
                <div className="flex flex-wrap gap-2">
                  {state.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                    >
                      {skill.name || skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
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