
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-sifia-blue">SIFIA</span>
          <span className="text-sifia-gold ml-1 font-medium">2025</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link to="/" className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium">
              {t('home')}
            </Link>
            <Link to="/about" className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium">
              {t('about')}
            </Link>
            <Link to="/offers" className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium">
              {t('offers')}
            </Link>
            <Link to="/register" className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium">
              {t('register')}
            </Link>
            <Link to="/blog" className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium">
              {t('blog')}
            </Link>
            <Link to="/contact" className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium">
              {t('contact')}
            </Link>
          </div>
          
          <LanguageSwitcher />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <button 
            onClick={toggleMenu} 
            className="ml-4 text-sifia-blue focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              to="/about" 
              className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              to="/offers" 
              className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('offers')}
            </Link>
            <Link 
              to="/register" 
              className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('register')}
            </Link>
            <Link 
              to="/blog" 
              className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('blog')}
            </Link>
            <Link 
              to="/contact" 
              className="text-sifia-blue hover:text-sifia-gold transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
