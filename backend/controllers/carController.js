const mongoose = require('mongoose');
const Car = require('../models/Car');

// Fallback data when MongoDB is not connected
const fallbackCars = [
  { _id: '1', make: 'Mercedes-Benz', model: 'G63 AMG', year: 2025, mileage: '0 km', price: 'AED 799,000', image: '/images/cars/mercedes_g63_1786365903795.jpg', isFeatured: true, description: { en: 'The iconic G-Wagon, redefining luxury and off-road capability.', uz: "Afsonaviy G-Wagon, hashamat va off-road qobiliyatining yangi darajasi.", ru: 'Легендарный G-Wagon, переосмысливающий роскошь и внедорожные возможности.' }, exterior: ['/images/cars/mercedes_g63_1786365903795.jpg'], interior: ['/images/cars/mercedes_interior_1786366316986.jpg'] },
  { _id: '2', make: 'Land Rover', model: 'Range Rover Vogue', year: 2025, mileage: '5,000 km', price: 'AED 536,000', image: '/images/cars/range_rover_1786365914499.jpg', isFeatured: true, description: { en: 'Unparalleled refinement and all-terrain capability.', uz: "Tengsiz bejirimlik va har qanday yo'lga moslashuvchanlik.", ru: 'Непревзойденная изысканность и проходимость.' }, exterior: ['/images/cars/range_rover_1786365914499.jpg'], interior: ['/images/cars/range_rover_interior_1786366328194.jpg'] },
  { _id: '3', make: 'Porsche', model: '911 Turbo S', year: 2024, mileage: '12,000 km', price: 'AED 665,000', image: '/images/cars/porsche_911_1786365927172.jpg', isFeatured: true, description: { en: 'The ultimate everyday supercar with breathtaking performance.', uz: "Nafasni tortib oladigan tezlikka ega kundalik superkar.", ru: 'Идеальный суперкар на каждый день с захватывающей динамикой.' }, exterior: ['/images/cars/porsche_911_1786365927172.jpg'], interior: ['/images/cars/porsche_interior_1786366339024.jpg'] },
  { _id: '4', make: 'Lamborghini', model: 'Urus', year: 2024, mileage: '1,500 km', price: 'AED 1,450,000', image: '/images/cars/lambo_urus_1786365940452.jpg', isFeatured: true, description: { en: 'The world\'s first Super Sport Utility Vehicle.', uz: "Dunyodagi birinchi Super Sport Utility Vehicle.", ru: 'Первый в мире Super Sport Utility Vehicle.' }, exterior: ['/images/cars/lambo_urus_1786365940452.jpg'], interior: ['/images/cars/lambo_interior_1786366351119.jpg'] },
  { _id: '5', make: 'Rolls-Royce', model: 'Cullinan', year: 2025, mileage: '0 km', price: 'AED 1,900,000', image: '/images/cars/rolls_royce_1786365955282.jpg', isFeatured: true, description: { en: 'Absolute luxury, wherever your journey takes you.', uz: "Sayohat qayerga bormasin, mutlaq hashamat.", ru: 'Абсолютная роскошь, куда бы вы ни отправились.' }, exterior: ['/images/cars/rolls_royce_1786365955282.jpg'], interior: ['/images/cars/rolls_royce_interior_1786366362340.jpg'] },
  { _id: '6', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, mileage: '4,200 km', price: 'AED 2,150,000', image: '/images/cars/ferrari_sf90_1786365973233.jpg', isFeatured: true, description: { en: 'A revolutionary hybrid supercar combining V8 power with electric motors.', uz: "V8 dvigateli va elektr motorlarni o'zida mujassam etgan inqilobiy gibrid superkar.", ru: 'Революционный гибридный суперкар, сочетающий мощность V8 с электромоторами.' }, exterior: ['/images/cars/ferrari_sf90_1786365973233.jpg'], interior: ['/images/cars/ferrari_interior_1786366372864.jpg'] }
];

// Get all cars
const getCars = async (req, res) => {
  try {
    const { isFeatured } = req.query;
    
    // Check if connected to DB
    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (isFeatured === 'true') {
        query.isFeatured = true;
      }
      const cars = await Car.find(query);
      if (cars.length > 0) return res.json(cars);
    }
    
    // Fallback to local JSON if DB fails or is empty
    let result = fallbackCars;
    if (isFeatured === 'true') {
      result = fallbackCars.filter(car => car.isFeatured);
    }
    res.json(result);
  } catch (err) {
    res.json(fallbackCars);
  }
};

// Get car by ID
const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (mongoose.connection.readyState === 1) {
      const car = await Car.findById(id);
      if (car) return res.json(car);
    }
    
    // Fallback
    const fallbackCar = fallbackCars.find(c => c._id === id);
    if (fallbackCar) {
      res.json(fallbackCar);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (err) {
    const fallbackCar = fallbackCars.find(c => c._id === req.params.id);
    if (fallbackCar) return res.json(fallbackCar);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCars,
  getCarById
};
