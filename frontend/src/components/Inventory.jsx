import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarCard from './CarCard';
import { useLanguage } from '../context/LanguageContext';
import './Inventory.css';
import './Skeleton.css';

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
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars?isFeatured=true');
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
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
