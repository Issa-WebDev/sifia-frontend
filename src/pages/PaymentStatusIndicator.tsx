import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PaymentInstallments from './PaymentInstallments';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentPage = () => {
  const { t } = useLanguage();
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get('transaction_id');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [requiresInstallments, setRequiresInstallments] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setLoading(true);
        setError(null);

        let url;
        if (registrationId) {
          url = `${process.env.VITE_BACKEND_URL}/api/payment/verify?registration_id=${registrationId}`;
        } else if (transactionId) {
          url = `${process.env.VITE_BACKEND_URL}/api/payment/verify?transaction_id=${transactionId}`;
        } else {
          throw new Error(t('missingPaymentIdentifier'));
        }

        const response = await axios.get(url);
        
        if (response.data.success) {
          setPaymentData(response.data.paymentData);
          setPaymentComplete(response.data.paymentData.paymentStatus === 'completed');
          
          // Check if this requires installment payments
          if (response.data.paymentData.installments?.length > 1) {
            setRequiresInstallments(true);
          }
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [registrationId, transactionId, t]);

  const handlePaymentComplete = () => {
    setPaymentComplete(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('verifyingPayment')}</h2>
          <p className="text-gray-600">{t('pleaseWait')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-red-700">{t('paymentError')}</h2>
            </div>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('backToHome')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-yellow-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-yellow-700">{t('paymentNotFound')}</h2>
            </div>
            <p className="text-yellow-600 mb-6">{t('paymentInfoUnavailable')}</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('backToHome')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {requiresInstallments ? (
            // Render installment payment interface
            <PaymentInstallments 
              registrationId={registrationId || paymentData.registration_id}
              currency={paymentData.currency}
              onPaymentComplete={handlePaymentComplete}
            />
          ) : (
            // Render single payment completion message
            paymentComplete ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-500 w-8 h-8 mr-3" />
                  <h2 className="text-3xl font-bold text-green-700">{t('paymentSuccess')}</h2>
                </div>
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('registrationDetails')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">{t('confirmationCode')}</p>
                      <p className="text-lg font-semibold">{paymentData.confirmationCode}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('name')}</p>
                      <p className="text-lg font-semibold">{paymentData.firstName} {paymentData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('participantType')}</p>
                      <p className="text-lg font-semibold">{paymentData.participantType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('package')}</p>
                      <p className="text-lg font-semibold">{paymentData.packageName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('amountPaid')}</p>
                      <p className="text-lg font-semibold">
                        {new Intl.NumberFormat('fr-FR').format(paymentData.amount)} {paymentData.currency}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">{t('paymentDate')}</p>
                      <p className="text-lg font-semibold">
                        {paymentData.paymentDate ? new Date(paymentData.paymentDate).toLocaleDateString() : '-'}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-green-700 mb-6">{t('paymentConfirmationMessage')}</p>
                <p className="text-gray-600 mb-8">{t('confirmationEmailSent')}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t('backToHome')}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                  >
                    {t('printConfirmation')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="text-yellow-500 w-6 h-6 mr-2" />
                  <h2 className="text-2xl font-bold text-yellow-700">{t('paymentPending')}</h2>
                </div>
                <p className="text-yellow-600 mb-6">{t('paymentProcessingMessage')}</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('backToHome')}
                </button>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;