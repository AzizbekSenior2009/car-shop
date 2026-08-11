import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ShieldCheck, Trophy } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  const videos = [
    {
      id: 'bzHzBlFQGco',
      title: 'Mercedes-Benz G63 AMG',
      desc: t('about.videoDesc') // Reusing the translation description or we can make specific ones later
    },
    {
      id: 'e2bxvq9LMO4',
      title: 'Porsche 911 Turbo S',
      desc: t('about.videoDesc')
    },
    {
      id: '85Qnin9JkNM',
      title: 'Lamborghini Urus',
      desc: t('about.videoDesc')
    },
    {
      id: '7GvW70vAq_g',
      title: 'Range Rover Vogue',
      desc: t('about.videoDesc')
    }
  ];

  return (
    <div className="page-container fade-in" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '42px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>
            {t('about.title')}
          </h1>
          <p style={{ color: 'var(--primary-color)', fontSize: '20px', fontWeight: '500', marginBottom: '24px' }}>
            {t('about.subtitle')}
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto', color: '#666', fontSize: '18px', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '16px' }}>{t('about.desc1')}</p>
            <p>{t('about.desc2')}</p>
          </div>
        </div>

        {/* Statistics Section */}
        <div style={{ marginBottom: '100px', padding: '60px 0', background: '#f8f8f8', borderRadius: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontFamily: 'Playfair Display, serif', marginBottom: '40px' }}>
            {t('about.statsTitle')}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
            
            <div style={{ flex: '1 1 250px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
                <Trophy size={48} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '48px', fontFamily: 'Playfair Display, serif', marginBottom: '8px' }}>
                {t('about.stat1')}
              </h3>
              <p style={{ color: '#666', fontSize: '16px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t('about.stat1Desc')}
              </p>
            </div>
            
            <div style={{ flex: '1 1 250px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
                <Globe size={48} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '48px', fontFamily: 'Playfair Display, serif', marginBottom: '8px' }}>
                {t('about.stat2')}
              </h3>
              <p style={{ color: '#666', fontSize: '16px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t('about.stat2Desc')}
              </p>
            </div>
            
            <div style={{ flex: '1 1 250px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
                <ShieldCheck size={48} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '48px', fontFamily: 'Playfair Display, serif', marginBottom: '8px' }}>
                {t('about.stat3')}
              </h3>
              <p style={{ color: '#666', fontSize: '16px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t('about.stat3Desc')}
              </p>
            </div>
            
          </div>
        </div>

        {/* Video Showcases (Zig-Zag) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '-40px' }}>
            <h2 style={{ fontSize: '32px', fontFamily: 'Playfair Display, serif' }}>
              {t('about.videoTitle')}
            </h2>
          </div>
          
          {videos.map((vid, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={vid.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                <div style={{ order: isEven ? 1 : 2 }}>
                  <h3 style={{ fontSize: '28px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>
                    {vid.title}
                  </h3>
                  <p style={{ color: '#666', fontSize: '18px', lineHeight: '1.8' }}>
                    {vid.desc}
                  </p>
                </div>
                
                <div style={{ order: isEven ? 2 : 1, position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <iframe 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${vid.id}?autoplay=0&mute=1&loop=1&playlist=${vid.id}`}
                    title={vid.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
