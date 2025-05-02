
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User } from "lucide-react";

interface TeamMemberProps {
  image: string;
  name: string;
  title: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, title, description }) => {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-center">{name}</CardTitle>
        <CardDescription className="text-center text-gray-600">{title}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 text-center">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

const TeamSection: React.FC = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      image: '/lovable-uploads/22427548-6ddf-4727-9d4e-b85b24051043.png',
      nameKey: 'jeanMarcName',
      titleKey: 'jeanMarcTitle',
      descriptionKey: 'jeanMarcDescription'
    },
    {
      image: '/lovable-uploads/f258c7e7-b82b-4090-9ceb-12b20f201e4a.png',
      nameKey: 'bintaName',
      titleKey: 'bintaTitle',
      descriptionKey: 'bintaDescription'
    },
    {
      image: '/lovable-uploads/22427548-6ddf-4727-9d4e-b85b24051043.png', // Placeholder, will be updated later
      nameKey: 'maigaName',
      titleKey: 'maigaTitle',
      descriptionKey: 'maigaDescription'
    },
    {
      image: '/lovable-uploads/f258c7e7-b82b-4090-9ceb-12b20f201e4a.png', // Placeholder, will be updated later
      nameKey: 'nicerineName',
      titleKey: 'nicerineTitle',
      descriptionKey: 'nicerineDescription'
    },
    {
      image: '/lovable-uploads/22427548-6ddf-4727-9d4e-b85b24051043.png', // Placeholder, will be updated later
      nameKey: 'assogbaName',
      titleKey: 'assogbaTitle',
      descriptionKey: 'assogbaDescription'
    },
    {
      image: '/lovable-uploads/f258c7e7-b82b-4090-9ceb-12b20f201e4a.png', // Placeholder, will be updated later
      nameKey: 'sfarName',
      titleKey: 'sfarTitle',
      descriptionKey: 'sfarDescription'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-sifia-blue mb-4">{t('teamTitle')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{t('teamSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={t(member.nameKey)}
              title={t(member.titleKey)}
              description={t(member.descriptionKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
