import React from 'react';
import { Search, Banknote, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../components/Services.css';

const ServicesPage = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container fade-in" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>
            {t('services.title')}
          </h1>
          <p style={{ color: '#666', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            {t('services.subtitle')}
          </p>
        </div>

        <div className="services-grid" style={{ marginBottom: '80px' }}>
          <div className="service-card" style={{ padding: '40px' }}>
            <div className="service-icon" style={{ marginBottom: '20px' }}><Search size={48} strokeWidth={1.5} /></div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{t('services.sourcingTitle')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {t('services.sourcingDesc')}
            </p>
          </div>
          
          <div className="service-card" style={{ padding: '40px' }}>
            <div className="service-icon" style={{ marginBottom: '20px' }}><Banknote size={48} strokeWidth={1.5} /></div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{t('services.financeTitle')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {t('services.financeDesc')}
            </p>
          </div>
          
          <div className="service-card" style={{ padding: '40px' }}>
            <div className="service-icon" style={{ marginBottom: '20px' }}><ShieldCheck size={48} strokeWidth={1.5} /></div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{t('services.salesTitle')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              {t('services.salesDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
