import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import axios from "axios";

const PaymentSuccess: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  const transactionId = searchParams.get("transaction_id");
  const cpmTransId = searchParams.get("cpm_trans_id");

  useEffect(() => {
    if (transactionId && cpmTransId) {
      verifyPayment();
    } else {
      setVerifying(false);
    }
  }, [transactionId, cpmTransId]);

  const verifyPayment = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payment/verify?transaction_id=${transactionId}&cpm_trans_id=${cpmTransId}`
      );

      if (response.data.success) {
        setVerified(true);
        setPaymentData(response.data.paymentData);
      }

      setVerifying(false);
    } catch (error) {
      console.error("Payment verification error:", error);
      setVerifying(false);
    }
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

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
            {verifying ? (
              <div className="text-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-sifia-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">{t("verifyingPayment")}</p>
              </div>
            ) : verified ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <CheckCircle2 className="h-20 w-20 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                  {t("paymentSuccessful")}
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  {t("registrationSuccessMessage")}
                </p>

                {paymentData && (
                  <div className="bg-gray-50 p-5 rounded-lg mb-6 text-left">
                    <h3 className="font-bold text-lg mb-4 text-sifia-blue border-b pb-2">
                      {t("registrationDetails")}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {t("confirmationCode")}:
                        </span>
                        <span className="font-bold">
                          {paymentData.confirmationCode}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium">{t("name")}:</span>
                        <span>
                          {paymentData.firstName} {paymentData.lastName}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium">
                          {t("participationType")}:
                        </span>
                        <span>{paymentData.participantType}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium">{t("packageType")}:</span>
                        <span>{paymentData.packageName}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium">{t("totalPaid")}:</span>
                        <span className="text-green-600 font-semibold">
                          {new Intl.NumberFormat("fr-FR").format(
                            paymentData.amount
                          )}{" "}
                          {paymentData.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 mb-6">
                  {t("registrationSuccessEmail")}
                </p>

                <button onClick={handleGoHome} className="sifia-button-primary">
                  {t("backToHome")}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                  {t("paymentVerificationFailed")}
                </h1>
                <p className="text-gray-600 mb-6">
                  {t("paymentVerificationFailedMessage")}
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="sifia-button-primary"
                >
                  {t("tryAgain")}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
