import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Palette, Award } from 'lucide-react';

const GradientTemplateInline = ({ 
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
      backgroundColor: '#faf5ff',
      padding: '40px',
      maxWidth: '768px',
      margin: '0 auto',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    gradientHeader: {
      background: 'linear-gradient(135deg, #ec4899 0%, #7c3aed 50%, #6366f1 100%)',
      padding: '32px',
      margin: '-40px -40px 32px -40px',
      color: 'white'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    photoContainer: {
      position: 'relative'
    },
    photoWhiteBorder: {
      position: 'absolute',
      inset: '-4px',
      backgroundColor: 'white',
      opacity: 0.3
    },
    photo: {
      width: '128px',
      height: '128px',
      objectFit: 'cover',
      border: '4px solid white',
      position: 'relative'
    },
    name: {
      fontSize: '48px',
      fontWeight: '800',
      marginBottom: '12px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '300',
      color: '#fce7f3'
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginTop: '24px',
      fontSize: '14px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '8px 16px',
      transition: 'background-color 0.3s'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '8px 16px',
      color: 'white',
      textDecoration: 'none',
      transition: 'background-color 0.3s'
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px',
      justifyContent: 'flex-end'
    },
    socialLink: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      color: 'white',
      transition: 'background-color 0.3s'
    },
    profileSection: {
      marginBottom: '40px',
      backgroundColor: 'white',
      padding: '24px',
      borderLeft: '4px solid #7c3aed'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#7c3aed',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    icon: {
      width: '20px',
      height: '20px'
    },
    profileText: {
      color: '#374151',
      lineHeight: '1.8',
      fontSize: '16px'
    },
    experienceTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#7c3aed',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    experienceIcon: {
      width: '24px',
      height: '24px'
    },
    experienceCard: {
      background: 'linear-gradient(to right, #fce7f3, #e9d5ff)',
      padding: '24px',
      border: '2px solid #e9d5ff',
      marginBottom: '24px'
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
      color: '#ec4899',
      fontWeight: '600',
      fontSize: '18px'
    },
    dateBadge: {
      backgroundColor: 'white',
      padding: '8px 16px',
      color: '#7c3aed',
      fontWeight: '500'
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
    awardIcon: {
      width: '16px',
      height: '16px',
      marginTop: '2px',
      marginRight: '8px',
      color: '#ec4899',
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
      color: '#7c3aed',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    educationCard: {
      background: 'linear-gradient(135deg, #e0e7ff, #e9d5ff)',
      padding: '20px',
      border: '2px solid #e0e7ff',
      marginBottom: '16px'
    },
    educationSchool: {
      fontWeight: 'bold',
      color: '#6366f1'
    },
    educationProgram: {
      color: '#7c3aed',
      fontWeight: '500'
    },
    educationYear: {
      color: '#6366f1',
      fontSize: '14px',
      marginTop: '4px'
    },
    educationDesc: {
      color: '#4b5563',
      fontSize: '14px',
      marginTop: '8px'
    },
    skillsBox: {
      backgroundColor: 'white',
      padding: '20px',
      border: '2px solid #e9d5ff'
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
    skillSubtitle: {
      fontWeight: 'bold',
      color: '#ec4899',
      marginBottom: '12px'
    },
    skillSubtitleAlt: {
      color: '#6366f1'
    },
    skillContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px'
    },
    languageBadge: {
      background: 'linear-gradient(to right, #ec4899, #7c3aed)',
      color: 'white',
      padding: '4px 12px',
      fontSize: '14px',
      fontWeight: '500'
    },
    toolBadge: {
      background: 'linear-gradient(to right, #6366f1, #7c3aed)',
      color: 'white',
      padding: '4px 12px',
      fontSize: '14px',
      fontWeight: '500'
    },
    footer: {
      marginTop: '48px',
      textAlign: 'center'
    },
    footerLine: {
      height: '4px',
      background: 'linear-gradient(to right, #ec4899, #7c3aed, #6366f1)',
      marginBottom: '16px'
    },
    footerText: {
      color: '#7c3aed',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      {/* Gradient Header */}
      <header style={{ marginBottom: '48px' }}>
        <div style={styles.gradientHeader}>
          <div style={styles.headerContent}>
            {photoUrl && (
              <div style={styles.photoContainer}>
                <div style={styles.photoWhiteBorder}></div>
                <img 
                  src={photoUrl} 
                  alt={name}
                  style={styles.photo}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
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

      {/* Profile Section */}
      <section style={styles.profileSection}>
        <h3 style={styles.sectionTitle}>
          <Palette style={styles.icon} />
          About Me
        </h3>
        <p style={styles.profileText}>
          {profile}
        </p>
      </section>

      {/* Experience with Gradient Cards */}
      <section style={{ marginBottom: '40px' }}>
        <h3 style={styles.experienceTitle}>
          <Briefcase style={styles.experienceIcon} />
          Experience
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
                    <Award style={styles.awardIcon} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Layout */}
      <div style={styles.bottomGrid}>
        {/* Education */}
        <section>
          <h3 style={styles.educationTitle}>
            <GraduationCap style={styles.icon} />
            Education
          </h3>
          <div>
            {education.map((edu, index) => (
              <div key={index} style={styles.educationCard}>
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
          <h3 style={styles.skillsTitle}>Skills & Tools</h3>
          
          <div style={styles.skillsBox}>
            <div style={styles.skillCategory}>
              <h4 style={styles.skillSubtitle}>Languages</h4>
              <div style={styles.skillContainer}>
                {skills.languages.map((skill, index) => (
                  <span key={index} style={styles.languageBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ ...styles.skillSubtitle, ...styles.skillSubtitleAlt }}>Tools & Frameworks</h4>
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

      {/* Colorful Footer */}
      <div style={styles.footer}>
        <div style={styles.footerLine}></div>
        <p style={styles.footerText}>Let's create something colorful together!</p>
      </div>
    </div>
  );
};

export default GradientTemplateInline;