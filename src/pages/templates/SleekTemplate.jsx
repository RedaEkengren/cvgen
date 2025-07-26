import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const SleekTemplate = ({ 
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
    <div className="bg-white p-10 max-w-3xl mx-auto text-sm leading-relaxed">
      {/* Header with solid background - PDF reliable */}
      <header className="bg-slate-800 text-white p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <h2 className="text-xl text-slate-200 mb-6">{title}</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </a>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-slate-200">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 text-slate-200">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
          {linkedin && (
            <a 
              href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
              title="LinkedIn profil"
            >
              <Linkedin className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {github && (
            <a 
              href={github.startsWith('http') ? github : `https://${github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
              title="GitHub profil"
            >
              <Github className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Profile */}
      {profile && (
        <section className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
            <span className="w-1 h-6 bg-indigo-500 mr-3"></span>
            PROFIL
          </h3>
          <p className="text-slate-600 leading-relaxed pl-4">
            {profile}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center">
            <span className="w-1 h-6 bg-indigo-500 mr-3"></span>
            ERFARENHET
          </h3>
          <div className="space-y-6 pl-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-800">{job.title}</h4>
                    <p className="text-indigo-600 font-medium">{job.company}</p>
                  </div>
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1">{job.date}</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  {job.points?.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-indigo-500 mr-2 mt-1.5 text-xs">▸</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-10">
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center">
            <span className="w-1 h-6 bg-indigo-500 mr-3"></span>
            UTBILDNING
          </h3>
          <div className="space-y-4 pl-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-800">{edu.school}</h4>
                    <p className="text-slate-700">{edu.program}</p>
                  </div>
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1">{edu.year}</span>
                </div>
                {edu.description && (
                  <p className="text-sm text-slate-600">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.languages.length > 0 || skills.tools.length > 0) && (
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center">
            <span className="w-1 h-6 bg-indigo-500 mr-3"></span>
            FÄRDIGHETER
          </h3>
          <div className="grid grid-cols-2 gap-8 pl-4">
            {skills.languages.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                  Språk & Tekniker
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill, index) => (
                    <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.tools.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                  Verktyg & Ramverk
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool, index) => (
                    <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default SleekTemplate;