
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Mail } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface NewsletterPopupProps {
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError(t('emailRequired'));
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('emailInvalid'));
      return;
    }
    
    // Here you would integrate with your newsletter service
    console.log('Subscribing email:', email);
    
    // Show success message
    toast({
      title: t('subscribeSuccess'),
      description: t('subscribeMessage'),
    });
    
    // Close the popup
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="bg-sifia-blue text-white p-6">
          <div className="flex justify-center mb-4">
            <Mail size={40} />
          </div>
          <h3 className="text-2xl font-bold text-center">{t('newsletterTitle')}</h3>
          <p className="text-center">{t('newsletterSubtitle')}</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sifia-blue`}
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-sifia-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {t('subscribeButton')}
            </button>
            
            <p className="mt-4 text-xs text-gray-500 text-center">
              {t('privacyNotice')}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
