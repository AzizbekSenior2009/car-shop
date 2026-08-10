import React from 'react';
import { Search, Banknote, ShieldCheck } from 'lucide-react';
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-header text-center">
          <h2 className="section-title">Bespoke Services</h2>
          <p className="section-subtitle">Beyond sales, we offer comprehensive automotive solutions.</p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><Search size={40} strokeWidth={1.5} /></div>
            <h3>Vehicle Sourcing</h3>
            <p>Can't find what you're looking for? Our global network allows us to source any specific vehicle you desire.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><Banknote size={40} strokeWidth={1.5} /></div>
            <h3>In-house Finance</h3>
            <p>Tailored financial solutions to make your dream car a reality with competitive rates and flexible terms.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><ShieldCheck size={40} strokeWidth={1.5} /></div>
            <h3>Consignment</h3>
            <p>Let us handle the sale of your current luxury vehicle with our discreet and professional consignment service.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
