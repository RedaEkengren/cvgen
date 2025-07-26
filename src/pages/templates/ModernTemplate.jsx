import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ChevronRight } from 'lucide-react';

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
  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '40px',
      maxWidth: '768px',
      margin: '0 auto',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: 'Georgia, "Times New Roman", serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      paddingBottom: '40px',
      borderBottom: '4px solid #1e293b'
    },
    photo: {
      width: '144px',
      height: '144px',
      margin: '0 auto 24px',
      objectFit: 'cover',
      border: '8px solid #f1f5f9'
    },
    name: {
      fontSize: '48px',
      fontWeight: '300',
      color: '#0f172a',
      marginBottom: '8px',
      letterSpacing: '0.05em'
    },
    title: {
      fontSize: '24px',
      color: '#64748b',
      marginBottom: '32px',
      letterSpacing: '0.15em',
      textTransform: 'uppercase'
    },
    contactRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '32px',
      color: '#64748b',
      marginBottom: '16px'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    socialRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '16px'
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      marginBottom: '16px',
      textAlign: 'center'
    },
    profileSection: {
      marginBottom: '48px',
      textAlign: 'center'
    },
    profileText: {
      fontSize: '16px',
      color: '#475569',
      lineHeight: '1.8',
      maxWidth: '672px',
      margin: '0 auto'
    },
    experienceSection: {
      marginBottom: '48px'
    },
    experienceItem: {
      marginBottom: '40px'
    },
    experienceGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '24px',
      marginBottom: '16px'
    },
    dateColumn: {
      textAlign: 'right'
    },
    date: {
      color: '#64748b',
      fontWeight: '500'
    },
    jobTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: '4px'
    },
    company: {
      fontSize: '18px',
      color: '#64748b'
    },
    bulletPoints: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '24px'
    },
    bulletList: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    bulletItem: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#475569',
      marginBottom: '12px'
    },
    chevron: {
      width: '16px',
      height: '16px',
      marginTop: '2px',
      marginRight: '8px',
      color: '#94a3b8',
      flexShrink: 0
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px'
    },
    educationItem: {
      marginBottom: '24px'
    },
    educationSchool: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: '4px'
    },
    educationProgram: {
      color: '#475569',
      marginBottom: '4px'
    },
    educationYear: {
      fontSize: '14px',
      color: '#64748b'
    },
    educationDesc: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '8px'
    },
    skillsSection: {
      marginBottom: '24px'
    },
    skillCategory: {
      marginBottom: '24px'
    },
    skillSubtitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#475569',
      marginBottom: '12px'
    },
    skillContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    skillBadge: {
      padding: '4px 12px',
      backgroundColor: '#f1f5f9',
      color: '#475569',
      fontSize: '14px'
    },
    footer: {
      marginTop: '48px',
      paddingTop: '32px',
      borderTop: '2px solid #e2e8f0',
      textAlign: 'center'
    },
    footerText: {
      fontSize: '12px',
      color: '#94a3b8',
      letterSpacing: '0.15em',
      textTransform: 'uppercase'
    }
  };

  return (
    <div style={styles.container}>
      {/* Executive Header */}
      <header style={styles.header}>
        {photoUrl && (
          <img 
            src={photoUrl} 
            alt={name}
            style={styles.photo}
          />
        )}
        <h1 style={styles.name}>{name}</h1>
        <h2 style={styles.title}>{title}</h2>
        
        <div style={styles.contactRow}>
          <a 
            href={email.startsWith('mailto:') ? email : `mailto:${email}`}
            style={styles.contactLink}
          >
            <Mail style={{ width: '16px', height: '16px' }} />
            <span>{email}</span>
          </a>
          <div style={styles.contactItem}>
            <Phone style={{ width: '16px', height: '16px' }} />
            <span>{phone}</span>
          </div>
          <div style={styles.contactItem}>
            <MapPin style={{ width: '16px', height: '16px' }} />
            <span>{location}</span>
          </div>
        </div>
        
        <div style={styles.socialRow}>
          {linkedin && (
            <a 
              href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
            >
              <Linkedin style={{ width: '20px', height: '20px' }} />
              <span>LinkedIn</span>
            </a>
          )}
          {github && (
            <a 
              href={github.startsWith('http') ? github : `https://${github}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
            >
              <Github style={{ width: '20px', height: '20px' }} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      <section style={styles.profileSection}>
        <h3 style={styles.sectionTitle}>Executive Summary</h3>
        <p style={styles.profileText}>
          {profile}
        </p>
      </section>

      {/* Professional Experience */}
      <section style={styles.experienceSection}>
        <h3 style={{ ...styles.sectionTitle, marginBottom: '32px' }}>
          Professional Experience
        </h3>
        
        <div>
          {experience.map((job, index) => (
            <div key={index} style={styles.experienceItem}>
              <div style={styles.experienceGrid}>
                <div style={styles.dateColumn}>
                  <p style={styles.date}>{job.date}</p>
                </div>
                <div>
                  <h4 style={styles.jobTitle}>{job.title}</h4>
                  <p style={styles.company}>{job.company}</p>
                </div>
              </div>
              
              <div style={styles.bulletPoints}>
                <div></div>
                <div>
                  <ul style={styles.bulletList}>
                    {job.points.map((point, i) => (
                      <li key={i} style={styles.bulletItem}>
                        <ChevronRight style={styles.chevron} />
                        <span style={{ lineHeight: '1.6' }}>{point}</span>
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
      <div style={styles.bottomGrid}>
        {/* Education */}
        <section>
          <h3 style={styles.sectionTitle}>Education</h3>
          <div>
            {education.map((edu, index) => (
              <div key={index} style={styles.educationItem}>
                <h4 style={styles.educationSchool}>{edu.school}</h4>
                <p style={styles.educationProgram}>{edu.program}</p>
                <p style={styles.educationYear}>{edu.year}</p>
                {edu.description && (
                  <p style={styles.educationDesc}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 style={styles.sectionTitle}>Technical Expertise</h3>
          
          <div style={styles.skillsSection}>
            <div style={styles.skillCategory}>
              <h4 style={styles.skillSubtitle}>Languages & Technologies</h4>
              <div style={styles.skillContainer}>
                {skills.languages.map((skill, index) => (
                  <span key={index} style={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={styles.skillSubtitle}>Tools & Frameworks</h4>
              <div style={styles.skillContainer}>
                {skills.tools.map((tool, index) => (
                  <span key={index} style={styles.skillBadge}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Line */}
      <div style={styles.footer}>
        <p style={styles.footerText}>Curriculum Vitae</p>
      </div>
    </div>
  );
};

export default ModernTemplate;