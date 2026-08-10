import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarCard from './CarCard';
import { useLanguage } from '../context/LanguageContext';
import './Inventory.css';
import './Skeleton.css';

// Mock data as fallback
export const mockCars = [
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

const Inventory = () => {
  const [cars, setCars] = useState(mockCars);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars?isFeatured=true', { timeout: 1000 });
        if (response.data && response.data.length > 0) {
          setCars(response.data);
        }
      } catch (error) {
        // Backend not running, just keep using mockCars
      }
    };

    fetchCars();
  }, []);

  return (
    <section className="inventory-section">
      <div className="container">
        <div className="inventory-header">
          <h2>{t('inventory.featuredTitle')}</h2>
          <p>{t('inventory.featuredSubtitle')}</p>
        </div>
        
        {loading ? (
          <div className="inventory-grid">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="inventory-grid">
            {cars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}

        <div className="view-all-container">
          <Link to="/inventory" className="btn btn-outline">{t('hero.explore')}</Link>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
