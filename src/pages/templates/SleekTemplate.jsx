import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Circle } from 'lucide-react';

const SleekTemplate = ({ cvData }) => {
  // Extract data from cvData prop
  const name = cvData?.personalInfo ? `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}` : "Anna Andersson";
  const title = "IT-Student & Utvecklare";
  const email = cvData?.personalInfo?.email || "anna.andersson@email.com";
  const phone = cvData?.personalInfo?.phone || "+46 70 123 45 67";
  const location = cvData?.personalInfo?.city || "Stockholm, Sverige";
  const linkedin = cvData?.personalInfo?.linkedIn || "linkedin.com/in/anna-andersson";
  const github = cvData?.personalInfo?.github || "github.com/anna-andersson";
  const photoUrl = cvData?.personalInfo?.photoUrl || null;
  const profile = cvData?.personalInfo?.summary || "Passionerad frontendutvecklare med 5 års erfarenhet av att bygga användarvänliga webbapplikationer. Specialiserad på React och modern JavaScript med fokus på prestanda och tillgänglighet.";
  
  // Map experience data to the format expected by the template
  const experience = cvData?.experience?.map(job => ({
    title: job.position,
    company: job.company,
    date: job.current ? `${job.startDate} - Nuvarande` : `${job.startDate} - ${job.endDate}`,
    points: job.description ? job.description.split('\n').filter(Boolean) : []
  })) || [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions AB",
      date: "2022 - Nuvarande",
      points: [
        "Leder utvecklingen av en ny e-handelsplattform med React och TypeScript",
        "Implementerade en komponentbibliotek som minskade utvecklingstiden med 40%",
        "Mentorskap för juniora utvecklare och code reviews"
      ]
    }
  ];
  
  // Map education data to the format expected by the template
  const education = cvData?.education?.map(edu => ({
    school: edu.school,
    program: edu.degree,
    year: `${edu.startDate} - ${edu.endDate}`,
    description: edu.description || edu.field
  })) || [
    {
      school: "KTH Kungliga Tekniska Högskolan",
      program: "Civilingenjör Datateknik",
      year: "2014 - 2019",
      description: "Inriktning mot mjukvaruutveckling och människa-datorinteraktion"
    }
  ];
  
  // Handle skills - support both old format (object) and new format (array)
  let skills = { languages: [], tools: [] };
  if (cvData?.skills) {
    if (Array.isArray(cvData.skills)) {
      // New format - array of skill objects
      skills.languages = cvData.skills
        .filter(s => s.category === 'languages')
        .map(s => s.name)
        .filter(Boolean);
      skills.tools = cvData.skills
        .filter(s => s.category === 'frameworks' || s.category === 'tools')
        .map(s => s.name)
        .filter(Boolean);
    } else {
      // Old format - keep as is
      skills = cvData.skills;
    }
  }
  if (!skills.languages.length && !skills.tools.length) {
    // Default values if no skills
    skills = {
      languages: ["JavaScript", "TypeScript", "HTML/CSS", "Python"],
      tools: ["React", "Next.js", "Node.js", "Git", "Figma", "Jest"]
    };
  }
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
      top: '0',
      left: '0',
      width: '128px',
      height: '128px',
      backgroundColor: '#e9d5ff',
      zIndex: -10
    },
    decorativeBox2: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '96px',
      height: '96px',
      backgroundColor: '#e0e7ff',
      zIndex: -10
    },
    headerContent: {
      position: 'relative',
      zIndex: 10,
      paddingTop: '32px'
    },
    photoLayout: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '32px'
    },
    photo: {
      width: '128px',
      height: '128px',
      objectFit: 'cover',
      border: '4px solid white',
      boxShadow: '0 0 0 2px #e5e7eb'
    },
    name: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '12px'
    },
    title: {
      fontSize: '24px',
      color: '#7c3aed',
      fontWeight: '500',
      marginBottom: '24px'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      color: '#4b5563'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#4b5563',
      textDecoration: 'none',
      transition: 'color 0.3s'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    icon: {
      width: '16px',
      height: '16px',
      color: '#7c3aed'
    },
    profileSection: {
      marginBottom: '40px',
      paddingBottom: '40px',
      borderBottom: '2px solid #f3f4f6'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    },
    colorBar: {
      width: '48px',
      height: '4px',
      backgroundColor: '#7c3aed'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    profileText: {
      color: '#374151',
      fontSize: '16px',
      lineHeight: '1.8',
      marginLeft: '64px'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '40px'
    },
    experienceItem: {
      position: 'relative',
      paddingLeft: '32px',
      marginBottom: '32px'
    },
    timelineDot: {
      position: 'absolute',
      left: '0',
      top: '8px',
      width: '8px',
      height: '8px',
      backgroundColor: '#7c3aed'
    },
    timelineLine: {
      position: 'absolute',
      left: '3px',
      top: '16px',
      width: '2px',
      height: '100%',
      backgroundColor: '#e5e7eb'
    },
    jobTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '4px'
    },
    jobInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#4b5563',
      marginBottom: '8px'
    },
    company: {
      color: '#7c3aed',
      fontWeight: '500'
    },
    bulletPoint: {
      display: 'flex',
      alignItems: 'flex-start',
      color: '#374151',
      marginBottom: '8px'
    },
    bulletIcon: {
      width: '6px',
      height: '6px',
      marginTop: '8px',
      marginRight: '12px',
      color: '#7c3aed',
      fill: 'currentColor',
      flexShrink: 0
    },
    sidePanel: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      marginRight: '-40px'
    },
    skillCategory: {
      marginBottom: '24px'
    },
    skillSubtitle: {
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: '12px',
      fontSize: '14px',
      textTransform: 'uppercase'
    },
    skillItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    },
    skillDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#7c3aed'
    },
    skillDotAlt: {
      width: '8px',
      height: '8px',
      backgroundColor: '#6366f1'
    },
    skillText: {
      color: '#374151'
    },
    educationItem: {
      marginBottom: '16px'
    },
    educationSchool: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '4px'
    },
    educationProgram: {
      color: '#374151',
      marginBottom: '4px'
    },
    educationYear: {
      fontSize: '14px',
      color: '#6b7280'
    },
    educationDesc: {
      fontSize: '14px',
      color: '#4b5563',
      marginTop: '4px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Premium Header Design */}
      <header style={styles.header}>
        <div style={styles.decorativeBox1}></div>
        <div style={styles.decorativeBox2}></div>
        
        <div style={styles.headerContent}>
          <div style={styles.photoLayout}>
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
              
              <div style={styles.contactGrid}>
                <a 
                  href={email.startsWith('mailto:') ? email : `mailto:${email}`}
                  style={styles.contactLink}
                >
                  <Mail style={styles.icon} />
                  <span>{email}</span>
                </a>
                <div style={styles.contactItem}>
                  <Phone style={styles.icon} />
                  <span>{phone}</span>
                </div>
                <div style={styles.contactItem}>
                  <MapPin style={styles.icon} />
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
                      <Linkedin style={styles.icon} />
                    </a>
                  )}
                  {github && (
                    <a 
                      href={github.startsWith('http') ? github : `https://${github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.contactLink}
                    >
                      <Github style={styles.icon} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Section with Border */}
      <section style={styles.profileSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.colorBar}></div>
          <h3 style={styles.sectionTitle}>Profil</h3>
        </div>
        <p style={styles.profileText}>
          {profile}
        </p>
      </section>

      {/* Two Column Layout */}
      <div style={styles.mainGrid}>
        {/* Main Column - 2/3 width */}
        <div>
          {/* Experience */}
          <section style={{ marginBottom: '40px' }}>
            <div style={{ ...styles.sectionHeader, marginBottom: '24px' }}>
              <div style={styles.colorBar}></div>
              <h3 style={styles.sectionTitle}>Erfarenhet</h3>
            </div>
            
            <div>
              {experience.map((job, index) => (
                <div key={index} style={styles.experienceItem}>
                  <div style={styles.timelineDot}></div>
                  <div style={styles.timelineLine}></div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={styles.jobTitle}>{job.title}</h4>
                    <div style={styles.jobInfo}>
                      <span style={styles.company}>{job.company}</span>
                      <span style={{ color: '#d1d5db' }}>•</span>
                      <span style={{ color: '#6b7280' }}>{job.date}</span>
                    </div>
                  </div>
                  
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {job.points.map((point, i) => (
                      <li key={i} style={styles.bulletPoint}>
                        <Circle style={styles.bulletIcon} />
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
            <div style={{ ...styles.sectionHeader, marginBottom: '24px' }}>
              <div style={styles.colorBar}></div>
              <h3 style={styles.sectionTitle}>Utbildning</h3>
            </div>
            
            <div style={{ paddingLeft: '32px' }}>
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
        </div>

        {/* Side Column - 1/3 width */}
        <div>
          {/* Skills Section */}
          <section style={styles.sidePanel}>
            <div style={{ ...styles.sectionHeader, marginBottom: '24px' }}>
              <div style={{ ...styles.colorBar, width: '32px' }}></div>
              <h3 style={{ ...styles.sectionTitle, fontSize: '18px' }}>Färdigheter</h3>
            </div>
            
            <div style={styles.skillCategory}>
              <h4 style={styles.skillSubtitle}>Språk & Tekniker</h4>
              <div>
                {skills.languages.map((skill, index) => (
                  <div key={index} style={styles.skillItem}>
                    <div style={styles.skillDot}></div>
                    <span style={styles.skillText}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={styles.skillSubtitle}>Verktyg & Ramverk</h4>
              <div>
                {skills.tools.map((tool, index) => (
                  <div key={index} style={styles.skillItem}>
                    <div style={styles.skillDotAlt}></div>
                    <span style={styles.skillText}>{tool}</span>
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

export default SleekTemplate;