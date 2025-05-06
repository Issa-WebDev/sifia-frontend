
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Hammer, 
  Settings, 
  Home, 
  Zap, 
  Building2, 
  Shield, 
  Droplets, 
  Lock,
  Laptop
} from 'lucide-react';

interface BusinessAreaProps {
  icon: React.ReactNode;
  title: string;
  catchphrase: string;
}

const BusinessArea: React.FC<BusinessAreaProps> = ({ icon, title, catchphrase }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-2 border-sifia-red transition-transform hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <div className="text-sifia-red mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{catchphrase}</p>
      </div>
    </div>
  );
};

const BusinessAreas: React.FC = () => {
  const { t } = useLanguage();

  const businessSectors = [
    {
      icon: <Hammer size={32} className="text-[#0A2463]" />,
      titleKey: "constructionTitle",
      catchphraseKey: "constructionCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "industrialEngineeringTitle",
      catchphraseKey: "industrialEngineeringCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "advancedMaterialsTitle",
      catchphraseKey: "advancedMaterialsCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "sanitationTitle",
      catchphraseKey: "sanitationCatchphrase",
    },
    {
      icon: <Home size={32} className="text-[#0A2463]" />,
      titleKey: "realEstateTitle",
      catchphraseKey: "realEstateCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "durableSolutionsTitle",
      catchphraseKey: "durableSolutionsCatchphrase",
    },
    {
      icon: <Zap size={32} className="text-[#0A2463]" />,
      titleKey: "energySystemsTitle",
      catchphraseKey: "energySystemsCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "businessSolutionsTitle",
      catchphraseKey: "businessSolutionsCatchphrase",
    },
    {
      icon: <Building2 size={32} className="text-[#0A2463]" />,
      titleKey: "architectureDesignTitle",
      catchphraseKey: "architectureDesignCatchphrase",
    },
    {
      icon: <Shield size={32} className="text-[#0A2463]" />,
      titleKey: "fireSafetyTitle",
      catchphraseKey: "fireSafetyCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "rawMaterialsTitle",
      catchphraseKey: "rawMaterialsCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "metallurgyTitle",
      catchphraseKey: "metallurgyCatchphrase",
    },
    {
      icon: <Droplets size={32} className="text-[#0A2463]" />,
      titleKey: "waterTechTitle",
      catchphraseKey: "waterTechCatchphrase",
    },
    {
      icon: <Lock size={32} className="text-[#0A2463]" />,
      titleKey: "securitySurveillanceTitle",
      catchphraseKey: "securitySurveillanceCatchphrase",
    },
    {
      icon: <Laptop size={32} className="text-[#0A2463]" />,
      titleKey: "digitalTransformationTitle",
      catchphraseKey: "digitalTransformationCatchphrase",
    },
    {
      icon: <Zap size={32} className="text-[#0A2463]" />,
      titleKey: "renewableEnergyTitle",
      catchphraseKey: "renewableEnergyCatchphrase",
    },
    {
      icon: <Settings size={32} className="text-[#0A2463]" />,
      titleKey: "infrastructureProjectsTitle",
      catchphraseKey: "infrastructureProjectsCatchphrase",
    },
    {
      icon: <Shield size={32} className="text-[#0A2463]" />,
      titleKey: "industrialProtectionTitle",
      catchphraseKey: "industrialProtectionCatchphrase",
    },
    {
      icon: <Home size={32} className="text-[#0A2463]" />,
      titleKey: "smartCitiesTitle",
      catchphraseKey: "smartCitiesCatchphrase",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sifia-blue mb-2">{t('businessAreasTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('businessAreasSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessSectors.map((sector, index) => (
            <BusinessArea
              key={index}
              icon={sector.icon}
              title={t(sector.titleKey)}
              catchphrase={t(sector.catchphraseKey)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-sifia-blue font-medium mb-4">{t('joinSIFIAPrompt')}</p>
          <a 
            href="/register" 
            className="inline-block bg-sifia-gold hover:bg-sifia-gold/90 text-sifia-blue font-medium py-3 px-6 rounded-md transition-colors"
          >
            {t('registerAsExhibitor')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default BusinessAreas;
