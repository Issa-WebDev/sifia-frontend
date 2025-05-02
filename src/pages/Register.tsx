
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-sifia-blue text-center">{t('registerTitle')}</h1>
        </div>
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
