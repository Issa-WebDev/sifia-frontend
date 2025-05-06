import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { XCircle, ChevronLeft } from "lucide-react";

const PaymentFailure: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/register");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="py-10 md:py-16 flex-grow bg-gray-50">
        <div className="container mx-auto px-4">
          <button
            onClick={handleGoHome}
            className="flex items-center text-sifia-blue hover:underline mb-4"
          >
            <ChevronLeft size={18} />
            <span>{t("backToHome")}</span>
          </button>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto text-center py-8">
            <div className="flex justify-center mb-6">
              <XCircle className="h-20 w-20 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">
              {t("paymentFailed")}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {t("paymentFailedMessage")}
            </p>

            <div className="space-y-4">
              <button onClick={handleTryAgain} className="sifia-button-primary">
                {t("tryAgain")}
              </button>

              <button
                onClick={handleGoHome}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-center"
              >
                {t("backToHome")}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentFailure;
