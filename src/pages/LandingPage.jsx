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
    const sections = ['hero', 'personal', 'education', 'experience', 'templates', 'preview'];
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

  const downloadPDF = () => {
    // Navigate to existing preview page for PDF generation
    navigate('/preview');
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

      {/* Quick Navigation to existing builder for advanced features */}
      <section className="form-section" id="preview" style={{minHeight: '50vh'}}>
        <div className="section-content" style={{textAlign: 'center'}}>
          <div className="section-header">
            <div className="section-number">2</div>
            <h2 className="section-title">Fortsätt till CV Builder</h2>
            <p className="section-subtitle">Komplettera ditt CV med utbildning, erfarenhet och ladda ner som PDF</p>
          </div>
          
          <button className="cta-button" onClick={() => navigate('/builder')}>
            Gå till CV Builder
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;