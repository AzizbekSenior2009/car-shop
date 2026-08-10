import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('carshop_cart');
      const parsed = savedCart ? JSON.parse(savedCart) : [];
      // Ensure it's an array and filter out any corrupted items without an ID
      return Array.isArray(parsed) ? parsed.filter(c => c && (c._id || c.id)) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('carshop_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (car) => {
    setCart(prev => {
      const carId = car._id || car.id;
      if (!carId) return prev;
      if (prev.find(c => (c._id || c.id) === carId)) return prev;
      return [...prev, car];
    });
  };

  const removeFromCart = (carId) => {
    if (!carId) return;
    setCart(prev => prev.filter(c => (c._id || c.id) !== carId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
