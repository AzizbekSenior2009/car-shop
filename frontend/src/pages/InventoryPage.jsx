import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { useLanguage } from '../context/LanguageContext';
import '../components/Inventory.css';
import '../components/Skeleton.css';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img"></div>
    <div className="skeleton-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-specs"></div>
      <div className="skeleton-price"></div>
    </div>
  </div>
);

const InventoryPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container fade-in" style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '80vh' }}>
      <div className="container">
        <div className="inventory-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>
            {t('inventory.completeTitle')}
          </h1>
          <p style={{ color: '#666', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            {t('inventory.completeSubtitle')}
          </p>
          
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input 
              type="text" 
              placeholder={t('inventory.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '30px',
                border: '1px solid #eaeaea',
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#eaeaea'}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="inventory-grid">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="inventory-grid">
            {filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#666' }}>
            <h3>{t('inventory.noResults')} "{searchTerm}"</h3>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setSearchTerm('')}>
              {t('inventory.clearSearch')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
