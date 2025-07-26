import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Circle } from 'lucide-react';

const ModernTemplate = ({ 
  name = "Anna Andersson",
  title = "Senior Frontend Developer",
  email = "anna.andersson@email.com",
  phone = "+46 70 123 45 67",
  location = "Stockholm, Sverige",
  linkedin = "linkedin.com/in/anna-andersson",
  github = "github.com/anna-andersson",
  photoUrl = null,
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
      {/* Premium Header Design */}
      <header className="mb-12 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-100 -z-10"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100 -z-10"></div>
        
        <div className="relative z-10 pt-8">
          <div className="flex items-start gap-8">
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={name}
                className="w-32 h-32 object-cover border-4 border-white"
                style={{ boxShadow: '0 0 0 2px #e5e7eb' }}
              />
            )}
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-3">{name}</h1>
              <h2 className="text-2xl text-purple-600 font-medium mb-6">{title}</h2>
              
              <div className="grid grid-cols-2 gap-3 text-gray-600">
                <a 
                  href={email.startsWith('mailto:') ? email : `mailto:${email}`}
                  className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span>{email}</span>
                </a>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-500" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-4">
                  {linkedin && (
                    <a 
                      href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-purple-500" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                  {github && (
                    <a 
                      href={github.startsWith('http') ? github : `https://${github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                    >
                      <Github className="w-4 h-4 text-purple-500" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section with Border */}
      <section className="mb-10 pb-10 border-b-2 border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-1 bg-purple-500"></div>
          <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider">Profil</h3>
        </div>
        <p className="text-gray-700 text-base leading-relaxed ml-16">
          {profile}
        </p>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-10">
        {/* Main Column - 2/3 width */}
        <div className="col-span-2">
          {/* Experience */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-purple-500"></div>
              <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider">Erfarenhet</h3>
            </div>
            
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-2 h-2 bg-purple-500"></div>
                  <div className="absolute left-0.5 top-4 w-0.5 h-full bg-gray-200"></div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                    <div className="flex items-center gap-3 text-gray-600 mb-2">
                      <span className="text-purple-600 font-medium">{job.company}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{job.date}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {job.points.map((point, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <Circle className="w-1.5 h-1.5 mt-2 mr-3 text-purple-400 fill-current flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-purple-500"></div>
              <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider">Utbildning</h3>
            </div>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="pl-8">
                  <h4 className="text-lg font-bold text-gray-900">{edu.school}</h4>
                  <p className="text-purple-600 font-medium mb-1">{edu.program}</p>
                  <p className="text-gray-500 text-sm mb-2">{edu.year}</p>
                  {edu.description && (
                    <p className="text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Side Column - 1/3 width */}
        <div>
          {/* Skills Section */}
          <section className="bg-gray-50 p-6 -mr-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-1 bg-purple-500"></div>
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">Färdigheter</h3>
            </div>
            
            <div className="mb-6">
              <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase">Språk & Tekniker</h4>
              <div className="space-y-2">
                {skills.languages.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase">Verktyg & Ramverk</h4>
              <div className="space-y-2">
                {skills.tools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400"></div>
                    <span className="text-gray-700">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;