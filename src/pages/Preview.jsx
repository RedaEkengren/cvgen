import React, { useRef, useState } from 'react'
import { useCV } from '../context/CVContext'
import html2pdf from 'html2pdf.js'
import { Download } from 'lucide-react'
import ModernTemplate from './templates/ModernTemplate'
import SleekTemplate from './templates/SleekTemplate'
import ModernTemplatePhoto from './templates/ModernTemplatePhoto'
import SleekTemplatePhoto from './templates/SleekTemplatePhoto'

export default function Preview() {
  const { state } = useCV()
  const cvRef = useRef()
  const [selectedTemplate, setSelectedTemplate] = useState('sleek') // Hårdkodad till SleekTemplate för test

  const exportToPDF = () => {
    const element = cvRef.current
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `CV_${state.personalInfo.firstName}_${state.personalInfo.lastName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        letterRendering: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save()
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
                <p className="text-sm text-gray-600 mt-1">Mörk header med accenter</p>
              </button>
              
              <button
                onClick={() => setSelectedTemplate('sleek')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'sleek' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Sleek</h4>
                <p className="text-sm text-gray-600 mt-1">Clean minimalistisk design</p>
              </button>

              <button
                onClick={() => setSelectedTemplate('modern-photo')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'modern-photo' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Modern + Foto</h4>
                <p className="text-sm text-gray-600 mt-1">Med plats för profilbild</p>
              </button>

              <button
                onClick={() => setSelectedTemplate('sleek-photo')}
                className={`border-2 rounded-lg p-4 text-left transition-colors ${
                  selectedTemplate === 'sleek-photo' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Sleek + Foto</h4>
                <p className="text-sm text-gray-600 mt-1">Clean design med foto</p>
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
                name={`${state.personalInfo.firstName} ${state.personalInfo.lastName}`}
                title="IT-Student & Utvecklare"
                email={state.personalInfo.email}
                phone={state.personalInfo.phone}
                location={state.personalInfo.city}
                linkedin={state.personalInfo.linkedIn}
                github={state.personalInfo.github}
                profile={state.personalInfo.summary}
                experience={state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                }))}
                education={state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                }))}
                skills={{
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                }}
              />
            )}
            {selectedTemplate === 'sleek' && (
              <SleekTemplate
                name={`${state.personalInfo.firstName} ${state.personalInfo.lastName}`}
                title="IT-Student & Utvecklare"
                email={state.personalInfo.email}
                phone={state.personalInfo.phone}
                location={state.personalInfo.city}
                linkedin={state.personalInfo.linkedIn}
                github={state.personalInfo.github}
                profile={state.personalInfo.summary}
                experience={state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                }))}
                education={state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                }))}
                skills={{
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                }}
              />
            )}
            {selectedTemplate === 'modern-photo' && (
              <ModernTemplatePhoto
                name={`${state.personalInfo.firstName} ${state.personalInfo.lastName}`}
                title="IT-Student & Utvecklare"
                email={state.personalInfo.email}
                phone={state.personalInfo.phone}
                location={state.personalInfo.city}
                linkedin={state.personalInfo.linkedIn}
                github={state.personalInfo.github}
                photoUrl={state.personalInfo.photoUrl}
                profile={state.personalInfo.summary}
                experience={state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                }))}
                education={state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                }))}
                skills={{
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                }}
              />
            )}
            {selectedTemplate === 'sleek-photo' && (
              <SleekTemplatePhoto
                name={`${state.personalInfo.firstName} ${state.personalInfo.lastName}`}
                title="IT-Student & Utvecklare"
                email={state.personalInfo.email}
                phone={state.personalInfo.phone}
                location={state.personalInfo.city}
                linkedin={state.personalInfo.linkedIn}
                github={state.personalInfo.github}
                photoUrl={state.personalInfo.photoUrl}
                profile={state.personalInfo.summary}
                experience={state.experience.map(exp => ({
                  title: exp.position,
                  company: exp.company,
                  date: `${exp.startDate} - ${exp.current ? 'Nuvarande' : exp.endDate}`,
                  points: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
                }))}
                education={state.education.map(edu => ({
                  school: edu.school,
                  program: edu.degree,
                  year: `${edu.startDate} - ${edu.endDate}`,
                  description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ') || null
                }))}
                skills={{
                  languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                  tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
