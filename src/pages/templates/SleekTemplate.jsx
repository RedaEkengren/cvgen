import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ChevronRight } from 'lucide-react';

const SleekTemplate = ({ 
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
      {/* Executive Header */}
      <header className="text-center mb-10 pb-10 border-b-4 border-slate-900">
        {photoUrl && (
          <img 
            src={photoUrl} 
            alt={name}
            className="w-36 h-36 mx-auto mb-6 object-cover border-8 border-slate-100"
          />
        )}
        <h1 className="text-5xl font-light text-slate-900 mb-2 tracking-wide">{name}</h1>
        <h2 className="text-2xl text-slate-600 mb-8 tracking-widest uppercase">{title}</h2>
        
        <div className="flex justify-center gap-8 text-slate-600">
          <a 
            href={email.startsWith('mailto:') ? email : `mailto:${email}`}
            className="flex items-center gap-2 hover:text-slate-900 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </a>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          {linkedin && (
            <a 
              href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          )}
          {github && (
            <a 
              href={github.startsWith('http') ? github : `https://${github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mb-12 text-center">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Executive Summary</h3>
        <p className="text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
          {profile}
        </p>
      </section>

      {/* Professional Experience */}
      <section className="mb-12">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 text-center">
          Professional Experience
        </h3>
        
        <div className="space-y-10">
          {experience.map((job, index) => (
            <div key={index} className="group">
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div className="text-right">
                  <p className="text-slate-500 font-medium">{job.date}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-xl font-semibold text-slate-900 mb-1">{job.title}</h4>
                  <p className="text-lg text-slate-600">{job.company}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div></div>
                <div className="col-span-2">
                  <ul className="space-y-3">
                    {job.points.map((point, i) => (
                      <li key={i} className="flex items-start text-slate-700">
                        <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-slate-400 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-2 gap-12">
        {/* Education */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-6">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index}>
                <h4 className="text-base font-semibold text-slate-900">{edu.school}</h4>
                <p className="text-slate-700 mb-1">{edu.program}</p>
                <p className="text-sm text-slate-500">{edu.year}</p>
                {edu.description && (
                  <p className="text-sm text-slate-600 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-6">
            Technical Expertise
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Languages & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Tools & Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Line */}
      <div className="mt-12 pt-8 border-t-2 border-slate-200 text-center">
        <p className="text-xs text-slate-400 tracking-widest uppercase">Curriculum Vitae</p>
      </div>
    </div>
  );
};

export default SleekTemplate;