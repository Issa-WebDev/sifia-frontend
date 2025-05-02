
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Tag, Award, Layers } from 'lucide-react';

interface BlogCategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const { t } = useLanguage();
  
  // Category definitions with icons
  const categories = [
    { id: 'event', name: t('eventCategory'), icon: Calendar },
    { id: 'investment', name: t('investmentCategory'), icon: Award },
    { id: 'sustainability', name: t('sustainabilityCategory'), icon: Layers }, 
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Tag className="mr-2" size={18} />
        {t('categories')}
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
            selectedCategory === null 
              ? 'bg-sifia-blue text-white' 
              : 'hover:bg-gray-100'
          }`}
        >
          {t('allCategories')}
        </button>
        
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-sifia-blue text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={16} className="mr-2" />
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogCategoryFilter;
