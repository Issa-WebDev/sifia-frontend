
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
  readTime: number;
}

interface BlogListProps {
  selectedCategory: string | null;
}

const BlogList: React.FC<BlogListProps> = ({ selectedCategory }) => {
  const { t } = useLanguage();
  
  // Sample blog posts - In a real application, these would come from an API
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: "SIFIA 2024: Preparing for Africa's Largest Investment Exhibition",
      excerpt: "As we approach SIFIA 2025, here's how investors and suppliers should prepare to maximize opportunities at Africa's premier industrial event.",
      date: '2024-04-15',
      author: 'Jean Marc Ekressin',
      image: '/lovable-uploads/22427548-6ddf-4727-9d4e-b85b24051043.png',
      category: 'event',
      readTime: 5
    },
    {
      id: '2',
      title: 'Infrastructure Development Opportunities in Ivory Coast',
      excerpt: 'Discover the expanding infrastructure sector in Ivory Coast and how SIFIA connects international investors with local development projects.',
      date: '2024-04-10',
      author: 'Binta Sarr',
      image: '/lovable-uploads/f258c7e7-b82b-4090-9ceb-12b20f201e4a.png',
      category: 'investment',
      readTime: 7
    },
    {
      id: '3',
      title: 'Sustainable Energy Solutions: The Future of African Industry',
      excerpt: 'Exploring how green energy technologies are transforming African industrial development and creating new investment opportunities.',
      date: '2024-04-05',
      author: 'Maïga Youssoufa',
      image: '/lovable-uploads/22427548-6ddf-4727-9d4e-b85b24051043.png',
      category: 'sustainability',
      readTime: 6
    },
    {
      id: '4',
      title: 'Networking Strategies for SIFIA 2025 Attendees',
      excerpt: 'Maximize your networking effectiveness with these proven strategies for building valuable connections at SIFIA 2025.',
      date: '2024-03-28',
      author: 'Nicerine Bres',
      image: '/lovable-uploads/f258c7e7-b82b-4090-9ceb-12b20f201e4a.png',
      category: 'event',
      readTime: 4
    }
  ];

  // Filter posts by category if a category is selected
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t('latestArticles')}</h2>
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{t('noArticlesFound')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(post.date)}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <User size={14} className="mr-1" />
                    {post.author}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} {t('minRead')}</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-bold mb-2 hover:text-sifia-blue transition-colors">{post.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center text-sm text-sifia-blue">
                    <Tag size={14} className="mr-1" />
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <Link to={`/blog/${post.id}`} className="text-sifia-blue hover:text-sifia-gold font-medium text-sm">
                    {t('readMore')} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
