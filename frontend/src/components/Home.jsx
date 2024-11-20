import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Create background animation boxes
    const bgAnimation = document.getElementById('bgAnimation');
    const numberOfColorBoxes = 400;

    // Clear existing boxes first
    if (bgAnimation) {
      bgAnimation.innerHTML = '<div class="backgroundAnim"></div>';

      for (let i = 0; i < numberOfColorBoxes; i++) {
        const colorBox = document.createElement('div');
        colorBox.classList.add('colorBox');
        bgAnimation.append(colorBox);
      }
    }
  }, []);

  return (
    <div className="landing-page">
      {/* Background Animation */}
      <div className="bgAnimation" id="bgAnimation">
        <div className="backgroundAnim"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Logic Gate Simulator</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Hero Section */}
        <section className="hero">
          {/* Spline Viewer */}
          <div className="spline-container">
            <spline-viewer 
              loading-anim-type="spinner-small-dark"
              url="https://prod.spline.design/HlvaSXnKgK5cPUZL/scene.splinecode"
            ></spline-viewer>
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <h1>Logic Gate Simulator</h1>
              <p className="hero-subtitle">Design, build, and test digital logic circuits in real-time</p>
            </div>
            <div className="hero-cta">
              <button 
                onClick={() => navigate('/workspace')} 
                className="cta-button primary"
              >
                Get Started
                <span className="button-arrow">→</span>
              </button>
              <button 
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} 
                className="cta-button secondary"
              >
                Learn More
                <span className="button-arrow">↓</span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Simulation</h3>
              <p>Test your circuits instantly with live feedback</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Multiple Gates</h3>
              <p>AND, OR, NOT, NAND, NOR, XOR, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Interactive UI</h3>
              <p>Drag and drop interface for easy circuit building</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <h2>About</h2>
          <p>This platform is an educational tool for students and professionals, bridging the gap between theoretical and practical digital logic. It supports learning fundamental computer architecture principles through interactive features and real-world applications. Open-source contributions are welcome, fostering collaboration and continuous improvement.</p>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Logic Gate Simulator</h3>
              <p>Build your digital logic circuits with ease</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <a href="#features">Features</a>
                <a href="#about">About</a>
                <a onClick={() => navigate('/workspace')} style={{cursor: 'pointer'}}>Workspace</a>
              </div>
              <div className="footer-section">
                <h4>Resources</h4>
                <a href="#" target="_blank" rel="noopener noreferrer">Documentation</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Tutorial</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Logic Gate Simulator. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home; 

