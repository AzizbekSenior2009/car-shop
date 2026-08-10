import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '72px', color: 'var(--primary-color)', marginBottom: '20px' }}>404</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>{t('notFound.title')}</h2>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        {t('notFound.subtitle')}
      </p>
      <Link to="/" className="btn btn-primary">
        {t('notFound.returnHome')}
      </Link>
    </div>
  );
};

export default NotFoundPage;
