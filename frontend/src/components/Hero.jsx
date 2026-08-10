import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content fade-in">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/inventory')}>{t('hero.explore')}</button>
            <button className="btn btn-secondary" onClick={() => navigate('/contact')}>{t('hero.source')}</button>
          </div>
        </div>
        <div className="hero-image-wrapper fade-in">
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200" alt="Showroom" />
          </div>
          <div className="glow-effect"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
