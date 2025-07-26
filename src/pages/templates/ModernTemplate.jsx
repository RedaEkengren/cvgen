import React from 'react';

const ModernTemplate = ({
  name,
  title,
  email,
  phone,
  location,
  linkedin,
  github,
  profile,
  experience = [],
  education = [],
  skills = { languages: [], tools: [] }
}) => {
  return (
    <div className="bg-white p-10 text-gray-800 leading-relaxed font-sans max-w-3xl mx-auto text-sm">
      {/* Header */}
      <header className="border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
        <h2 className="text-xl text-gray-600 mt-1">{title}</h2>
        <div className="mt-4 space-y-1 text-sm text-gray-700">
          {email && <p>Email: <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a></p>}
          {phone && <p>Telefon: {phone}</p>}
          {location && <p>Plats: {location}</p>}
          {linkedin && <p>LinkedIn: <a href={`https://${linkedin}`} className="text-blue-600 hover:underline">{linkedin}</a></p>}
          {github && <p>GitHub: <a href={`https://${github}`} className="text-blue-600 hover:underline">{github}</a></p>}
        </div>
      </header>

      {/* Profile */}
      {profile && (
        <section className="mb-8">
          <h3 className="uppercase tracking-wide text-gray-900 font-semibold mb-2">Profil</h3>
          <p>{profile}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h3 className="uppercase tracking-wide text-gray-900 font-semibold mb-2">Erfarenhet</h3>
          {experience.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-700">{item.company}</p>
                </div>
                <p className="text-gray-500 text-sm whitespace-nowrap">{item.date}</p>
              </div>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                {item.points?.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3 className="uppercase tracking-wide text-gray-900 font-semibold mb-2">Utbildning</h3>
          {education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-gray-700">{edu.program}</p>
                </div>
                <p className="text-gray-500 text-sm whitespace-nowrap">{edu.year}</p>
              </div>
              {edu.description && (
                <p className="text-gray-600 mt-1 text-sm">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(skills.languages.length > 0 || skills.tools.length > 0) && (
        <section>
          <h3 className="uppercase tracking-wide text-gray-900 font-semibold mb-2">Färdigheter</h3>
          <div className="grid grid-cols-2 gap-4">
            {skills.languages.length > 0 && (
              <div>
                <p className="font-semibold text-sm text-gray-700 uppercase mb-1">Språk & Tekniker</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {skills.languages.map((lang, i) => <li key={i}>{lang}</li>)}
                </ul>
              </div>
            )}
            {skills.tools.length > 0 && (
              <div>
                <p className="font-semibold text-sm text-gray-700 uppercase mb-1">Verktyg & Ramverk</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {skills.tools.map((tool, i) => <li key={i}>{tool}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default ModernTemplate;