import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { t } = useLanguage();
  const [status, setStatus] = useState('idle');
  const [submittedCars, setSubmittedCars] = useState([]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      cars: cart.map(c => `${c.make} ${c.model} (${c.year})`)
    };

    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/enquiries', data);
      setSubmittedCars([...cart]);
      setStatus('success');
      clearCart();
    } catch (err) {
      console.warn('Backend not reachable, simulating success for demo purposes:', err);
      setSubmittedCars([...cart]);
      setStatus('success');
      clearCart();
    }
  };

  if (status === 'success') {
    return (
      <div className="page-container fade-in" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <CheckCircle size={72} color="#28a745" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '36px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>{t('cart.successTitle')}</h2>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '18px' }}>
              {t('cart.successMessage')}
            </p>
          </div>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {submittedCars.map((car, idx) => (
              <div key={idx} className="cart-item-card" style={{ padding: '16px' }}>
                <img src={car.image} alt={car.make} className="cart-item-image" onError={(e) => { e.target.src = 'https://placehold.co/800x500/333/FFF?text=Car+Image'; }} style={{ width: '100px', height: '70px' }} />
                <div className="cart-item-details">
                  <h4 className="cart-item-title" style={{ fontSize: '16px' }}>{car.make} {car.model}</h4>
                  <div className="cart-item-specs" style={{ fontSize: '13px', marginBottom: '4px' }}>{car.year} <span className="dot">•</span> {car.mileage}</div>
                  <div className="cart-item-price" style={{ fontSize: '15px' }}>{car.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          <Link to="/inventory" className="btn btn-primary" onClick={() => setStatus('idle')}>{t('cart.continueBrowsing')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '80px', background: '#f8f9fa' }}>
      <div className="container">
        
        <div className="cart-page-header">
          <h1 className="cart-page-title">
            {t('cart.title')} ({cart.length})
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>{t('cart.subtitle')}</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-state">
            <div style={{ background: '#fff', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
               <X size={32} color="#ccc" />
            </div>
            <h3 style={{ fontSize: '24px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>{t('cart.emptyTitle')}</h3>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>{t('cart.emptySubtitle')}</p>
            <Link to="/inventory" className="btn btn-primary">{t('cart.explore')} <ArrowRight size={18} style={{ marginLeft: '8px' }} /></Link>
          </div>
        ) : (
          <div className="cart-layout">
            
            {/* Cart Items */}
            <div className="cart-items-container">
              {cart.map((car) => (
                <div key={car._id || car.id || Math.random()} className="cart-item-card">
                  <button 
                    onClick={() => removeFromCart(car._id || car.id)}
                    className="remove-btn"
                    title={t('cart.removeFromCart')}
                  >
                    <X size={18} />
                  </button>
                  <img src={car.image} alt={car.make} className="cart-item-image" onError={(e) => { e.target.src = 'https://placehold.co/800x500/333/FFF?text=Car+Image'; }} />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{car.make} {car.model}</h4>
                    <div className="cart-item-specs">
                      <span>{car.year}</span>
                      <span className="dot">•</span>
                      <span>{car.mileage}</span>
                    </div>
                    <div className="cart-item-price">{car.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="checkout-form-container">
              <h3 className="checkout-title">{t('cart.enquireAll')}</h3>
              <form onSubmit={handleCheckout}>
                <div className="form-group-custom">
                  <label>{t('cart.fullName')}</label>
                  <input type="text" name="fullName" required className="form-input-custom" />
                </div>
                <div className="form-group-custom">
                  <label>{t('cart.email')}</label>
                  <input type="email" name="email" required className="form-input-custom" />
                </div>
                <div className="form-group-custom">
                  <label>{t('cart.phone')}</label>
                  <input type="tel" name="phone" className="form-input-custom" placeholder="Raqamni kiriting" />
                </div>
                <div className="form-group-custom">
                  <label>{t('cart.message')}</label>
                  <textarea name="message" rows="4" className="form-input-custom"></textarea>
                </div>
                <button type="submit" className="btn btn-primary checkout-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? t('cart.processing') : t('cart.submit')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
