import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './CarCard.css';

const CarCard = ({ car }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(car);
    setAdded(true);
    setTimeout(() => setAdded(false), 500);
  };

  const handleCardClick = () => {
    navigate(`/car/${car._id || car.id || 1}`);
  };

  return (
    <div onClick={handleCardClick} className="car-card fade-in" style={{ cursor: 'pointer' }}>
      <div className="car-image-container">
        <img src={car.image} alt={`${car.make} ${car.model}`} onError={(e) => { e.target.src = 'https://placehold.co/800x500/333/FFF?text=Car+Image+Not+Found'; }} />
        <div className="car-badges" style={{ left: '16px', right: 'auto' }}>
          {car.status === 'Sold' ? (
            <span className="badge sold">{t('inventory.sold')}</span>
          ) : (
            <span className="badge new">{car.year}</span>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          style={{
            position: 'absolute', bottom: '15px', right: '15px', top: 'auto',
            background: added ? '#28a745' : 'rgba(255,255,255,0.9)', 
            border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', zIndex: 2,
            transition: 'all 0.3s ease'
          }}
          title={added ? t('inventory.added') : t('inventory.addToCart')}
        >
          {added ? <Check size={18} color="#fff" /> : <ShoppingCart size={18} color="#000" />}
        </button>
      </div>
      <div className="car-info">
        <h3 className="car-title">{car.make} {car.model}</h3>
        <div className="car-specs">
          <span>{car.year}</span>
          <span className="dot">•</span>
          <span>{car.mileage}</span>
        </div>
        <div className="car-price-row">
          <div className="price-info">
            <span className="price-label">{t('inventory.startingFrom')}</span>
            <span className="price-value">{car.price}</span>
          </div>
          <span className="btn-icon">→</span >
        </div>
      </div>
    </div>
  );
};

export default CarCard;
