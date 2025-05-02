
import React from 'react';
import { Language, useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => setLanguage('fr')}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${language === 'fr' ? 'bg-sifia-blue text-white' : 'bg-gray-200 text-gray-600'}`}
        title="Français"
      >
        FR
      </button>
      <button 
        onClick={() => setLanguage('en')}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${language === 'en' ? 'bg-sifia-blue text-white' : 'bg-gray-200 text-gray-600'}`}
        title="English"
      >
        EN
      </button>
      <button 
        onClick={() => setLanguage('tr')}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${language === 'tr' ? 'bg-sifia-blue text-white' : 'bg-gray-200 text-gray-600'}`}
        title="Türkçe"
      >
        TR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
