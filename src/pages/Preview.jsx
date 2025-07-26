import React, { useRef } from 'react'
import { useCV } from '../context/CVContext'
import html2pdf from 'html2pdf.js'
import { Download } from 'lucide-react'
import DefaultTemplate from './templates/ModernTemplate'

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
            <DefaultTemplate
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
                description: [edu.field && `Inriktning: ${edu.field}`, edu.description].filter(Boolean).join('. ')
              }))}
              skills={{
                languages: state.skills.filter(skill => skill.category === 'languages' || typeof skill === 'string').map(skill => typeof skill === 'string' ? skill : skill.name),
                tools: state.skills.filter(skill => skill.category === 'frameworks' || skill.category === 'tools').map(skill => skill.name)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
