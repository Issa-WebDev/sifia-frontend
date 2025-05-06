import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative text-white py-20 md:py-40">
      {/* <div className="absolute inset-0 bg-[url('https://www.therollingnotes.com/wp-content/uploads/Hub-Africa.jpg.webp')] bg-cover bg-center mix-blend-overlay opacity-20"></div> */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://sifiaciv.s3.us-east-1.amazonaws.com/heroupdate.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="flex items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif">
                {t("heroTitle")}
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-10">
            <div className="flex items-center">
              <Calendar className="mr-2 text-sifia-gold" size={20} />
              <span className="text-gray-100">{t("heroDate")}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-sifia-gold" size={20} />
              <span className="text-gray-100">{t("heroLocation")}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/register"
              className="bg-sifia-gold hover:bg-opacity-90 text-sifia-blue font-semibold py-3 px-8 rounded-md transition-colors duration-300 text-center"
            >
              {t("registerBtn")}
            </Link>
            <Link
              to="/offers"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 text-center"
            >
              {t("buyStandBtn")}
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-sifia-blue font-semibold py-3 px-8 rounded-md transition-colors duration-300 text-center"
            >
              {t("contactBtn")}
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay design element */}
      {/* <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-1/2 bg-sifia-gold opacity-10 -skew-x-12 translate-x-20"></div> */}
    </div>
  );
};

export default Hero;
