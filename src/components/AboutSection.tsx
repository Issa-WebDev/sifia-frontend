
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="sifia-section bg-white" id="about">
      <div className="sifia-container">
        <div className="text-center mb-12">
          <h2 className="sifia-heading">{t('aboutTitle')}</h2>
          <p className="sifia-subheading">{t('aboutSubtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:order-2">
            <p className="text-lg text-sifia-gray">
              {t('aboutText1')}
            </p>
            <p className="text-lg text-sifia-gray">
              {t('aboutText2')}
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-sifia-blue hover:text-white transition-colors duration-300">
                <h4 className="font-semibold">{t('aboutHistory')}</h4>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-sifia-blue hover:text-white transition-colors duration-300">
                <h4 className="font-semibold">{t('aboutVision')}</h4>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center hover:bg-sifia-blue hover:text-white transition-colors duration-300">
                <h4 className="font-semibold">{t('aboutObjectives')}</h4>
              </div>
            </div>
          </div>
          
          <div className="md:order-1">
            <div className="relative">
              <div className="bg-sifia-blue/10 absolute -top-4 -left-4 w-full h-full rounded-lg"></div>
              <img 
                src="/apropos.png" 
                alt="SIFIA Event" 
                className="rounded-lg shadow-md object-cover w-full h-80 relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sifia-gold/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
