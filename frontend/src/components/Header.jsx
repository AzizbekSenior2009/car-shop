import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import EnquireModal from './EnquireModal';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  const { language, changeLanguage, t } = useLanguage();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="logo" onClick={handleLinkClick}>
            <h2>Mayfair</h2>
            <span>automotive haus</span>
          </Link>
          
          <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" className={isActive('/')} onClick={handleLinkClick}>{t('nav.home')}</Link></li>
              <li><Link to="/inventory" className={isActive('/inventory')} onClick={handleLinkClick}>{t('nav.inventory')}</Link></li>
              <li><Link to="/services" className={isActive('/services')} onClick={handleLinkClick}>{t('nav.about')}</Link></li>
              <li><Link to="/contact" className={isActive('/contact')} onClick={handleLinkClick}>{t('nav.contact')}</Link></li>
            </ul>
            <div className="header-actions-mobile">
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                <span onClick={() => changeLanguage('uz')} style={{ cursor: 'pointer', fontWeight: language === 'uz' ? 'bold' : 'normal' }}>UZ</span>
                <span>|</span>
                <span onClick={() => changeLanguage('ru')} style={{ cursor: 'pointer', fontWeight: language === 'ru' ? 'bold' : 'normal' }}>RU</span>
                <span>|</span>
                <span onClick={() => changeLanguage('en')} style={{ cursor: 'pointer', fontWeight: language === 'en' ? 'bold' : 'normal' }}>EN</span>
              </div>
              <button className="btn btn-primary" onClick={() => {setIsModalOpen(true); setIsMenuOpen(false)}}>Enquire</button>
            </div>
          </nav>
          
          {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
          
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
              <span onClick={() => changeLanguage('uz')} style={{ cursor: 'pointer', fontWeight: language === 'uz' ? 'bold' : 'normal', color: language === 'uz' ? '#000' : '#888' }}>UZ</span>
              <span style={{ color: '#ccc' }}>|</span>
              <span onClick={() => changeLanguage('ru')} style={{ cursor: 'pointer', fontWeight: language === 'ru' ? 'bold' : 'normal', color: language === 'ru' ? '#000' : '#888' }}>RU</span>
              <span style={{ color: '#ccc' }}>|</span>
              <span onClick={() => changeLanguage('en')} style={{ cursor: 'pointer', fontWeight: language === 'en' ? 'bold' : 'normal', color: language === 'en' ? '#000' : '#888' }}>EN</span>
            </div>

            <div 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: 'var(--primary-color)', color: '#fff',
                  borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {cart.length}
                </span>
              )}
            </div>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Enquire</button>
          </div>
        </div>
      </header>

      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
