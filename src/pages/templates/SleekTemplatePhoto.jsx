import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const SleekTemplatePhoto = ({ 
  name = "Anna Andersson",
  title = "Frontend Developer",
  email = "anna.andersson@email.com",
  phone = "+46 70 123 45 67",
  location = "Stockholm, Sverige",
  linkedin = "linkedin.com/in/anna-andersson",
  github = "github.com/anna-andersson",
  photoUrl = "https://via.placeholder.com/150",
  profile = "Passionerad frontendutvecklare med 5 års erfarenhet av att bygga användarvänliga webbapplikationer. Specialiserad på React och modern JavaScript med fokus på prestanda och tillgänglighet.",
  experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions AB",
      date: "2022 - Nuvarande",
      points: [
        "Leder utvecklingen av en ny e-handelsplattform med React och TypeScript",
        "Implementerade en komponentbibliotek som minskade utvecklingstiden med 40%",
        "Mentorskap för juniora utvecklare och code reviews"
      ]
    },
    {
      title: "Frontend Developer", 
      company: "Digital Agency",
      date: "2019 - 2022",
      points: [
        "Utvecklade responsiva webbapplikationer för 20+ kunder",
        "Optimerade prestanda vilket resulterade i 60% snabbare laddningstider",
        "Arbetade agilt i tvärfunktionella team"
      ]
    }
  ],
  education = [
    {
      school: "KTH Kungliga Tekniska Högskolan",
      program: "Civilingenjör Datateknik",
      year: "2014 - 2019",
      description: "Inriktning mot mjukvaruutveckling och människa-datorinteraktion"
    }
  ],
  skills = {
    languages: ["JavaScript", "TypeScript", "HTML/CSS", "Python"],
    tools: ["React", "Next.js", "Node.js", "Git", "Figma", "Jest"]
  }
}) => {
  return (
    <div className="bg-white p-10 max-w-3xl mx-auto text-sm leading-relaxed">
      {/* Header with photo */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex gap-6 items-start">
          {/* Photo */}
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={name}
              className="w-24 h-24 object-cover border-2 border-gray-200"
            />
          )}
          
          {/* Header content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{title}</h2>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <a 
                href={email.startsWith('mailto:') ? email : `mailto:${email}`}
                className="hover:text-gray-900 transition-colors"
              >
                {email}
              </a>
              <span>{phone}</span>
              <span>{location}</span>
              {linkedin && (
                <a 
                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors flex items-center gap-1"
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
                  className="hover:text-gray-900 transition-colors flex items-center gap-1"
                >
                  <Github className="w-4 h-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Profil
        </h3>
        <p className="text-gray-700">
          {profile}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Erfarenhet
        </h3>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{job.title}</h4>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span className="text-gray-500 whitespace-nowrap">{job.date}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-0">
                {job.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Utbildning
        </h3>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{edu.school}</h4>
                  <p className="text-gray-700">{edu.program}</p>
                </div>
                <span className="text-gray-500">{edu.year}</span>
              </div>
              {edu.description && (
                <p className="text-gray-600 mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Färdigheter
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 uppercase">Språk & Tekniker</h4>
            <ul className="space-y-1">
              {skills.languages.map((skill, index) => (
                <li key={index} className="text-gray-700">{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 uppercase">Verktyg & Ramverk</h4>
            <ul className="space-y-1">
              {skills.tools.map((tool, index) => (
                <li key={index} className="text-gray-700">{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SleekTemplatePhoto;