import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCV();
  const [progress, setProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Update progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setProgress(progress);
      updateNavDots();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const updateNavDots = () => {
    const sections = ['hero', 'personal', 'education', 'experience', 'skills', 'projects', 'templates', 'preview'];
    const dots = document.querySelectorAll('.nav-dot');
    
    sections.forEach((section, index) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          dots.forEach(dot => dot.classList.remove('active'));
          dots[index]?.classList.add('active');
        }
      }
    });
  };

  const handleFormChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  const addEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    });
  };

  const addExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    });
  };

  const addProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        id: Date.now(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: ''
      }
    });
  };

  const addSkill = (category) => {
    dispatch({
      type: 'ADD_SKILL',
      payload: {
        id: Date.now(),
        category,
        skill: ''
      }
    });
  };

  const downloadPDF = async () => {
    try {
      // Get the CV data and selected template
      const cvData = {
        personalInfo: state.personalInfo,
        education: state.education,
        experience: state.experience,
        projects: state.projects,
        skills: state.skills,
        selectedTemplate
      };

      // For now, navigate to preview page with the template selection
      // In future versions, this could generate PDF directly from landing page
      navigate('/preview', { state: { selectedTemplate, fromLanding: true } });
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="landing-page">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-primary: #0a0a0f;
          --bg-secondary: #121218;
          --bg-card: rgba(255, 255, 255, 0.03);
          --text-primary: #ffffff;
          --text-secondary: #a8a8b3;
          --text-muted: #6b6b7b;
          --accent-purple: #8b5cf6;
          --accent-blue: #3b82f6;
          --accent-pink: #ec4899;
          --accent-red: #ef4444;
          --gradient-primary: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
          --gradient-secondary: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          --border-color: rgba(255, 255, 255, 0.08);
        }

        .landing-page {
          font-family: 'Inter', sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          overflow-x: hidden;
        }

        html {
          scroll-behavior: smooth;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--bg-secondary);
          z-index: 1001;
        }

        .progress-fill {
          height: 100%;
          background: var(--gradient-primary);
          width: ${progress}%;
          transition: width 0.3s ease;
        }

        header {
          position: fixed;
          top: 4px;
          width: 100%;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 16px 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-dots {
          display: flex;
          gap: 12px;
        }

        .nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-dot.active {
          width: 24px;
          border-radius: 4px;
          background: var(--accent-purple);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 80px 24px;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          filter: blur(100px);
          z-index: -1;
        }

        .hero-content {
          max-width: 800px;
          text-align: center;
        }

        .hero h1 {
          font-size: clamp(48px, 8vw, 80px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -2px;
        }

        .hero h1 span {
          background: var(--gradient-secondary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: 20px;
          color: var(--text-secondary);
          margin-bottom: 48px;
        }

        .cta-button {
          background: var(--gradient-primary);
          color: white;
          padding: 16px 48px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: none;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 14px;
        }

        .scroll-arrow {
          width: 24px;
          height: 24px;
          border-right: 2px solid var(--text-muted);
          border-bottom: 2px solid var(--text-muted);
          transform: rotate(45deg);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) rotate(45deg);
          }
          40% {
            transform: translateY(-10px) rotate(45deg);
          }
          60% {
            transform: translateY(-5px) rotate(45deg);
          }
        }

        .form-section {
          min-height: 100vh;
          padding: 100px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .form-section:nth-child(even) {
          background: var(--bg-secondary);
        }

        .section-content {
          max-width: 800px;
          width: 100%;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-number {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin: 0 auto 16px;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .section-subtitle {
          color: var(--text-secondary);
          font-size: 16px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          position: relative;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .form-input {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-size: 16px;
          transition: all 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.05);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 48px;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      {/* Header */}
      <header>
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">CV</div>
            <span className="logo-text">CV Generator</span>
          </div>
          
          <div className="nav-dots">
            <div className="nav-dot active" onClick={() => scrollToSection('hero')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('personal')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('education')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('experience')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('skills')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('projects')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('templates')}></div>
            <div className="nav-dot" onClick={() => scrollToSection('preview')}></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <h1>
            Skapa ditt CV<br />
            på <span>5 minuter</span>
          </h1>
          <p>Modern CV-generator för svenska IT-studenter. Inga krångliga steg, bara en smooth upplevelse från start till färdigt CV.</p>
          <button className="cta-button" onClick={() => scrollToSection('personal')}>
            Kom igång gratis
          </button>
        </div>
        <div className="scroll-indicator">
          <span>Scrolla för att börja</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="form-section" id="personal">
        <div className="section-content">
          <div className="section-header">
            <div className="section-number">1</div>
            <h2 className="section-title">Personlig information</h2>
            <p className="section-subtitle">Låt oss börja med det grundläggande</p>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Förnamn</label>
              <input
                type="text"
                className="form-input"
                placeholder="John"
                value={state.personalInfo.firstName}
                onChange={(e) => handleFormChange('firstName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Efternamn</label>
              <input
                type="text"
                className="form-input"
                placeholder="Doe"
                value={state.personalInfo.lastName}
                onChange={(e) => handleFormChange('lastName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">E-post</label>
              <input
                type="email"
                className="form-input"
                placeholder="john.doe@example.com"
                value={state.personalInfo.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Telefon</label>
              <input
                type="tel"
                className="form-input"
                placeholder="070-123 45 67"
                value={state.personalInfo.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Stad</label>
              <input
                type="text"
                className="form-input"
                placeholder="Stockholm"
                value={state.personalInfo.city}
                onChange={(e) => handleFormChange('city', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn</label>
              <input
                type="url"
                className="form-input"
                placeholder="linkedin.com/in/johndoe"
                value={state.personalInfo.linkedIn}
                onChange={(e) => handleFormChange('linkedIn', e.target.value)}
              />
            </div>
            <div className="form-group" style={{gridColumn: '1 / -1'}}>
              <label className="form-label">Sammanfattning</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Beskriv dig själv kort..."
                value={state.personalInfo.summary}
                onChange={(e) => handleFormChange('summary', e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="form-section" id="education">
        <div className="section-content">
          <div className="section-header">
            <div className="section-number">2</div>
            <h2 className="section-title">Utbildning</h2>
            <p className="section-subtitle">Din akademiska bakgrund</p>
          </div>
          
          <div className="form-grid">
            {state.education.map((edu, index) => (
              <div key={edu.id || index} className="removable-item" style={{gridColumn: '1 / -1', marginBottom: '24px'}}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Skola/Universitet</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="KTH"
                      value={edu.school}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { index, field: 'school', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Program</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Datateknik"
                      value={edu.degree}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { index, field: 'degree', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Startdatum</label>
                    <input
                      type="date"
                      className="form-input"
                      value={edu.startDate}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { index, field: 'startDate', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slutdatum</label>
                    <input
                      type="date"
                      className="form-input"
                      value={edu.endDate}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { index, field: 'endDate', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label className="form-label">Beskrivning</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Relevanta kurser, projekt..."
                      value={edu.description}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EDUCATION',
                        payload: { index, field: 'description', value: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button className="cta-button" onClick={addEducation} style={{width: 'auto', marginTop: '24px'}}>
              + Lägg till utbildning
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="form-section" id="experience">
        <div className="section-content">
          <div className="section-header">
            <div className="section-number">3</div>
            <h2 className="section-title">Arbetslivserfarenhet</h2>
            <p className="section-subtitle">Dina tidigare jobb och praktik</p>
          </div>
          
          <div className="form-grid">
            {state.experience.map((exp, index) => (
              <div key={exp.id || index} className="removable-item" style={{gridColumn: '1 / -1', marginBottom: '24px'}}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Företag</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Tech AB"
                      value={exp.company}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { index, field: 'company', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Frontend Developer"
                      value={exp.position}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { index, field: 'position', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Startdatum</label>
                    <input
                      type="date"
                      className="form-input"
                      value={exp.startDate}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { index, field: 'startDate', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slutdatum</label>
                    <input
                      type="date"
                      className="form-input"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { index, field: 'endDate', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label className="form-label">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_EXPERIENCE',
                          payload: { index, field: 'current', value: e.target.checked }
                        })}
                        style={{marginRight: '8px'}}
                      />
                      Arbetar fortfarande här
                    </label>
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label className="form-label">Arbetsuppgifter</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Vad gjorde du på jobbet?"
                      value={exp.description}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { index, field: 'description', value: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button className="cta-button" onClick={addExperience} style={{width: 'auto', marginTop: '24px'}}>
              + Lägg till erfarenhet
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="form-section" id="skills">
        <div className="section-content">
          <div className="section-header">
            <div className="section-number">4</div>
            <h2 className="section-title">Färdigheter</h2>
            <p className="section-subtitle">Dina tekniska kunskaper</p>
          </div>
          
          <div className="form-grid">
            {/* Programming Languages */}
            <div className="form-group" style={{gridColumn: '1 / -1'}}>
              <label className="form-label">Programmeringsspråk</label>
              {state.skills.programmingLanguages?.map((skill, index) => (
                <div key={index} style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="JavaScript"
                    value={skill}
                    onChange={(e) => dispatch({
                      type: 'UPDATE_SKILL',
                      payload: { category: 'programmingLanguages', index, value: e.target.value }
                    })}
                  />
                </div>
              ))}
              <button 
                className="cta-button" 
                onClick={() => addSkill('programmingLanguages')}
                style={{width: 'auto', padding: '8px 16px', fontSize: '14px', marginTop: '8px'}}
              >
                + Lägg till språk
              </button>
            </div>

            {/* Frameworks & Tools */}
            <div className="form-group" style={{gridColumn: '1 / -1'}}>
              <label className="form-label">Ramverk & Verktyg</label>
              {state.skills.frameworksLibraries?.map((skill, index) => (
                <div key={index} style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="React"
                    value={skill}
                    onChange={(e) => dispatch({
                      type: 'UPDATE_SKILL',
                      payload: { category: 'frameworksLibraries', index, value: e.target.value }
                    })}
                  />
                </div>
              ))}
              <button 
                className="cta-button" 
                onClick={() => addSkill('frameworksLibraries')}
                style={{width: 'auto', padding: '8px 16px', fontSize: '14px', marginTop: '8px'}}
              >
                + Lägg till verktyg
              </button>
            </div>

            {/* Tools & Other */}
            <div className="form-group" style={{gridColumn: '1 / -1'}}>
              <label className="form-label">Övriga verktyg</label>
              {state.skills.toolsOther?.map((skill, index) => (
                <div key={index} style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Git"
                    value={skill}
                    onChange={(e) => dispatch({
                      type: 'UPDATE_SKILL',
                      payload: { category: 'toolsOther', index, value: e.target.value }
                    })}
                  />
                </div>
              ))}
              <button 
                className="cta-button" 
                onClick={() => addSkill('toolsOther')}
                style={{width: 'auto', padding: '8px 16px', fontSize: '14px', marginTop: '8px'}}
              >
                + Lägg till verktyg
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="form-section" id="projects">
        <div className="section-content">
          <div className="section-header">
            <div className="section-number">5</div>
            <h2 className="section-title">Projekt</h2>
            <p className="section-subtitle">Dina kodprojekt och portfolioarbeten</p>
          </div>
          
          <div className="form-grid">
            {state.projects.map((project, index) => (
              <div key={project.id || index} className="removable-item" style={{gridColumn: '1 / -1', marginBottom: '24px'}}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Projektnamn</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="CV Generator"
                      value={project.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { index, field: 'name', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teknologier</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="React, Node.js, MongoDB"
                      value={project.technologies}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { index, field: 'technologies', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Länk till projekt</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://..."
                      value={project.link}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { index, field: 'link', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://github.com/..."
                      value={project.github}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { index, field: 'github', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group" style={{gridColumn: '1 / -1'}}>
                    <label className="form-label">Beskrivning</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Vad gör projektet? Vilka problem löser det?"
                      value={project.description}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_PROJECT',
                        payload: { index, field: 'description', value: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button className="cta-button" onClick={addProject} style={{width: 'auto', marginTop: '24px'}}>
              + Lägg till projekt
            </button>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="form-section" id="templates">
        <div className="section-content">
          <div className="section-header">
            <div className="section-number">6</div>
            <h2 className="section-title">Välj design</h2>
            <p className="section-subtitle">Välj en mall som passar din stil</p>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px'}}>
            {['Modern', 'Executive', 'Creative', 'Gradient', 'Minimal', 'Neon', 'Retro'].map((template) => (
              <div 
                key={template}
                onClick={() => setSelectedTemplate(template.toLowerCase())}
                style={{
                  background: selectedTemplate === template.toLowerCase() ? 'var(--gradient-primary)' : 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: selectedTemplate === template.toLowerCase() ? 'white' : 'var(--text-primary)'
                }}
              >
                <div style={{fontWeight: '600', marginBottom: '8px'}}>{template}</div>
                <div style={{fontSize: '14px', opacity: '0.7'}}>
                  {template === 'Modern' && 'Lila accenter med tvåkolumns layout'}
                  {template === 'Executive' && 'Elegant centrerad design'}
                  {template === 'Creative' && 'Färgglad design med lekfulla element'}
                  {template === 'Gradient' && 'Modern design med gradienter'}
                  {template === 'Minimal' && 'Ultra-minimalistisk design'}
                  {template === 'Neon' && 'Cyberpunk-inspirerad design'}
                  {template === 'Retro' && '80-tals inspirerad design'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview & Download Section */}
      <section className="form-section" id="preview" style={{minHeight: '50vh'}}>
        <div className="section-content" style={{textAlign: 'center'}}>
          <div className="section-header">
            <div className="section-number">7</div>
            <h2 className="section-title">Ladda ner ditt CV</h2>
            <p className="section-subtitle">Grattis! Nu är ditt CV klart att ladda ner som PDF</p>
          </div>
          
          <button className="cta-button" onClick={downloadPDF}>
            Ladda ner PDF ({selectedTemplate} mall)
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;