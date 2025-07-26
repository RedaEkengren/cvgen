import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Zap, Rocket, Target, Sparkles } from 'lucide-react';

const CreativeTemplateInline = ({ 
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
      marginBottom: '48px',
      position: 'relative'
    },
    decorativeBox1: {
      position: 'absolute',
      top: '-16px',
      left: '-16px',
      width: '64px',
      height: '64px',
      backgroundColor: '#fef3c7'
    },
    decorativeBox2: {
      position: 'absolute',
      top: '-16px',
      right: '-16px',
      width: '64px',
      height: '64px',
      backgroundColor: '#fce7f3'
    },
    headerContent: {
      textAlign: 'center',
      paddingTop: '32px'
    },
    photoContainer: {
      position: 'relative',
      display: 'inline-block',
      marginBottom: '24px'
    },
    photo: {
      width: '128px',
      height: '128px',
      objectFit: 'cover',
      border: '4px solid white',
      position: 'relative',
      zIndex: 10
    },
    photoShadow: {
      position: 'absolute',
      bottom: '-8px',
      right: '-8px',
      width: '128px',
      height: '128px',
      backgroundColor: '#5eead4',
      zIndex: -10
    },
    greeting: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px'
    },
    nameHighlight: {
      color: '#14b8a6'
    },
    titleContainer: {
      fontSize: '20px',
      color: '#6b7280',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    sparkle: {
      width: '20px',
      height: '20px',
      color: '#eab308'
    },
    contactContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      marginBottom: '16px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      fontSize: '14px'
    },
    emailBox: {
      backgroundColor: '#5eead4',
      color: '#0f766e'
    },
    phoneBox: {
      backgroundColor: '#fce7f3',
      color: '#be185d'
    },
    locationBox: {
      backgroundColor: '#fef3c7',
      color: '#a16207'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '16px'
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6b7280',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    aboutSection: {
      marginBottom: '40px',
      background: 'linear-gradient(to right, #f0fdfa, #fce7f3)',
      padding: '24px',
      border: '2px solid #5eead4'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    icon: {
      width: '20px',
      height: '20px',
      color: '#14b8a6'
    },
    profileText: {
      color: '#374151',
      lineHeight: '1.8'
    },
    journeySection: {
      marginBottom: '40px'
    },
    journeyTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    rocketIcon: {
      width: '24px',
      height: '24px',
      color: '#ec4899'
    },
    experienceCard: {
      position: 'relative',
      marginBottom: '32px'
    },
    numberBadge: {
      position: 'absolute',
      left: '-48px',
      top: '0',
      width: '32px',
      height: '32px',
      backgroundColor: '#14b8a6',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    experienceContent: {
      border: '2px solid #e5e7eb',
      padding: '24px',
      backgroundColor: '#f9fafb'
    },
    experienceTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827'
    },
    experienceCompany: {
      color: '#14b8a6',
      fontWeight: '600',
      marginBottom: '4px'
    },
    experienceDate: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '16px'
    },
    bulletList: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    bulletItem: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#374151',
      marginBottom: '8px'
    },
    zapIcon: {
      width: '16px',
      height: '16px',
      marginTop: '2px',
      marginRight: '8px',
      color: '#eab308',
      flexShrink: 0
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    educationBox: {
      backgroundColor: '#fef3c7',
      border: '2px solid #facc15',
      padding: '16px',
      marginBottom: '16px'
    },
    educationSchool: {
      fontWeight: 'bold',
      color: '#111827'
    },
    educationProgram: {
      color: '#374151'
    },
    educationYear: {
      fontSize: '14px',
      color: '#6b7280'
    },
    skillsSection: {
      marginBottom: '16px'
    },
    skillBox: {
      border: '2px solid #ec4899',
      padding: '16px',
      marginBottom: '16px'
    },
    skillBoxAlt: {
      border: '2px solid #14b8a6',
      backgroundColor: '#f0fdfa'
    },
    skillTitle: {
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: '8px'
    },
    skillContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    skillBadge: {
      backgroundColor: 'white',
      padding: '4px 12px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      border: '1px solid #ec4899'
    },
    skillBadgeAlt: {
      border: '1px solid #14b8a6'
    },
    footer: {
      marginTop: '48px',
      textAlign: 'center'
    },
    footerText: {
      color: '#6b7280',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Playful Header */}
      <header style={styles.header}>
        <div style={styles.decorativeBox1}></div>
        <div style={styles.decorativeBox2}></div>
        
        <div style={styles.headerContent}>
          {photoUrl && (
            <div style={styles.photoContainer}>
              <img 
                src={photoUrl} 
                alt={name}
                style={styles.photo}
              />
              <div style={styles.photoShadow}></div>
            </div>
          )}
          
          <h1 style={styles.greeting}>
            Hi, I'm <span style={styles.nameHighlight}>{name}</span>!
          </h1>
          <h2 style={styles.titleContainer}>
            <Sparkles style={styles.sparkle} />
            {title}
            <Sparkles style={styles.sparkle} />
          </h2>
          
          <div style={styles.contactContainer}>
            <a 
              href={email.startsWith('mailto:') ? email : `mailto:${email}`}
              style={{ ...styles.contactItem, ...styles.emailBox, textDecoration: 'none' }}
            >
              <Mail style={{ width: '16px', height: '16px' }} />
              <span>{email}</span>
            </a>
            <div style={{ ...styles.contactItem, ...styles.phoneBox }}>
              <Phone style={{ width: '16px', height: '16px' }} />
              <span>{phone}</span>
            </div>
            <div style={{ ...styles.contactItem, ...styles.locationBox }}>
              <MapPin style={{ width: '16px', height: '16px' }} />
              <span>{location}</span>
            </div>
          </div>
          
          <div style={styles.socialLinks}>
            {linkedin && (
              <a 
                href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                <Linkedin style={{ width: '20px', height: '20px' }} />
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
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About Me Box */}
      <section style={styles.aboutSection}>
        <h3 style={styles.sectionTitle}>
          <Target style={styles.icon} />
          About Me
        </h3>
        <p style={styles.profileText}>
          {profile}
        </p>
      </section>

      {/* Experience with Fun Icons */}
      <section style={styles.journeySection}>
        <h3 style={styles.journeyTitle}>
          <Rocket style={styles.rocketIcon} />
          My Journey
        </h3>
        
        <div>
          {experience.map((job, index) => (
            <div key={index} style={styles.experienceCard}>
              <div style={styles.numberBadge}>{index + 1}</div>
              
              <div style={styles.experienceContent}>
                <h4 style={styles.experienceTitle}>{job.title}</h4>
                <p style={styles.experienceCompany}>{job.company}</p>
                <p style={styles.experienceDate}>{job.date}</p>
                
                <ul style={styles.bulletList}>
                  {job.points.map((point, i) => (
                    <li key={i} style={styles.bulletItem}>
                      <Zap style={styles.zapIcon} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Skills in Colorful Boxes */}
      <div style={styles.bottomGrid}>
        {/* Education */}
        <section>
          <h3 style={{ ...styles.sectionTitle, marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>🎓</span>
            Education
          </h3>
          <div>
            {education.map((edu, index) => (
              <div key={index} style={styles.educationBox}>
                <h4 style={styles.educationSchool}>{edu.school}</h4>
                <p style={styles.educationProgram}>{edu.program}</p>
                <p style={styles.educationYear}>{edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 style={{ ...styles.sectionTitle, marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            Skills
          </h3>
          
          <div>
            <div style={{ ...styles.skillBox, backgroundColor: '#fce7f3' }}>
              <h4 style={styles.skillTitle}>Languages</h4>
              <div style={styles.skillContainer}>
                {skills.languages.map((skill, index) => (
                  <span key={index} style={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ ...styles.skillBox, ...styles.skillBoxAlt }}>
              <h4 style={styles.skillTitle}>Tools</h4>
              <div style={styles.skillContainer}>
                {skills.tools.map((tool, index) => (
                  <span key={index} style={{ ...styles.skillBadge, ...styles.skillBadgeAlt }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fun Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>✨ Let's create something amazing together! ✨</p>
      </div>
    </div>
  );
};

export default CreativeTemplateInline;