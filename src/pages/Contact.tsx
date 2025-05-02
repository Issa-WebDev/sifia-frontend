
import React from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Globe } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-sifia-gold" />,
      title: t('phoneNumbers'),
      content: [
        "+225 07 59 33 08 21",
        "+225 05 95 74 46 67",
        "+225 07 88 50 78 17",
        "+225 07 58 77 44 24"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-sifia-gold" />,
      title: t('emails'),
      content: [
        "contact@sifia.net",
        "service.commercial@sifia.net",
        "marc.ekressin@sifia.net"
      ]
    },
    {
      icon: <Globe className="h-6 w-6 text-sifia-gold" />,
      title: t('website'),
      content: ["www.sifia.net"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-sifia-blue">{t('contactTitle')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('contactSubtitle')}</p>
          </div>
          
          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              >
                <div className="bg-sifia-blue/10 p-4 rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                <div className="space-y-2">
                  {info.content.map((item, i) => (
                    <p key={i} className="text-gray-600">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-sifia-blue">{t('getInTouch')}</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      {t('nameLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      {t('emailLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                    {t('subjectLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                    {t('messageLabel')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
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
            
            {/* Map and Address */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-sifia-blue">{t('eventLocation')}</h2>
                <p className="text-lg mb-6">Sofitel Abidjan Hotel Ivoire, Côte d'Ivoire</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4271884873005!2d-4.016267485723413!3d5.3384106371159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eaff1b57a20f%3A0xc6fab0b15d1b16de!2sHotel%20Ivoire%20Sofitel!5e0!3m2!1sen!2sus!4v1651250231936!5m2!1sen!2sus" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0, borderRadius: '0.5rem' }} 
                    allowFullScreen 
                    loading="lazy"
                    title="SIFIA Location"
                  ></iframe>
                </div>
              </div>
              
              <div className="bg-sifia-blue text-white rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">{t('participateTitle')}</h2>
                <p className="mb-6">{t('participateText')}</p>
                <ul className="mb-6 space-y-2">
                  <li>• {t('economicOperators', { number: 3000 })}</li>
                  <li>• {t('strategicMarkets', { number: 8 })}</li>
                  <li>• {t('unmissableMeeting')}</li>
                </ul>
                <div className="text-center">
                  <a 
                    href="https://www.sifia.net" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="sifia-button-secondary"
                  >
                    {t('registerOnline')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
