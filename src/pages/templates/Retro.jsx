import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Radio, Disc, Gamepad2, Music } from 'lucide-react';

const RetroTemplateInline = ({ 
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
      backgroundColor: '#fef3c7',
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
    retroPattern: {
      position: 'absolute',
      inset: '-40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: '4px',
      opacity: 0.2
    },
    patternSquare: (index) => ({
      height: '16px',
      backgroundColor: index % 3 === 0 ? '#ec4899' : index % 3 === 1 ? '#14b8a6' : '#f97316'
    }),
    mainHeader: {
      position: 'relative',
      backgroundColor: '#14b8a6',
      padding: '32px',
      margin: '-40px -40px 32px -40px',
      border: '8px solid #ec4899'
    },
    orangeBox: {
      backgroundColor: '#f97316',
      padding: '24px',
      margin: '-24px -24px 24px -24px'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    photoContainer: {
      position: 'relative'
    },
    photo: {
      width: '128px',
      height: '128px',
      objectFit: 'cover',
      border: '4px solid #ec4899',
      filter: 'saturate(1.5) contrast(1.2)'
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
    name: {
      fontSize: '60px',
      fontWeight: '900',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      textShadow: '4px 4px 0 #ec4899'
    },
    titleRow: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#fce7f3',
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    radioIcon: {
      width: '24px',
      height: '24px'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      color: 'white'
    },
    emailBox: {
      backgroundColor: '#ec4899',
      padding: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      textDecoration: 'none',
      color: 'white',
      transition: 'background-color 0.3s'
    },
    phoneBox: {
      backgroundColor: '#f97316',
      padding: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    locationBox: {
      backgroundColor: '#14b8a6',
      padding: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    socialBox: {
      backgroundColor: '#7c3aed',
      padding: '12px',
      textAlign: 'center',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    },
    socialLink: {
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    profileSection: {
      marginBottom: '40px',
      backgroundColor: '#fbcfe8',
      padding: '24px',
      border: '4px solid #ec4899'
    },
    profileTitle: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#be185d',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    discIcon: {
      width: '24px',
      height: '24px'
    },
    profileText: {
      color: '#1f2937',
      lineHeight: '1.8',
      fontWeight: '500'
    },
    experienceTitle: {
      fontSize: '30px',
      fontWeight: '900',
      color: '#0f766e',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textShadow: '2px 2px 0 #f97316'
    },
    gamepadIcon: {
      width: '32px',
      height: '32px'
    },
    experienceCard: {
      backgroundColor: '#5eead4',
      border: '4px solid #14b8a6',
      padding: '24px',
      marginBottom: '24px'
    },
    jobHeader: {
      backgroundColor: '#f97316',
      margin: '-24px -24px 16px -24px',
      padding: '16px'
    },
    jobHeaderContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    jobTitle: {
      fontSize: '20px',
      fontWeight: '900',
      color: 'white',
      textTransform: 'uppercase'
    },
    company: {
      color: '#fce7f3',
      fontWeight: 'bold',
      fontSize: '18px'
    },
    dateBadge: {
      backgroundColor: '#ec4899',
      color: 'white',
      padding: '8px 16px',
      fontWeight: 'bold'
    },
    bulletList: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    bulletItem: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#1f2937',
      fontWeight: '500',
      marginBottom: '8px'
    },
    bulletArrow: {
      color: '#f97316',
      marginRight: '8px',
      fontSize: '18px'
    },
    bottomGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    educationTitle: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#ea580c',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    musicIcon: {
      width: '24px',
      height: '24px'
    },
    educationCard: {
      backgroundColor: '#c084fc',
      border: '4px solid #7c3aed',
      padding: '16px',
      marginBottom: '16px'
    },
    educationSchool: {
      fontWeight: '900',
      color: '#581c87',
      textTransform: 'uppercase'
    },
    educationProgram: {
      color: '#7c3aed',
      fontWeight: 'bold'
    },
    educationYear: {
      color: '#6b21a8',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    skillsTitle: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#be185d',
      marginBottom: '16px'
    },
    skillsSection: {
      marginBottom: '16px'
    },
    weaponsBox: {
      backgroundColor: '#fdba74',
      border: '4px solid #ea580c',
      padding: '16px',
      marginBottom: '16px'
    },
    itemsBox: {
      backgroundColor: '#5eead4',
      border: '4px solid #14b8a6',
      padding: '16px'
    },
    skillSubtitle: {
      fontWeight: '900',
      color: '#7c2d12',
      marginBottom: '8px'
    },
    skillSubtitleAlt: {
      color: '#0f766e'
    },
    skillGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px'
    },
    skillBadge: {
      backgroundColor: '#ea580c',
      color: 'white',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    skillBadgeAlt: {
      backgroundColor: '#14b8a6'
    },
    footer: {
      marginTop: '48px',
      backgroundColor: '#ec4899',
      padding: '16px',
      margin: '32px -40px -40px -40px',
      textAlign: 'center'
    },
    footerText: {
      color: 'white',
      fontWeight: '900',
      fontSize: '18px'
    }
  };

  // Generate retro pattern
  const patternSquares = [];
  for (let i = 0; i < 48; i++) {
    patternSquares.push(
      <div key={i} style={styles.patternSquare(i)}></div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Retro 80s Header */}
      <header style={styles.header}>
        <div style={styles.retroPattern}>
          {patternSquares}
        </div>
        
        <div style={styles.mainHeader}>
          <div style={styles.orangeBox}>
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
              <div style={{ flex: 1 }}>
                <h1 style={styles.name}>
                  {name}
                </h1>
                <h2 style={styles.titleRow}>
                  <Radio style={styles.radioIcon} />
                  {title}
                </h2>
              </div>
            </div>
          </div>
          
          <div style={styles.contactGrid}>
            <a 
              href={email.startsWith('mailto:') ? email : `mailto:${email}`}
              style={styles.emailBox}
            >
              <Mail style={{ width: '16px', height: '16px' }} />
              {email}
            </a>
            <div style={styles.phoneBox}>
              <Phone style={{ width: '16px', height: '16px' }} />
              {phone}
            </div>
            <div style={styles.locationBox}>
              <MapPin style={{ width: '16px', height: '16px' }} />
              {location}
            </div>
            <div style={styles.socialBox}>
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
        </div>
      </header>

      {/* Profile with Retro Style */}
      <section style={styles.profileSection}>
        <h3 style={styles.profileTitle}>
          <Disc style={styles.discIcon} />
          PLAYER PROFILE
        </h3>
        <p style={styles.profileText}>
          {profile}
        </p>
      </section>

      {/* Experience Arcade Style */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={styles.experienceTitle}>
          <Gamepad2 style={styles.gamepadIcon} />
          LEVEL EXPERIENCE
        </h3>
        
        <div>
          {experience.map((job, index) => (
            <div key={index} style={styles.experienceCard}>
              <div style={styles.jobHeader}>
                <div style={styles.jobHeaderContent}>
                  <div>
                    <h4 style={styles.jobTitle}>{job.title}</h4>
                    <p style={styles.company}>{job.company}</p>
                  </div>
                  <span style={styles.dateBadge}>
                    {job.date}
                  </span>
                </div>
              </div>
              
              <ul style={styles.bulletList}>
                {job.points.map((point, i) => (
                  <li key={i} style={styles.bulletItem}>
                    <span style={styles.bulletArrow}>▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Retro Grid Layout */}
      <div style={styles.bottomGrid}>
        {/* Education */}
        <section>
          <h3 style={styles.educationTitle}>
            <Music style={styles.musicIcon} />
            HIGH SCORES
          </h3>
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
          <h3 style={styles.skillsTitle}>POWER-UPS</h3>
          
          <div>
            <div style={styles.weaponsBox}>
              <h4 style={styles.skillSubtitle}>WEAPONS</h4>
              <div style={styles.skillGrid}>
                {skills.languages.map((skill, index) => (
                  <span key={index} style={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={styles.itemsBox}>
              <h4 style={{ ...styles.skillSubtitle, ...styles.skillSubtitleAlt }}>SPECIAL ITEMS</h4>
              <div style={styles.skillGrid}>
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

      {/* Retro Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>GAME OVER - INSERT COIN TO CONTINUE</p>
      </div>
    </div>
  );
};

export default RetroTemplateInline;