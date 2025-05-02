
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Offers = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4 mb-12">
          <h1 className="text-4xl font-bold mb-6 text-sifia-blue text-center">{t('offersTitle')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">{t('offersSubtitle')}</p>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-sifia-blue">{t('offerIntroTitle')}</h2>
            <p className="text-gray-700 mb-4">{t('offerIntroText1')}</p>
            <p className="text-gray-700">{t('offerIntroText2')}</p>
          </div>
          
          {/* Local Exhibitors */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sifia-blue">{t('localExhibitorsTitle')}</h2>
              <div className="px-4 py-2 bg-sifia-gold text-white rounded-md mt-2 md:mt-0">
                {t('limitedOffer')} -10% {t('untilMarch')}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Package */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('basicPackage')}</h3>
                  <span className="text-sifia-gold">🥉</span>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">1 000 000 FCFA</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('stand')} 4 m²</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tableChairs', { tables: 1, chairs: 2 })}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>TV</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-primary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
              
              {/* Prestige Package */}
              <div className="border-2 border-sifia-blue rounded-lg p-6 hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 bg-sifia-blue text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                  {t('popular')}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('prestigePackage')}</h3>
                  <span className="text-sifia-gold">🥈</span>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">2 000 000 FCFA</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('standPrestige')} 12 m²</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('lounge')} 3 {t('places')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>2 TV</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tableChairs', { tables: 1, chairs: 4 })}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tablets')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('officialSponsor')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('branding')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('speechClosing')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('masterclass')} (2 {t('places')})</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('onlineBanner')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-primary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
              
              {/* Gold Package */}
              <div className="bg-gradient-to-b from-amber-50 to-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('goldPackage')}</h3>
                  <span className="text-sifia-gold">🥇</span>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">5 000 000 FCFA</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('panelist')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('standGold')} 24 m²</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('lounge')} 5 {t('places')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>2 TV</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tableChairs', { tables: 1, chairs: 4 })}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tablets')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('mainSponsor')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('branding')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('speechClosingGala')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('masterclass')} (4 {t('places')})</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('onlineBanner')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-secondary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* International Exhibitors */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-sifia-blue">{t('internationalExhibitorsTitle')}</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Standard Package */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('standardPackage')}</h3>
                  <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full">1</span>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">3960$ / 2 500 000 FCFA</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('basicStand')} 6 m²</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('table')} + 2 {t('chairs')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>TV + USB + HDMI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('accommodation')} (SEEN HOTEL)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>4 {t('nights')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('lunchExpo')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('dinnerHotel')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-primary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
              
              {/* Prestige Package */}
              <div className="border-2 border-sifia-blue rounded-lg p-6 hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 bg-sifia-blue text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                  {t('popular')}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('prestigePackage')}</h3>
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full">2</span>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">6350$ / 4 000 000 FCFA</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('standPrestige')} 12 m²</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('lounge')} 3 {t('places')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>2 TV</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tableChairs', { tables: 1, chairs: 4 })}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tablets')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('officialSponsor')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('branding')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('accommodation')} (HOTEL BYBLOS)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('speechClosing')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('masterclass')} (2 {t('places')})</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-primary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
              
              {/* Gold Package */}
              <div className="bg-gradient-to-b from-amber-50 to-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('goldPackage')}</h3>
                  <span className="flex items-center justify-center w-6 h-6 bg-yellow-500 text-white rounded-full">3</span>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">10 200$ / 6 500 000 FCFA</div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('panelist')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('standGold')} 24 m²</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('lounge')} 5 {t('places')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>2 TV</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tableChairs', { tables: 1, chairs: 4 })}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('tablets')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('mainSponsor')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('branding')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('speechClosingGala')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('masterclass')} (4 {t('places')})</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('accommodation')} (HOTEL BYBLOS)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('officialIntro')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-secondary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Visitors */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-sifia-blue">{t('internationalVisitorsTitle')}</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Standard Visitors */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('standardPackage')}</h3>
                  <div className="flex">
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                  </div>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">650$</div>
                <p className="mb-2">{t('seenHotel')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>4 {t('nights')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('shuttle')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('breakfast')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('dinner')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('forumTicket')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('galaDinner')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('conference')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('panel')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-primary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
              
              {/* VIP Visitors */}
              <div className="border-2 border-sifia-blue rounded-lg p-6 hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 bg-sifia-blue text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                  {t('popular')}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('vipPackage')}</h3>
                  <div className="flex">
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                  </div>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">990$</div>
                <p className="mb-2">{t('byblosHotel')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>4 {t('nights')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('shuttle')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('breakfast')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('dinner')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('forumTicket')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('galaDinner')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('conference')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('panel')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-primary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
              
              {/* VVIP Visitors */}
              <div className="bg-gradient-to-b from-amber-50 to-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{t('vvipPackage')}</h3>
                  <div className="flex">
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                    <span className="text-amber-500">★</span>
                  </div>
                </div>
                <div className="text-xl font-bold mb-4 text-sifia-blue">1550$</div>
                <p className="mb-2">{t('sofitelNoomHotel')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>4 {t('nights')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('shuttle')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('breakfast')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('dinner')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('forumTicket')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('galaDinner')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('conference')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('panel')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sifia-gold mr-2">✓</span>
                    <span>{t('vipProtocol')}</span>
                  </li>
                </ul>
                <Link to="/register" className="sifia-button-secondary w-full block text-center">
                  {t('reserveNow')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-sifia-blue text-white rounded-lg p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">{t('participateTitle')}</h2>
              <p className="mb-6">{t('participateText')}</p>
              <Link to="/register" className="sifia-button-secondary inline-block">
                {t('registerBtn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offers;
