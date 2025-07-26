import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Star } from 'lucide-react';

const BoldTemplate = ({ 
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
  // Define all styles as objects
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
    blackHeader: {
      backgroundColor: '#000000',
      color: 'white',
      padding: '32px',
      margin: '-40px -40px 32px -40px'
    },
    photoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    photo: {
      width: '96px',
      height: '96px',
      objectFit: 'cover',
      border: '4px solid white'
    },
    nameHeader: {
      fontSize: '48px',
      fontWeight: '900',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    titleHeader: {
      fontSize: '20px',
      fontWeight: '300',
      color: '#e5e5e5'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      padding: '0 32px',
      color: '#000000'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#000000',
      textDecoration: 'none',
      fontSize: '12px'
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      padding: '0 32px',
      marginTop: '8px'
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#000000',
      textDecoration: 'none',
      fontSize: '12px'
    },
    profileSection: {
      backgroundColor: '#f3f4f6',
      padding: '24px',
      margin: '0 -40px 32px -40px'
    },
    profileText: {
      fontSize: '16px',
      color: '#374151',
      fontWeight: '500',
      lineHeight: '1.8'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: '900',
      marginBottom: '24px',
      color: '#000000',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    experienceCard: {
      borderLeft: '4px solid #000000',
      paddingLeft: '24px',
      marginBottom: '32px'
    },
    jobTitle: {
      fontSize: '18px',
      fontWeight: '900',
      color: '#000000',
      textTransform: 'uppercase',
      marginBottom: '4px'
    },
    company: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#6b7280',
      marginBottom: '4px'
    },
    date: {
      fontSize: '14px',
      color: '#9ca3af',
      marginBottom: '16px'
    },
    bulletPoint: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#374151',
      marginBottom: '8px',
      fontSize: '14px'
    },
    star: {
      width: '12px',
      height: '12px',
      marginTop: '4px',
      marginRight: '8px',
      fill: '#000000',
      flexShrink: 0
    },
    twoColumnGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    educationCard: {
      backgroundColor: '#000000',
      color: 'white',
      padding: '16px',
      marginBottom: '16px'
    },
    educationSchool: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    educationProgram: {
      fontSize: '14px',
      color: '#e5e5e5',
      marginBottom: '4px'
    },
    educationYear: {
      fontSize: '12px',
      color: '#d1d5db'
    },
    skillCategory: {
      marginBottom: '16px'
    },
    skillTitle: {
      fontSize: '14px',
      fontWeight: '900',
      color: '#000000',
      marginBottom: '8px',
      textTransform: 'uppercase'
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px'
    },
    skillBadge: {
      backgroundColor: '#000000',
      color: 'white',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    toolBadge: {
      backgroundColor: '#e5e7eb',
      color: '#000000',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      {/* Bold Header with Black Background */}
      <header style={{ marginBottom: '32px' }}>
        <div style={styles.blackHeader}>
          <div style={styles.photoContainer}>
            {photoUrl && (
              <img 
                src={photoUrl} 
                alt={name}
                style={styles.photo}
              />
            )}
            <div style={{ flex: 1 }}>
              <h1 style={styles.nameHeader}>{name.toUpperCase()}</h1>
              <h2 style={styles.titleHeader}>{title}</h2>
            </div>
          </div>
        </div>
        
        <div style={styles.contactGrid}>
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
        
        <div style={styles.socialLinks}>
          {linkedin && (
            <a 
              href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink}
            >
              <Linkedin style={{ width: '16px', height: '16px' }} />
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
              <Github style={{ width: '16px', height: '16px' }} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Bold Content Sections */}
      <div>
        {/* Profile with Background */}
        <section style={styles.profileSection}>
          <p style={styles.profileText}>
            {profile}
          </p>
        </section>

        {/* Experience with Bold Headers */}
        <section style={{ marginBottom: '32px' }}>
          <h3 style={styles.sectionTitle}>EXPERIENCE</h3>
          <div>
            {experience.map((job, index) => (
              <div key={index} style={styles.experienceCard}>
                <h4 style={styles.jobTitle}>{job.title.toUpperCase()}</h4>
                <p style={styles.company}>{job.company}</p>
                <p style={styles.date}>{job.date}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {job.points.map((point, i) => (
                    <li key={i} style={styles.bulletPoint}>
                      <Star style={styles.star} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout for Education & Skills */}
        <div style={styles.twoColumnGrid}>
          {/* Education */}
          <section>
            <h3 style={styles.sectionTitle}>EDUCATION</h3>
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
            <h3 style={styles.sectionTitle}>SKILLS</h3>
            <div>
              <div style={styles.skillCategory}>
                <h4 style={styles.skillTitle}>LANGUAGES</h4>
                <div style={styles.skillsContainer}>
                  {skills.languages.map((skill, index) => (
                    <span key={index} style={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div style={styles.skillCategory}>
                <h4 style={styles.skillTitle}>TOOLS</h4>
                <div style={styles.skillsContainer}>
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
      </div>
    </div>
  );
};

export default BoldTemplate;