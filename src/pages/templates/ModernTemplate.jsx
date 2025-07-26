import React from 'react';

const ModernTemplate = ({ 
  name = "Anna Andersson",
  title = "Frontend Developer",
  email = "anna.andersson@email.com",
  phone = "+46 70 123 45 67",
  location = "Stockholm, Sverige",
  linkedin = "linkedin.com/in/anna-andersson",
  github = "github.com/anna-andersson",
  profile = "Passionerad frontendutvecklare med 5 års erfarenhet...",
  experience = [],
  education = [],
  skills = { languages: [], tools: [] }
}) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <a href={`mailto:${email}`} className="hover:text-gray-900">{email}</a>
            <span>{phone}</span>
            <span>{location}</span>
            {linkedin && <a href={`https://${linkedin}`} className="hover:text-gray-900">LinkedIn</a>}
            {github && <a href={`https://${github}`} className="hover:text-gray-900">GitHub</a>}
          </div>
        </header>

        {/* Profile */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Profil</h3>
          <p className="text-gray-700 leading-relaxed">{profile}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">Erfarenhet</h3>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{job.date}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {job.points?.map((point, i) => (
                    <li key={i} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">Utbildning</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">{edu.school}</h4>
                    <p className="text-gray-700">{edu.program}</p>
                  </div>
                  <span className="text-sm text-gray-500">{edu.year}</span>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">Färdigheter</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Språk & Tekniker</h4>
              <ul className="space-y-1">
                {skills.languages.map((skill, index) => (
                  <li key={index} className="text-gray-700">{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase">Verktyg & Ramverk</h4>
              <ul className="space-y-1">
                {skills.tools.map((tool, index) => (
                  <li key={index} className="text-gray-700">{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModernTemplate;