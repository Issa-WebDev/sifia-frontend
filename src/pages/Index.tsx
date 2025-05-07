import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import OffersSection from "../components/OffersSection";
import ContactSection from "../components/ContactSection";
import RegistrationForm from "../components/RegistrationForm";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";
import PartnersCarousel from "../components/PartnersCarousel";
import BusinessAreas from "../components/BusinessAreas";
import TeamSection from "../components/TeamSection";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    setShowSuccessMessage(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 my-8">
        <CountdownTimer />
      </div>
      <AboutSection />
      <BusinessAreas />
      <TeamSection />
      <OffersSection />
      <PartnersCarousel />

      <div className="container mx-auto px-4 my-8">
        {showSuccessMessage ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              {t("registrationSuccessTitle")}
            </h2>
            <p className="text-green-600 mb-4">
              {t("registrationSuccessMessage")}
            </p>
            <p className="text-gray-700">{t("registrationSuccessEmail")}</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/")}
                className="sifia-button-primary"
              >
                {t("backToHome")}
              </button>
            </div>
          </div>
        ) : (
          <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        )}
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
