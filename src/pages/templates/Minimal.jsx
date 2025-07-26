import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const MinimalTemplateInline = ({ 
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
  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '40px',
      maxWidth: '768px',
      margin: '0 auto',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      marginBottom: '64px'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px'
    },
    photo: {
      width: '80px',
      height: '80px',
      objectFit: 'cover'
    },
    name: {
      fontSize: '30px',
      fontWeight: '300',
      color: '#000000',
      marginBottom: '4px'
    },
    title: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '24px'
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      fontSize: '12px',
      color: '#6b7280'
    },
    contactLink: {
      color: '#6b7280',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    sectionSpacing: {
      marginBottom: '48px'
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#000000',
      marginBottom: '24px',
      textTransform: 'uppercase'
    },
    profileText: {
      color: '#374151',
      lineHeight: '1.8'
    },
    experienceItem: {
      marginBottom: '32px'
    },
    experienceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '12px'
    },
    jobTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#000000'
    },
    company: {
      fontSize: '12px',
      color: '#6b7280'
    },
    date: {
      fontSize: '12px',
      color: '#9ca3af',
      whiteSpace: 'nowrap'
    },
    bulletList: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    bulletItem: {
      fontSize: '12px',
      color: '#374151',
      lineHeight: '1.6',
      marginBottom: '4px'
    },
    educationItem: {
      marginBottom: '16px'
    },
    educationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px'
    },
    educationSchool: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#000000'
    },
    educationProgram: {
      fontSize: '12px',
      color: '#6b7280'
    },
    educationYear: {
      fontSize: '12px',
      color: '#9ca3af'
    },
    educationDesc: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '4px'
    },
    skillsRow: {
      display: 'flex',
      gap: '48px'
    },
    skillCategory: {
      flex: 1
    },
    skillLabel: {
      fontSize: '12px',
      color: '#9ca3af',
      marginBottom: '8px'
    },
    skillList: {
      fontSize: '12px',
      color: '#374151'
    }
  };

  return (
    <div style={styles.container}>
      {/* Ultra Minimal Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {photoUrl && (
            <img 
              src={photoUrl} 
              alt={name}
              style={styles.photo}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={styles.name}>{name}</h1>
            <h2 style={styles.title}>{title}</h2>
            
            <div style={styles.contactRow}>
              <a 
                href={email.startsWith('mailto:') ? email : `mailto:${email}`}
                style={styles.contactLink}
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
                  style={styles.contactLink}
                >
                  LinkedIn
                </a>
              )}
              {github && (
                <a 
                  href={github.startsWith('http') ? github : `https://${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.contactLink}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Clean Content */}
      <div>
        {/* Profile */}
        <section style={styles.sectionSpacing}>
          <p style={styles.profileText}>
            {profile}
          </p>
        </section>

        {/* Experience */}
        <section style={styles.sectionSpacing}>
          <h3 style={styles.sectionTitle}>EXPERIENCE</h3>
          <div>
            {experience.map((job, index) => (
              <div key={index} style={styles.experienceItem}>
                <div style={styles.experienceHeader}>
                  <div>
                    <h4 style={styles.jobTitle}>{job.title}</h4>
                    <p style={styles.company}>{job.company}</p>
                  </div>
                  <span style={styles.date}>{job.date}</span>
                </div>
                <ul style={styles.bulletList}>
                  {job.points.map((point, i) => (
                    <li key={i} style={styles.bulletItem}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={styles.sectionSpacing}>
          <h3 style={styles.sectionTitle}>EDUCATION</h3>
          <div>
            {education.map((edu, index) => (
              <div key={index} style={styles.educationItem}>
                <div style={styles.educationHeader}>
                  <div>
                    <h4 style={styles.educationSchool}>{edu.school}</h4>
                    <p style={styles.educationProgram}>{edu.program}</p>
                  </div>
                  <span style={styles.educationYear}>{edu.year}</span>
                </div>
                {edu.description && (
                  <p style={styles.educationDesc}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 style={styles.sectionTitle}>SKILLS</h3>
          <div style={styles.skillsRow}>
            <div style={styles.skillCategory}>
              <p style={styles.skillLabel}>Languages</p>
              <p style={styles.skillList}>{skills.languages.join(' · ')}</p>
            </div>
            <div style={styles.skillCategory}>
              <p style={styles.skillLabel}>Tools</p>
              <p style={styles.skillList}>{skills.tools.join(' · ')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinimalTemplateInline;