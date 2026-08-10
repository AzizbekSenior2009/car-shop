import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <h2>Mayfair</h2>
              <span>automotive haus</span>
            </div>
            <p className="footer-desc">
              {t('footer.desc')}
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram" style={{fontWeight: 'bold', fontSize: '12px'}}>IG</a>
              <a href="#" aria-label="Twitter" style={{fontWeight: 'bold', fontSize: '12px'}}>X</a>
              <a href="#" aria-label="Facebook" style={{fontWeight: 'bold', fontSize: '12px'}}>FB</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>{t('footer.quickLinks')}</h3>
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/inventory">{t('nav.inventory')}</Link></li>
              <li><Link to="/services">{t('footer.services')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>{t('footer.company')}</h3>
            <ul>
              <li><Link to="/">{t('footer.about')}</Link></li>
              <li><Link to="/">{t('footer.careers')}</Link></li>
              <li><Link to="/">{t('footer.privacy')}</Link></li>
              <li><Link to="/">{t('footer.terms')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>{t('footer.contact')}</h3>
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <p>Olmazor ko'chasi, Yangi Qo'rg'on tumani, Namangan, O'zbekiston</p>
            </div>
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <p>+998 93 695 30 66</p>
            </div>
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <p>azizbeksiddiqov077@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mayfair Automotive Haus. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
