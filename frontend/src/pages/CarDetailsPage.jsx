import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EnquireModal from '../components/EnquireModal';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './CarDetailsPage.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryType, setGalleryType] = useState('exterior');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(true);
      }
    };
    fetchCar();
  }, [id]);

  if (error) return <div className="loading">Error loading car details.</div>;
  if (!car) return <div className="loading">Loading details...</div>;

  const images = galleryType === 'exterior' ? car.exterior : car.interior;

  const handleAddToCart = () => {
    addToCart(car);
    setAdded(true);
    setTimeout(() => setAdded(false), 500);
  };

  return (
    <>
      <div className="car-details-page fade-in">
        <div className="container details-container">
          <Link to="/inventory" className="back-link">← {t('nav.inventory')}</Link>
          
          <div className="details-header">
            <h1>{car.make} {car.model}</h1>
            <div className="details-price">{car.price}</div>
          </div>
          
          <div className="details-grid">
            <div className="gallery-section">
              <div className="main-image">
                <img src={images[activeImage] || images[0]} alt="Car view" />
              </div>
              
              <div className="gallery-controls">
                <button 
                  className={`tab-btn ${galleryType === 'exterior' ? 'active' : ''}`}
                  onClick={() => {setGalleryType('exterior'); setActiveImage(0)}}
                >
                  {t('carDetails.exterior')}
                </button>
                <button 
                  className={`tab-btn ${galleryType === 'interior' ? 'active' : ''}`}
                  onClick={() => {setGalleryType('interior'); setActiveImage(0)}}
                >
                  {t('carDetails.interior')}
                </button>
              </div>

              <div className="thumbnails">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="info-section">
              <div className="specs-card">
                <h3>{t('carDetails.specifications')}</h3>
                <ul>
                  <li><strong>Make:</strong> {car.make}</li>
                  <li><strong>Model:</strong> {car.model}</li>
                  <li><strong>Year:</strong> {car.year}</li>
                  <li><strong>Mileage:</strong> {car.mileage}</li>
                </ul>
              </div>
              
              <div className="description-card">
                <h3>Description</h3>
                <p>{car.description[language] || car.description['en']}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setIsModalOpen(true)}>
                  Enquire About This Vehicle
                </button>
                <button 
                  className="btn" 
                  style={{ 
                    flex: 1, 
                    background: added ? '#28a745' : '#f5f5f5', 
                    color: added ? '#fff' : '#000', 
                    border: added ? '1px solid #28a745' : '1px solid #ddd',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={handleAddToCart}
                >
                  {added ? `✓ ${t('inventory.added')}` : t('inventory.addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} carName={`${car.make} ${car.model}`} />
    </>
  );
};

export default CarDetailsPage;
