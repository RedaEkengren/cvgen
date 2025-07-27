import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../context/CVContext';
import ModernTemplate from './templates/ModernTemplate';
import SleekTemplate from './templates/SleekTemplate';
import Creative from './templates/Creative';
import Gradient from './templates/Gradient';
import Minimal from './templates/Minimal';
import Neon from './templates/Neon';
import Retro from './templates/Retro';

const LandingPage = () => {
  console.log('LandingPage component loaded');
  const navigate = useNavigate();
  const { state, dispatch } = useCV();
  console.log('CV state:', state);
  const [progress, setProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Render the selected CV template
  const renderTemplate = () => {
    const templateProps = { cvData: state };
    
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'executive':
        return <SleekTemplate {...templateProps} />;
      case 'creative':
        return <Creative {...templateProps} />;
      case 'gradient':
        return <Gradient {...templateProps} />;
      case 'minimal':
        return <Minimal {...templateProps} />;
      case 'neon':
        return <Neon {...templateProps} />;
      case 'retro':
        return <Retro {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

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

  const addSkill = () => {
    console.log('addSkill button clicked!');
    console.log('Current skills state:', state.skills);
    console.log('Is skills an array?', Array.isArray(state.skills));
    
    dispatch({
      type: 'ADD_SKILL',
      payload: {
        id: Date.now(),
        name: '',
        category: 'languages'
      }
    });
    
    console.log('Dispatched ADD_SKILL action');
  };

  const removeEducation = (index) => {
    dispatch({
      type: 'REMOVE_EDUCATION',
      index
    });
  };

  const removeExperience = (index) => {
    dispatch({
      type: 'REMOVE_EXPERIENCE',
      index
    });
  };

  const removeProject = (index) => {
    dispatch({
      type: 'REMOVE_PROJECT',
      index
    });
  };

  const downloadPDF = async () => {
    try {
      // Get the actual rendered template HTML
      const templateElement = document.getElementById('cv-preview');
      if (!templateElement) {
        alert('Kunde inte hitta CV-preview');
        return;
      }

      // Clone the element to avoid modifying the original
      const clonedElement = templateElement.cloneNode(true);
      
      // Remove any interactive elements if needed
      const buttons = clonedElement.querySelectorAll('button');
      buttons.forEach(btn => btn.remove());

      // Get the HTML content with all styles
      const htmlContent = clonedElement.innerHTML;

      // Send to backend for PDF generation
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: htmlContent,
          templateName: selectedTemplate
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.personalInfo.firstName}_${state.personalInfo.lastName}_CV.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('PDF generation failed');
      }
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


        .template-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1000px;
          width: 100%;
        }

        .template-card {
          background: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }

        .template-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-purple);
        }

        .template-card.selected {
          border-color: var(--accent-purple);
          transform: translateY(-2px);
        }

        .template-preview {
          width: 100%;
          height: 200px;
          background: #1a1a1f;
          border-radius: 8px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          padding: 20px;
          font-size: 10px;
          overflow: hidden;
          position: relative;
        }

        /* Modern Template Preview */
        .template-card:nth-child(1) .template-preview {
          background: linear-gradient(135deg, #1a1a1f 0%, #2d1b69 100%);
        }
        .template-card:nth-child(1) .template-preview::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          height: 30px;
          background: rgba(139, 92, 246, 0.2);
          border-radius: 4px;
        }

        /* Creative Template Preview */
        .template-card:nth-child(2) .template-preview {
          background: #1a1a1f;
          border: 2px solid #ec4899;
        }
        .template-card:nth-child(2) .template-preview::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, #ec4899 0%, transparent 70%);
          border-radius: 50%;
        }

        /* Minimal Template Preview */
        .template-card:nth-child(3) .template-preview {
          background: #0a0a0f;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .template-card:nth-child(3) .template-preview::after {
          content: '';
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        /* Executive Template Preview */
        .template-card:nth-child(4) .template-preview {
          background: linear-gradient(180deg, #1a1a1f 0%, #2a2a3f 100%);
        }
        .template-card:nth-child(4) .template-preview::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: #8b5cf6;
          border-radius: 2px;
        }

        /* Gradient Template Preview */
        .template-card:nth-child(5) .template-preview {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 100%);
          opacity: 0.8;
        }

        /* Neon Template Preview */
        .template-card:nth-child(6) .template-preview {
          background: #0a0a0f;
          box-shadow: inset 0 0 50px rgba(0, 255, 255, 0.1);
        }
        .template-card:nth-child(6) .template-preview::after {
          content: '';
          position: absolute;
          inset: 10px;
          border: 2px solid #00ffff;
          border-radius: 4px;
          filter: drop-shadow(0 0 10px #00ffff);
        }

        /* Retro Template Preview */
        .template-card:nth-child(7) .template-preview {
          background: repeating-linear-gradient(
            0deg,
            #ff006e,
            #ff006e 2px,
            #8338ec 2px,
            #8338ec 4px
          );
          position: relative;
        }
        .template-card:nth-child(7) .template-preview::after {
          content: '';
          position: absolute;
          inset: 10px;
          background: #0a0a0f;
          border-radius: 4px;
        }

        /* Mini CV layout inside previews */
        .cv-mini {
          position: absolute;
          inset: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 1;
        }

        .cv-mini-header {
          height: 25px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .cv-mini-line {
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 1px;
        }

        .cv-mini-line:nth-child(2) { width: 80%; }
        .cv-mini-line:nth-child(3) { width: 60%; }
        .cv-mini-line:nth-child(4) { width: 70%; }
        .cv-mini-line:nth-child(5) { width: 50%; }

        .template-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .template-description {
          font-size: 14px;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 48px;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .template-grid {
            grid-template-columns: repeat(2, 1fr);
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
          
          <div className="education-container">
            {state.education.length === 0 && (
              <p style={{textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '24px'}}>
                Inga utbildningar tillagda ännu. Klicka på knappen nedan för att lägga till din första utbildning.
              </p>
            )}
            {state.education.map((edu, index) => (
              <div key={edu.id || index} className="removable-item">
                <button 
                  type="button" 
                  className="remove-button" 
                  onClick={() => removeEducation(index)}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
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
                      type="text"
                      className="form-input"
                      placeholder="mm/dd/yyyy"
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
                      type="text"
                      className="form-input"
                      placeholder="mm/dd/yyyy"
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
          
          <div className="experience-container">
            {state.experience.length === 0 && (
              <p style={{textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '24px'}}>
                Inga erfarenheter tillagda ännu. Klicka på knappen nedan för att lägga till din första erfarenhet.
              </p>
            )}
            {state.experience.map((exp, index) => (
              <div key={exp.id || index} className="removable-item">
                <button 
                  type="button" 
                  className="remove-button" 
                  onClick={() => removeExperience(index)}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
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
                      type="text"
                      className="form-input"
                      placeholder="mm/dd/yyyy"
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
                      type="text"
                      className="form-input"
                      placeholder="mm/dd/yyyy"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_EXPERIENCE',
                        payload: { index, field: 'endDate', value: e.target.value }
                      })}
                    />
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
            {(!state.skills || !Array.isArray(state.skills) || state.skills.length === 0) && (
              <p style={{textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '24px', gridColumn: '1 / -1'}}>
                Inga färdigheter tillagda ännu. Klicka på knappen nedan för att lägga till din första färdighet.
              </p>
            )}
            
            {Array.isArray(state.skills) && state.skills.map((skill, index) => (
              <div key={index} className="removable-item" style={{gridColumn: '1 / -1'}}>
                <button 
                  type="button" 
                  className="remove-button" 
                  onClick={() => dispatch({ type: 'REMOVE_SKILL', index })}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Färdighet</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ex. JavaScript, React, Git"
                      value={skill.name}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_SKILL',
                        payload: { index, field: 'name', value: e.target.value }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Kategori</label>
                    <select
                      className="form-input"
                      value={skill.category}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_SKILL',
                        payload: { index, field: 'category', value: e.target.value }
                      })}
                    >
                      <option value="languages">Programmeringsspråk</option>
                      <option value="frameworks">Ramverk & Bibliotek</option>
                      <option value="tools">Verktyg & Övriga</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              className="cta-button" 
              onClick={addSkill}
              style={{width: 'auto', marginTop: '24px'}}
            >
              + Lägg till färdighet
            </button>
            
            <button 
              className="cta-button" 
              onClick={() => {
                console.log('Current skills state:', state.skills);
                console.log('Is array?', Array.isArray(state.skills));
                alert('Check console for skills state');
              }}
              style={{width: 'auto', marginTop: '10px', background: 'orange'}}
            >
              DEBUG: Check Skills State
            </button>
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
              <div key={project.id || index} className="removable-item" style={{gridColumn: '1 / -1'}}>
                <button 
                  type="button" 
                  className="remove-button" 
                  onClick={() => removeProject(index)}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
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

      {/* Split-Screen: Template Selector & Live Preview */}
      <section className="form-section" id="templates" style={{background: 'var(--bg-secondary)', minHeight: '100vh'}}>
        <div className="split-screen-container">
          {/* Left Side: Template Selection & Download */}
          <div className="split-screen-left">
            <div className="section-header">
              <div className="section-number">6</div>
              <h2 className="section-title">Ditt CV är klart!</h2>
              <p className="section-subtitle">Här är en förhandsgranskning av ditt CV. Du kan ladda ner det som PDF eller gå tillbaka och redigera.</p>
            </div>
            
            <div className="template-selector-compact">
              <h3 style={{color: 'var(--text-primary)', marginBottom: '16px', fontSize: '18px'}}>Välj din design</h3>
              <div className="template-grid-compact">
                {[
                  {name: 'Modern', desc: 'Clean & Professional'},
                  {name: 'Creative', desc: 'Färgglad & Unik'},
                  {name: 'Minimal', desc: 'Enkel & Elegant'},
                  {name: 'Executive', desc: 'Professionell & Seriös'},
                  {name: 'Gradient', desc: 'Modern & Trendig'},
                  {name: 'Neon', desc: 'Cyberpunk & Cool'},
                  {name: 'Retro', desc: '80-tals inspirerad'}
                ].map((template, index) => (
                  <div 
                    key={template.name}
                    className={`template-card-compact ${selectedTemplate === template.name.toLowerCase() ? 'selected' : ''}`}
                    onClick={() => setSelectedTemplate(template.name.toLowerCase())}
                  >
                    <div className="template-preview-mini">
                      <div className="cv-mini-compact">
                        <div className="cv-mini-header-compact"></div>
                        <div className="cv-mini-line-compact"></div>
                        <div className="cv-mini-line-compact"></div>
                      </div>
                    </div>
                    <span className="template-name-compact">{template.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="download-section">
              <button className="cta-button" onClick={downloadPDF} style={{width: '100%', marginTop: '32px', padding: '16px'}}>
                📥 Ladda ner PDF ({selectedTemplate} mall)
              </button>
            </div>
          </div>
          
          {/* Right Side: Live CV Preview */}
          <div className="split-screen-right">
            <div className="cv-preview-container" id="cv-preview">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;