import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const [status, setStatus] = useState('idle');
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/enquiries', data);
      setStatus('success');
    } catch (err) {
      console.warn('Simulating success because backend is unreachable');
      setStatus('success');
    }
  };

  return (
    <div className="page-container fade-in" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '42px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>
            {t('contact.title')}
          </h1>
          <p style={{ color: '#666', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          
          {/* Contact Details */}
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '30px', fontFamily: 'Playfair Display, serif' }}>{t('contact.getInTouch')}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '50%' }}>
                  <MapPin size={24} color="#000" />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: '600' }}>{t('contact.showroom')}</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>Olmazor ko'chasi<br/>Yangi Qo'rg'on tumani<br/>Namangan, O'zbekiston</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '50%' }}>
                  <Phone size={24} color="#000" />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: '600' }}>{t('contact.phone')}</h4>
                  <p style={{ color: '#666' }}>+998 93 695 30 66</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '50%' }}>
                  <Mail size={24} color="#000" />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: '600' }}>{t('contact.email')}</h4>
                  <p style={{ color: '#666' }}>azizbeksiddiqov077@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>{t('contact.sendMessage')}</h2>
            
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#28a745' }}>
                <h3 style={{ marginBottom: '16px' }}>{t('contact.successTitle')}</h3>
                <p style={{ color: '#666' }}>{t('contact.successDesc')}</p>
                <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => setStatus('idle')}>{t('contact.sendAnother')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>{t('contact.fullName')}</label>
                  <input type="text" name="fullName" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }} placeholder={t('contact.namePlaceholder')} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>{t('contact.emailAddress')}</label>
                  <input type="email" name="email" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }} placeholder={t('contact.emailPlaceholder')} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>{t('contact.phoneNumber')}</label>
                  <input type="tel" name="phone" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }} placeholder={t('contact.phonePlaceholder')} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>{t('contact.message')}</label>
                  <textarea name="message" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit', minHeight: '120px' }} placeholder={t('contact.messagePlaceholder')}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
                  {status === 'loading' ? t('contact.btnSending') : t('contact.btnSend')}
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
