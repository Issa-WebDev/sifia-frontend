
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronRight, Award, Target, History } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-sifia-dark-blue to-sifia-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 animate-fade-in">
            {t('aboutTitle')}
          </h1>
          <div className="flex items-center text-gray-200 animate-fade-in">
            <span className="mr-2">{t('home')}</span>
            <ChevronRight size={16} />
            <span className="ml-2 text-white font-medium">{t('about')}</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-sifia-blue mb-8">{t('aboutSubtitle')}</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
              <div>
                <p className="text-lg text-sifia-gray mb-6">
                  {t('aboutText1')}
                </p>
                <p className="text-lg text-sifia-gray">
                  {t('aboutText2')}
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-sifia-gold/10 absolute -top-4 -left-4 w-full h-full rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560523159-6b681a1e7da9" 
                  alt="SIFIA Networking" 
                  className="rounded-lg shadow-md object-cover w-full h-80 relative z-10"
                />
              </div>
            </div>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 bg-sifia-blue/10 w-14 h-14 rounded-full flex items-center justify-center">
                  <History className="text-sifia-dark-blue" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-sifia-blue">{t('aboutHistory')}</h3>
                <p className="text-sifia-gray">
                  {t('aboutHistoryText')}
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 bg-sifia-gold/10 w-14 h-14 rounded-full flex items-center justify-center">
                  <Target className="text-sifia-gold" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-sifia-blue">{t('aboutVision')}</h3>
                <p className="text-sifia-gray">
                  {t('aboutVisionText')}
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="mb-4 bg-sifia-blue/10 w-14 h-14 rounded-full flex items-center justify-center">
                  <Award className="text-sifia-light-blue" size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-sifia-blue">{t('aboutObjectives')}</h3>
                <p className="text-sifia-gray">
                  {t('aboutObjectivesText')}
                </p>
              </div>
            </div>
            
            {/* Key Facts */}
            <div className="bg-sifia-blue text-white p-8 md:p-12 rounded-lg mb-16">
              <h3 className="text-2xl font-serif font-bold mb-8 text-center">{t('aboutFactsTitle')}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-sifia-gold mb-2">3000+</div>
                  <div className="text-gray-200">{t('aboutFactsParticipants')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-sifia-gold mb-2">150+</div>
                  <div className="text-gray-200">{t('aboutFactsExhibitors')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-sifia-gold mb-2">25+</div>
                  <div className="text-gray-200">{t('aboutFactsCountries')}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-sifia-gold mb-2">20+</div>
                  <div className="text-gray-200">{t('aboutFactsConferences')}</div>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-sifia-blue mb-8 text-center">{t('aboutTestimonialsTitle')}</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="italic text-sifia-gray mb-4">
                    "Le SIFIA représente une opportunité exceptionnelle pour développer notre réseau d'affaires en Afrique. Nous avons pu nouer des partenariats stratégiques dès la première édition."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-sifia-blue/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sifia-blue font-semibold">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sifia-blue">Jean Dupont</div>
                      <div className="text-sm text-sifia-gray">Directeur Commercial, Entreprise XYZ</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="italic text-sifia-gray mb-4">
                    "Un événement de grande qualité qui nous a permis d'explorer les opportunités d'investissement en Côte d'Ivoire et en Afrique de l'Ouest. Une organisation impeccable."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-sifia-gold/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-sifia-gold font-semibold">AM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sifia-blue">Amina Mensah</div>
                      <div className="text-sm text-sifia-gray">CEO, Global Investments Ltd</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-3xl font-serif font-bold text-sifia-blue mb-6">{t('aboutReadyToJoin')}</h3>
          <p className="text-lg text-sifia-gray mb-8 max-w-2xl mx-auto">
            {t('aboutJoinText')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/register" className="sifia-button-secondary text-center">
              {t('registerBtn')}
            </a>
            <a href="/contact" className="sifia-button-outline text-center">
              {t('contactBtn')}
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
