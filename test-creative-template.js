// Test script för att testa PDF-generering med den kreativa mallen
import fs from 'fs';
import fetch from 'node-fetch';

const testHTML = `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - Anna Andersson</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: white;
        }
        
        .container {
            max-width: 768px;
            margin: 0 auto;
            padding: 40px;
            background-color: white;
        }
        
        /* Header Styles */
        .header {
            margin-bottom: 48px;
            position: relative;
        }
        
        .decorative-box-1 {
            position: absolute;
            top: -16px;
            left: -16px;
            width: 64px;
            height: 64px;
            background-color: #fef3c7;
        }
        
        .decorative-box-2 {
            position: absolute;
            top: -16px;
            right: -16px;
            width: 64px;
            height: 64px;
            background-color: #fce7f3;
        }
        
        .header-content {
            text-align: center;
            padding-top: 32px;
            position: relative;
        }
        
        .greeting {
            font-size: 36px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
        }
        
        .name-highlight {
            color: #14b8a6;
        }
        
        .title-container {
            font-size: 20px;
            color: #6b7280;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .sparkle {
            display: inline-block;
            width: 20px;
            height: 20px;
            color: #eab308;
        }
        
        /* Contact Styles */
        .contact-container {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            font-size: 14px;
            text-decoration: none;
        }
        
        .email-box {
            background-color: #5eead4;
            color: #0f766e;
        }
        
        .phone-box {
            background-color: #fce7f3;
            color: #be185d;
        }
        
        .location-box {
            background-color: #fef3c7;
            color: #a16207;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 16px;
        }
        
        .social-link {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b7280;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .social-link:hover {
            color: #14b8a6;
        }
        
        /* About Section */
        .about-section {
            margin-bottom: 40px;
            background: linear-gradient(to right, #f0fdfa, #fce7f3);
            padding: 24px;
            border: 2px solid #5eead4;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .icon {
            width: 20px;
            height: 20px;
            color: #14b8a6;
        }
        
        .profile-text {
            color: #374151;
            line-height: 1.8;
        }
        
        /* Journey Section */
        .journey-section {
            margin-bottom: 40px;
        }
        
        .journey-title {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .rocket-icon {
            width: 24px;
            height: 24px;
            color: #ec4899;
        }
        
        .experience-card {
            position: relative;
            margin-bottom: 32px;
            margin-left: 48px;
        }
        
        .number-badge {
            position: absolute;
            left: -48px;
            top: 0;
            width: 32px;
            height: 32px;
            background-color: #14b8a6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .experience-content {
            border: 2px solid #e5e7eb;
            padding: 24px;
            background-color: #f9fafb;
        }
        
        .experience-title {
            font-size: 18px;
            font-weight: bold;
            color: #111827;
        }
        
        .experience-company {
            color: #14b8a6;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .experience-date {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 16px;
        }
        
        .bullet-list {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .bullet-item {
            display: flex;
            align-items: flex-start;
            color: #374151;
            margin-bottom: 8px;
        }
        
        .zap-icon {
            width: 16px;
            height: 16px;
            margin-top: 2px;
            margin-right: 8px;
            color: #eab308;
            flex-shrink: 0;
        }
        
        /* Bottom Grid */
        .bottom-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
        }
        
        .education-box {
            background-color: #fef3c7;
            border: 2px solid #facc15;
            padding: 16px;
            margin-bottom: 16px;
        }
        
        .education-school {
            font-weight: bold;
            color: #111827;
        }
        
        .education-program {
            color: #374151;
        }
        
        .education-year {
            font-size: 14px;
            color: #6b7280;
        }
        
        .skill-box {
            border: 2px solid #ec4899;
            padding: 16px;
            margin-bottom: 16px;
            background-color: #fce7f3;
        }
        
        .skill-box-alt {
            border: 2px solid #14b8a6;
            background-color: #f0fdfa;
        }
        
        .skill-title {
            font-weight: bold;
            color: #374151;
            margin-bottom: 8px;
        }
        
        .skill-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-badge {
            background-color: white;
            padding: 4px 12px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            border: 1px solid #ec4899;
        }
        
        .skill-badge-alt {
            border: 1px solid #14b8a6;
        }
        
        /* Footer */
        .footer {
            margin-top: 48px;
            text-align: center;
        }
        
        .footer-text {
            color: #6b7280;
            font-size: 14px;
        }
        
        /* Icons as text */
        .icon-mail::before { content: "@"; }
        .icon-phone::before { content: "Tel"; }
        .icon-location::before { content: "📍"; }
        .icon-linkedin::before { content: "in"; font-weight: bold; }
        .icon-github::before { content: "gh"; font-weight: bold; }
        .icon-target::before { content: "🎯"; }
        .icon-rocket::before { content: "🚀"; }
        .icon-zap::before { content: "⚡"; }
        .icon-sparkles::before { content: "✨"; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="decorative-box-1"></div>
            <div class="decorative-box-2"></div>
            
            <div class="header-content">
                <h1 class="greeting">
                    Hi, I'm <span class="name-highlight">Anna Andersson</span>!
                </h1>
                <h2 class="title-container">
                    <span class="sparkle icon-sparkles"></span>
                    Senior Frontend Developer
                    <span class="sparkle icon-sparkles"></span>
                </h2>
                
                <div class="contact-container">
                    <a href="mailto:anna.andersson@email.com" class="contact-item email-box">
                        <span class="icon-mail"></span>
                        <span>anna.andersson@email.com</span>
                    </a>
                    <div class="contact-item phone-box">
                        <span class="icon-phone"></span>
                        <span>+46 70 123 45 67</span>
                    </div>
                    <div class="contact-item location-box">
                        <span class="icon-location"></span>
                        <span>Stockholm, Sverige</span>
                    </div>
                </div>
                
                <div class="social-links">
                    <a href="https://linkedin.com/in/anna-andersson" target="_blank" rel="noopener noreferrer" class="social-link">
                        <span class="icon-linkedin"></span>
                    </a>
                    <a href="https://github.com/anna-andersson" target="_blank" rel="noopener noreferrer" class="social-link">
                        <span class="icon-github"></span>
                    </a>
                </div>
            </div>
        </header>

        <!-- About Me -->
        <section class="about-section">
            <h3 class="section-title">
                <span class="icon icon-target"></span>
                About Me
            </h3>
            <p class="profile-text">
                Passionerad frontendutvecklare med 5 års erfarenhet av att bygga användarvänliga webbapplikationer. Specialiserad på React och modern JavaScript med fokus på prestanda och tillgänglighet.
            </p>
        </section>

        <!-- Experience -->
        <section class="journey-section">
            <h3 class="journey-title">
                <span class="rocket-icon icon-rocket"></span>
                My Journey
            </h3>
            
            <div>
                <div class="experience-card">
                    <div class="number-badge">1</div>
                    
                    <div class="experience-content">
                        <h4 class="experience-title">Senior Frontend Developer</h4>
                        <p class="experience-company">Tech Solutions AB</p>
                        <p class="experience-date">2022 - Nuvarande</p>
                        
                        <ul class="bullet-list">
                            <li class="bullet-item">
                                <span class="zap-icon icon-zap"></span>
                                <span>Leder utvecklingen av en ny e-handelsplattform med React och TypeScript</span>
                            </li>
                            <li class="bullet-item">
                                <span class="zap-icon icon-zap"></span>
                                <span>Implementerade en komponentbibliotek som minskade utvecklingstiden med 40%</span>
                            </li>
                            <li class="bullet-item">
                                <span class="zap-icon icon-zap"></span>
                                <span>Mentorskap för juniora utvecklare och code reviews</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="experience-card">
                    <div class="number-badge">2</div>
                    
                    <div class="experience-content">
                        <h4 class="experience-title">Frontend Developer</h4>
                        <p class="experience-company">Digital Agency</p>
                        <p class="experience-date">2019 - 2022</p>
                        
                        <ul class="bullet-list">
                            <li class="bullet-item">
                                <span class="zap-icon icon-zap"></span>
                                <span>Utvecklade responsiva webbapplikationer för 20+ kunder</span>
                            </li>
                            <li class="bullet-item">
                                <span class="zap-icon icon-zap"></span>
                                <span>Optimerade prestanda vilket resulterade i 60% snabbare laddningstider</span>
                            </li>
                            <li class="bullet-item">
                                <span class="zap-icon icon-zap"></span>
                                <span>Arbetade agilt i tvärfunktionella team</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Education & Skills -->
        <div class="bottom-grid">
            <!-- Education -->
            <section>
                <h3 class="section-title" style="margin-bottom: 16px;">
                    Education
                </h3>
                <div>
                    <div class="education-box">
                        <h4 class="education-school">KTH Kungliga Tekniska Högskolan</h4>
                        <p class="education-program">Civilingenjör Datateknik</p>
                        <p class="education-year">2014 - 2019</p>
                    </div>
                </div>
            </section>

            <!-- Skills -->
            <section>
                <h3 class="section-title" style="margin-bottom: 16px;">
                    Skills
                </h3>
                
                <div>
                    <div class="skill-box">
                        <h4 class="skill-title">Languages</h4>
                        <div class="skill-container">
                            <span class="skill-badge">JavaScript</span>
                            <span class="skill-badge">TypeScript</span>
                            <span class="skill-badge">HTML/CSS</span>
                            <span class="skill-badge">Python</span>
                        </div>
                    </div>
                    
                    <div class="skill-box skill-box-alt">
                        <h4 class="skill-title">Tools</h4>
                        <div class="skill-container">
                            <span class="skill-badge skill-badge-alt">React</span>
                            <span class="skill-badge skill-badge-alt">Next.js</span>
                            <span class="skill-badge skill-badge-alt">Node.js</span>
                            <span class="skill-badge skill-badge-alt">Git</span>
                            <span class="skill-badge skill-badge-alt">Figma</span>
                            <span class="skill-badge skill-badge-alt">Jest</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">Let's create something amazing together!</p>
        </div>
    </div>
</body>
</html>`;

async function testPuppeteerPDF() {
    console.log('Testing Puppeteer PDF generation with creative template...');
    
    try {
        const response = await fetch('http://localhost:3001/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                htmlContent: testHTML,
                filename: 'creative-template-test.pdf'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const buffer = await response.buffer();
        fs.writeFileSync('creative-template-test.pdf', buffer);
        
        console.log('✅ PDF generated successfully: creative-template-test.pdf');
        console.log(`📄 File size: ${buffer.length} bytes`);
        
    } catch (error) {
        console.error('❌ PDF generation failed:', error.message);
    }
}

testPuppeteerPDF();