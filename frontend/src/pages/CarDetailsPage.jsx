import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EnquireModal from '../components/EnquireModal';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './CarDetailsPage.css';

const mockCarDetails = {
  '1': {
    _id: '1', make: 'Mercedes-Benz', model: 'G63 AMG', year: 2025, mileage: '0 km', price: 'AED 799,000',
    description: {
      en: 'The G63 AMG blends iconic design with formidable performance. Features include a bespoke handcrafted interior and unparalleled off-road capabilities.',
      uz: 'G63 AMG afsonaviy dizayn va kuchli ishlash qobiliyatini o\'zida mujassam etgan. Qo\'lda ishlangan salon va tengsiz yo\'ltanlamas xususiyatlari bilan ajralib turadi.',
      ru: 'G63 AMG сочетает в себе культовый дизайн и потрясающую производительность. Особенности включают созданный вручную интерьер и непревзойденные внедорожные возможности.'
    },
    exterior: ['/images/cars/mercedes_g63_1786365903795.jpg'],
    interior: ['/images/cars/mercedes_interior_1786366316986.jpg'],
    image: '/images/cars/mercedes_g63_1786365903795.jpg'
  },
  '2': {
    _id: '2', make: 'Land Rover', model: 'Range Rover Vogue', year: 2025, mileage: '5,000 km', price: 'AED 536,000',
    description: {
      en: 'The pinnacle of refined capability, this Range Rover Vogue offers supreme comfort, a commanding driving position, and advanced technology.',
      uz: 'Qulaylik va qobiliyat cho\'qqisi bo\'lgan bu Range Rover Vogue yuqori darajadagi qulaylik, zo\'r boshqaruv va ilg\'or texnologiyalarni taqdim etadi.',
      ru: 'Вершина утонченных возможностей, этот Range Rover Vogue предлагает высочайший комфорт, уверенную посадку за рулем и передовые технологии.'
    },
    exterior: ['/images/cars/range_rover_1786365914499.jpg'],
    interior: ['/images/cars/range_rover_interior_1786366328194.jpg'],
    image: '/images/cars/range_rover_1786365914499.jpg'
  },
  '3': {
    _id: '3', make: 'Porsche', model: '911 Turbo S', year: 2024, mileage: '12,000 km', price: 'AED 665,000',
    description: {
      en: 'The ultimate everyday supercar. The 911 Turbo S combines blistering pace with remarkable everyday usability and build quality.',
      uz: 'Har kunlik mukammal superkar. 911 Turbo S chaqmoqdek tezlikni ajoyib kundalik qulaylik va yuqori qurilish sifati bilan birlashtiradi.',
      ru: 'Идеальный суперкар на каждый день. 911 Turbo S сочетает молниеносную скорость с поразительным повседневным удобством и качеством сборки.'
    },
    exterior: ['/images/cars/porsche_911_1786365927172.jpg'],
    interior: ['/images/cars/porsche_interior_1786366339024.jpg'],
    image: '/images/cars/porsche_911_1786365927172.jpg'
  },
  '4': {
    _id: '4', make: 'Lamborghini', model: 'Urus', year: 2024, mileage: '1,500 km', price: 'AED 1,450,000',
    description: {
      en: 'The world\'s first Super Sport Utility Vehicle. Uncompromising performance, extreme proportions, and stunning Italian design.',
      uz: 'Dunyodagi birinchi Super Sport Utility Vehicle. Murosasiz ishlash, ekstremal proporsiyalar va hayratlanarli italyancha dizayn.',
      ru: 'Первый в мире Super Sport Utility Vehicle. Бескомпромиссная производительность, экстремальные пропорции и потрясающий итальянский дизайн.'
    },
    exterior: ['/images/cars/lambo_urus_1786365940452.jpg'],
    interior: ['/images/cars/lambo_interior_1786366351119.jpg'],
    image: '/images/cars/lambo_urus_1786365940452.jpg'
  },
  '5': {
    _id: '5', make: 'Rolls-Royce', model: 'Cullinan', year: 2025, mileage: '0 km', price: 'AED 1,900,000',
    description: {
      en: 'The Cullinan brings Rolls-Royce\'s legendary Magic Carpet Ride to all terrains. Pure luxury combined with effortless capability.',
      uz: 'Cullinan Rolls-Royce\'ning afsonaviy "Sehrli Gilam" haydash hissini barcha yo\'llarga olib chiqadi. Toza hashamat va osonlik bilan yengib o\'tish qobiliyati.',
      ru: 'Cullinan переносит легендарную плавность хода Rolls-Royce "Волшебный ковер" на любые ландшафты. Чистая роскошь в сочетании с легкостью управления.'
    },
    exterior: ['/images/cars/rolls_royce_1786365955282.jpg'],
    interior: ['/images/cars/rolls_royce_interior_1786366362340.jpg'],
    image: '/images/cars/rolls_royce_1786365955282.jpg'
  },
  '6': {
    _id: '6', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, mileage: '4,200 km', price: 'AED 2,150,000',
    description: {
      en: 'A paradigm shift for Ferrari. The SF90 Stradale is their first series-production PHEV, offering unprecedented performance.',
      uz: 'Ferrari uchun mutlaqo yangi bosqich. SF90 Stradale ularning birinchi seriyali ishlab chiqarilgan PHEV avtomobili bo\'lib, mislsiz tezlikni taqdim etadi.',
      ru: 'Смена парадигмы для Ferrari. SF90 Stradale — их первый серийный PHEV, предлагающий беспрецедентную производительность.'
    },
    exterior: ['/images/cars/ferrari_sf90_1786365973233.jpg'],
    interior: ['/images/cars/ferrari_interior_1786366372864.jpg'],
    image: '/images/cars/ferrari_sf90_1786365973233.jpg'
  }
};

const CarDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [car, setCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [galleryType, setGalleryType] = useState('exterior');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch from /api/cars/:id
    const data = mockCarDetails[id] || mockCarDetails['1'];
    setCar(data);
  }, [id]);

  if (!car) return <div className="loading">Loading details...</div>;

  const images = galleryType === 'exterior' ? car.exterior : car.interior;

  const handleAddToCart = () => {
    addToCart(car);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
