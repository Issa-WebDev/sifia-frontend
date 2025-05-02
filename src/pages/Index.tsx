
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import OffersSection from '../components/OffersSection';
import ContactSection from '../components/ContactSection';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';
import PartnersCarousel from '../components/PartnersCarousel';
import BusinessAreas from '../components/BusinessAreas';
import TeamSection from '../components/TeamSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 my-8">
        <CountdownTimer />
      </div>
      <AboutSection />
      <BusinessAreas />
      <TeamSection />
      <OffersSection />
      <PartnersCarousel />
      <RegisterForm />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
