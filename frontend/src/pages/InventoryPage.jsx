import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { useLanguage } from '../context/LanguageContext';
import '../components/Inventory.css';
import '../components/Skeleton.css';

const mockCars = [
  { _id: '1', make: 'Mercedes-Benz', model: 'G63 AMG', year: 2025, mileage: '0 km', price: 'AED 799,000', image: '/images/cars/mercedes_g63_1786365903795.jpg' },
  { _id: '2', make: 'Land Rover', model: 'Range Rover Vogue', year: 2025, mileage: '5,000 km', price: 'AED 536,000', image: '/images/cars/range_rover_1786365914499.jpg' },
  { _id: '3', make: 'Porsche', model: '911 Turbo S', year: 2024, mileage: '12,000 km', price: 'AED 665,000', image: '/images/cars/porsche_911_1786365927172.jpg' },
  { _id: '4', make: 'Lamborghini', model: 'Urus', year: 2024, mileage: '1,500 km', price: 'AED 1,450,000', image: '/images/cars/lambo_urus_1786365940452.jpg' },
  { _id: '5', make: 'Rolls-Royce', model: 'Cullinan', year: 2025, mileage: '0 km', price: 'AED 1,900,000', image: '/images/cars/rolls_royce_1786365955282.jpg' },
  { _id: '6', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, mileage: '4,200 km', price: 'AED 2,150,000', image: '/images/cars/ferrari_sf90_1786365973233.jpg' }
];

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
  const [cars, setCars] = useState(mockCars);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars', { timeout: 1000 });
        if (response.data && response.data.length > 0) {
          setCars(response.data);
        }
      } catch (error) {
        // Keep mockCars
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
