
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Partner {
  id: number;
  name: string;
  logo: string;
  type: 'sponsor' | 'partner' | 'exhibitor';
}

const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <div className="h-20 flex items-center justify-center p-2 my-2">
      <div className="bg-white rounded-md shadow-sm p-4 h-full w-full flex items-center justify-center">
        <img 
          src={partner.logo} 
          alt={partner.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

const PartnersCarousel: React.FC = () => {
  const { t } = useLanguage();

  const sponsors: Partner[] = [
    { id: 1, name: "CCI Côte d'Ivoire", logo: "https://placehold.co/200x100/CCCCCC/333333?text=CCI+CI", type: 'sponsor' },
    { id: 2, name: "Union Africaine", logo: "https://placehold.co/200x100/CCCCCC/333333?text=UA", type: 'sponsor' },
    { id: 3, name: "Archipel Groupe", logo: "https://placehold.co/200x100/CCCCCC/333333?text=Archipel", type: 'sponsor' },
    { id: 4, name: "2AIE", logo: "https://placehold.co/200x100/CCCCCC/333333?text=2AIE", type: 'sponsor' },
    { id: 5, name: "CAID", logo: "https://placehold.co/200x100/CCCCCC/333333?text=CAID", type: 'sponsor' },
    { id: 6, name: "BATIDECOR", logo: "https://placehold.co/200x100/CCCCCC/333333?text=BATIDECOR", type: 'sponsor' },
  ];
  
  const partners: Partner[] = [
    { id: 7, name: "FBI", logo: "https://placehold.co/200x100/CCCCCC/333333?text=FBI", type: 'partner' },
    { id: 8, name: "ZENS Logistics", logo: "https://placehold.co/200x100/CCCCCC/333333?text=ZENS", type: 'partner' },
    { id: 9, name: "AIKA Construction", logo: "https://placehold.co/200x100/CCCCCC/333333?text=AIKA", type: 'partner' },
    { id: 10, name: "CULLINAN Consulting", logo: "https://placehold.co/200x100/CCCCCC/333333?text=CULLINAN", type: 'partner' },
    { id: 11, name: "SOGECAIR", logo: "https://placehold.co/200x100/CCCCCC/333333?text=SOGECAIR", type: 'partner' },
    { id: 12, name: "WIVARO", logo: "https://placehold.co/200x100/CCCCCC/333333?text=WIVARO", type: 'partner' },
  ];

  return (
    <section className="sifia-section bg-gray-50">
      <div className="sifia-container">
        <h2 className="sifia-heading text-center mb-10">{t('partnersTitle')}</h2>
        
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-sifia-blue text-center">{t('sponsorsTitle')}</h3>
            <Carousel className="mx-auto max-w-5xl">
              <CarouselContent className="-ml-2 md:-ml-4">
                {sponsors.map((sponsor) => (
                  <CarouselItem key={sponsor.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                    <PartnerLogo partner={sponsor} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-sifia-blue text-center">{t('partnersTitle')}</h3>
            <Carousel className="mx-auto max-w-5xl">
              <CarouselContent className="-ml-2 md:-ml-4">
                {partners.map((partner) => (
                  <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                    <PartnerLogo partner={partner} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
