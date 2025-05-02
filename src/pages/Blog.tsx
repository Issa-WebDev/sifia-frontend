
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import BlogList from '../components/BlogList';
import BlogCategoryFilter from '../components/BlogCategoryFilter';
import NewsletterPopup from '../components/NewsletterPopup';

const Blog = () => {
  const { t } = useLanguage();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Show newsletter popup after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-sifia-blue py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('blogTitle')}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t('blogSubtitle')}</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <BlogCategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
          </div>
          <div className="md:w-3/4">
            <BlogList selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
      
      <Footer />
      
      {showNewsletter && <NewsletterPopup onClose={() => setShowNewsletter(false)} />}
    </div>
  );
};

export default Blog;
