import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Zap, Code, Cpu, Terminal } from 'lucide-react';

const NeonTemplateInline = ({ 
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
      backgroundColor: '#000000',
      padding: '40px',
      maxWidth: '768px',
      margin: '0 auto',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: '"Courier New", Courier, monospace'
    },
    header: {
      marginBottom: '48px',
      position: 'relative'
    },
    purpleGlow: {
      position: 'absolute',
      top: '-40px',
      left: '-40px',
      width: '160px',
      height: '160px',
      backgroundColor: '#7c3aed',
      opacity: '0.3'
    },
    cyanGlow: {
      position: 'absolute',
      top: '-40px',
      right: '-40px',
      width: '160px',
      height: '160px',
      backgroundColor: '#06b6d4',
      opacity: '0.3'
    },
    neonBox: {
      position: 'relative',
      backgroundColor: '#111827',
      border: '2px solid #06b6d4',
      padding: '32px',
      margin: '-40px -40px 32px -40px'
    },
    photoContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px'
    },
    photo: {
      width: '112px',
      height: '112px',
      objectFit: 'cover',
      border: '4px solid #06b6d4',
      filter: 'contrast(1.1)'
    },
    nameGradient: {
      fontSize: '48px',
      fontWeight: '900',
      background: 'linear-gradient(to right, #06b6d4, #7c3aed)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent'
    },
    titleRow: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#67e8f9',
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    terminalIcon: {
      width: '24px',
      height: '24px'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginTop: '24px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#d1d5db'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#d1d5db',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    cyanIcon: {
      width: '16px',
      height: '16px',
      color: '#06b6d4'
    },
    purpleIcon: {
      width: '16px',
      height: '16px',
      color: '#7c3aed'
    },
    profileSection: {
      marginBottom: '40px',
      borderLeft: '4px solid #06b6d4',
      paddingLeft: '24px',
      backgroundColor: '#111827',
      padding: '24px',
      marginLeft: '-40px',
      marginRight: '-40px'
    },
    profileTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#06b6d4',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    profileText: {
      color: '#d1d5db',
      lineHeight: '1.8'
    },
    experienceTitle: {
      fontSize: '32px',
      fontWeight: '900',
      background: 'linear-gradient(to right, #7c3aed, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cpuIcon: {
      width: '24px',
      height: '24px',
      color: '#7c3aed'
    },
    experienceCard: {
      backgroundColor: '#111827',
      border: '1px solid #7c3aed',
      padding: '24px',
      marginBottom: '32px'
    },
    jobHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    jobTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#7c3aed'
    },
    company: {
      color: '#67e8f9',
      fontWeight: '600'
    },
    dateBadge: {
      color: '#9ca3af',
      backgroundColor: '#000000',
      padding: '4px 12px',
      border: '1px solid #374151'
    },
    bulletList: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    bulletItem: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#d1d5db',
      marginBottom: '8px'
    },
    zapIcon: {
      width: '16px',
      height: '16px',
      marginTop: '2px',
      marginRight: '8px',
      color: '#06b6d4',
      flexShrink: 0
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    educationTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#06b6d4',
      marginBottom: '16px'
    },
    educationCard: {
      backgroundColor: '#111827',
      border: '1px solid #06b6d4',
      padding: '16px',
      marginBottom: '16px'
    },
    educationSchool: {
      fontWeight: 'bold',
      color: '#7c3aed'
    },
    educationProgram: {
      color: '#67e8f9'
    },
    educationYear: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '4px'
    },
    skillsTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#7c3aed',
      marginBottom: '16px'
    },
    skillCategory: {
      marginBottom: '16px'
    },
    skillLabel: {
      color: '#67e8f9',
      fontFamily: 'monospace',
      marginBottom: '8px'
    },
    skillContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    languageBadge: {
      backgroundColor: '#000000',
      border: '1px solid #06b6d4',
      color: '#67e8f9',
      padding: '4px 12px',
      fontFamily: 'monospace',
      fontSize: '12px'
    },
    toolBadge: {
      backgroundColor: '#000000',
      border: '1px solid #7c3aed',
      color: '#a78bfa',
      padding: '4px 12px',
      fontFamily: 'monospace',
      fontSize: '12px'
    },
    footer: {
      marginTop: '48px',
      textAlign: 'center',
      borderTop: '1px solid #374151',
      paddingTop: '24px'
    },
    footerText: {
      color: '#4b5563',
      fontFamily: 'monospace',
      fontSize: '12px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Neon Header */}
      <header style={styles.header}>
        <div style={styles.purpleGlow}></div>
        <div style={styles.cyanGlow}></div>
        
        <div style={styles.neonBox}>
          <div style={styles.photoContainer}>
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={name}
                style={styles.photo}
              />
            )}
            <div style={{ flex: 1 }}>
              <h1 style={styles.nameGradient}>
                {name}
              </h1>
              <h2 style={styles.titleRow}>
                <Terminal style={styles.terminalIcon} />
                {title}
              </h2>
            </div>
          </div>
          
          <div style={styles.contactGrid}>
            <a 
              href={email.startsWith('mailto:') ? email : `mailto:${email}`}
              style={styles.contactLink}
            >
              <Mail style={styles.cyanIcon} />
              <span>{email}</span>
            </a>
            <div style={styles.contactItem}>
              <Phone style={styles.purpleIcon} />
              <span>{phone}</span>
            </div>
            <div style={styles.contactItem}>
              <MapPin style={styles.cyanIcon} />
              <span>{location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {linkedin && (
                <a 
                  href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.contactLink}
                >
                  <Linkedin style={{ width: '16px', height: '16px' }} />
                </a>
              )}
              {github && (
                <a 
                  href={github.startsWith('http') ? github : `https://${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.contactLink}
                >
                  <Github style={{ width: '16px', height: '16px' }} />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile with Neon Border */}
      <section style={styles.profileSection}>
        <h3 style={styles.profileTitle}>
          <Code style={{ width: '20px', height: '20px' }} />
          SYSTEM.PROFILE
        </h3>
        <p style={styles.profileText}>
          {profile}
        </p>
      </section>

      {/* Experience Section */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={styles.experienceTitle}>
          <Cpu style={styles.cpuIcon} />
          WORK.EXPERIENCE
        </h3>
        
        <div>
          {experience.map((job, index) => (
            <div key={index} style={styles.experienceCard}>
              <div style={styles.jobHeader}>
                <div>
                  <h4 style={styles.jobTitle}>{job.title}</h4>
                  <p style={styles.company}>{job.company}</p>
                </div>
                <span style={styles.dateBadge}>
                  {job.date}
                </span>
              </div>
              
              <ul style={styles.bulletList}>
                {job.points.map((point, i) => (
                  <li key={i} style={styles.bulletItem}>
                    <Zap style={styles.zapIcon} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills Grid */}
      <div style={styles.bottomGrid}>
        {/* Education */}
        <section>
          <h3 style={styles.educationTitle}>EDUCATION.LOG</h3>
          <div>
            {education.map((edu, index) => (
              <div key={index} style={styles.educationCard}>
                <h4 style={styles.educationSchool}>{edu.school}</h4>
                <p style={styles.educationProgram}>{edu.program}</p>
                <p style={styles.educationYear}>{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 style={styles.skillsTitle}>SKILLS.ARRAY</h3>
          <div>
            <div style={styles.skillCategory}>
              <h4 style={styles.skillLabel}>[Languages]</h4>
              <div style={styles.skillContainer}>
                {skills.languages.map((skill, index) => (
                  <span key={index} style={styles.languageBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={styles.skillLabel}>[Tools]</h4>
              <div style={styles.skillContainer}>
                {skills.tools.map((tool, index) => (
                  <span key={index} style={styles.toolBadge}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>// END OF FILE - CV.EXECUTED SUCCESSFULLY</p>
      </div>
    </div>
  );
};

export default NeonTemplateInline;