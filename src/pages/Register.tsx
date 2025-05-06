import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";
import { ChevronLeft } from "lucide-react";

const Register: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleGoBack = () => {
    navigate("/offers");
  };

  const handleRegistrationSuccess = () => {
    setShowSuccessMessage(true);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="py-10 md:py-16 flex-grow bg-gray-50">
        <div className="container mx-auto px-4 mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-sifia-blue hover:underline mb-4"
          >
            <ChevronLeft size={18} />
            <span>{t("backToOffers")}</span>
          </button>

          <h1 className="text-4xl font-bold text-sifia-blue text-center mb-2">
            {t("registerTitle")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-8">
            {t("registerSubtitle")}
          </p>

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
            <RegistrationForm
              onRegistrationSuccess={handleRegistrationSuccess}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
