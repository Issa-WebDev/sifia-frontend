
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="sifia-section bg-white" id="contact">
      <div className="sifia-container">
        <div className="text-center mb-12">
          <h2 className="sifia-heading">{t('contactTitle')}</h2>
          <p className="sifia-subheading">{t('contactSubtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <form className="space-y-6">
              <div>
                <label className="block text-sifia-blue font-medium mb-2" htmlFor="name">
                  {t('nameLabel')} *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sifia-blue font-medium mb-2" htmlFor="email">
                  {t('emailLabel')} *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sifia-blue font-medium mb-2" htmlFor="phone">
                  {t('phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sifia-blue font-medium mb-2" htmlFor="message">
                  {t('messageLabel')} *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="sifia-button-primary"
              >
                {t('sendBtn')}
              </button>
            </form>
          </div>
          
          <div className="animate-fade-in">
            <div className="bg-sifia-blue text-white rounded-lg p-8 h-full">
              <h3 className="text-2xl font-serif font-bold mb-6">SIFIA</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 shrink-0 text-sifia-gold" />
                  <p>{t('address')}</p>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 shrink-0 text-sifia-gold" />
                  <p>{t('phone')}</p>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 shrink-0 text-sifia-gold" />
                  <p>{t('email')}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4271884873005!2d-4.016267485723413!3d5.3384106371159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eaff1b57a20f%3A0xc6fab0b15d1b16de!2sHotel%20Ivoire%20Sofitel!5e0!3m2!1sen!2sus!4v1651250231936!5m2!1sen!2sus" 
                    width="100%" 
                    height="200" 
                    style={{ border: 0, borderRadius: '0.5rem' }} 
                    allowFullScreen 
                    loading="lazy"
                    title="SIFIA Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
