import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Installment {
  _id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  paymentDate?: string;
  index: number;
}

interface PaymentInstallmentsProps {
  registrationId: string;
  currency?: string;
  onPaymentComplete?: () => void;
}

const PaymentInstallments: React.FC<PaymentInstallmentsProps> = ({
  registrationId,
  currency = 'FCFA',
  onPaymentComplete,
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registration, setRegistration] = useState<any>(null);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentInstallmentId, setCurrentInstallmentId] = useState<string | null>(null);

  // Calculate payment progress
  const calculateProgress = () => {
    if (!registration) return 0;
    const totalAmount = registration.amount;
    const paidAmount = installments
      .filter(i => i.status === 'completed')
      .reduce((sum, i) => sum + i.amount, 0);
    
    return Math.round((paidAmount / totalAmount) * 100);
  };

  // Fetch registration and installments data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/installments/${registrationId}`);
      
      if (response.data.success) {
        setRegistration(response.data.registration);
        setInstallments(response.data.installments);
      } else {
        setError(response.data.message || t('errorFetchingData'));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || t('errorFetchingData'));
    } finally {
      setLoading(false);
    }
  };

  // Initiate payment for an installment
  const handlePayInstallment = async (installmentId: string) => {
    try {
      setProcessingPayment(true);
      setCurrentInstallmentId(installmentId);
      setError(null);
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/pay-installment/${installmentId}`
      );
      
      if (response.data.success && response.data.payment_url) {
        // Redirect to CinetPay payment page
        window.location.href = response.data.payment_url;
      } else {
        setError(response.data.message || t('errorInitiatingPayment'));
        setProcessingPayment(false);
        setCurrentInstallmentId(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || t('errorInitiatingPayment'));
      setProcessingPayment(false);
      setCurrentInstallmentId(null);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (registrationId) {
      fetchData();
    }
  }, [registrationId]);

  // Polling to check for payment status updates
  useEffect(() => {
    if (!registrationId || registration?.paymentStatus === 'completed') return;
    
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [registrationId, registration?.paymentStatus]);

  // Check if payment is complete and notify parent
  useEffect(() => {
    if (registration?.paymentStatus === 'completed' && onPaymentComplete) {
      onPaymentComplete();
    }
  }, [registration?.paymentStatus, onPaymentComplete]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">{t('loadingPaymentInfo')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-2">
          <AlertCircle className="text-red-500 w-5 h-5 mr-2" />
          <h3 className="text-lg font-semibold text-red-700">{t('error')}</h3>
        </div>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchData} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('tryAgain')}
        </button>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-2">
          <AlertCircle className="text-yellow-500 w-5 h-5 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-700">{t('noDataFound')}</h3>
        </div>
        <p className="text-yellow-600">{t('registrationNotFound')}</p>
      </div>
    );
  }

  const progress = calculateProgress();
  const isFullyPaid = registration.paymentStatus === 'completed';
  const nextPendingInstallment = installments.find(i => i.status === 'pending');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('paymentInstallments')}</h2>
      
      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <p className="text-gray-600">{t('totalAmount')}</p>
            <p className="text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat(registration.language === 'en' ? 'en-US' : 'fr-FR').format(registration.amount)} {currency}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">{t('paymentStatus')}</p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isFullyPaid 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {isFullyPaid ? (
                <><CheckCircle className="w-4 h-4 mr-1" /> {t('completed')}</>
              ) : (
                <><AlertCircle className="w-4 h-4 mr-1" /> {t('pending')}</>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600 text-sm">{progress}% {t('paid')}</p>
      </div>

      {/* Installments List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('installment')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('amount')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('date')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('action')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {installments.map((installment) => (
              <tr key={installment._id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t('installmentNumber', { number: installment.index + 1 })}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Intl.NumberFormat(registration.language === 'en' ? 'en-US' : 'fr-FR').format(installment.amount)} {currency}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    installment.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : installment.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {installment.status === 'completed' ? (
                      <><CheckCircle className="w-3 h-3 mr-1" /> {t('paid')}</>
                    ) : installment.status === 'failed' ? (
                      <><XCircle className="w-3 h-3 mr-1" /> {t('failed')}</>
                    ) : (
                      <><AlertCircle className="w-3 h-3 mr-1" /> {t('pending')}</>
                    )}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {installment.paymentDate 
                    ? new Date(installment.paymentDate).toLocaleDateString(
                        registration.language === 'en' ? 'en-US' : 'fr-FR'
                      ) 
                    : '-'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {installment.status === 'pending' && (
                    <button
                      onClick={() => handlePayInstallment(installment._id)}
                      disabled={processingPayment || isFullyPaid}
                      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
                        ${(processingPayment || isFullyPaid) && 'opacity-50 cursor-not-allowed'}`}
                    >
                      {processingPayment && currentInstallmentId === installment._id ? (
                        <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> {t('processing')}</>
                      ) : (
                        t('payNow')
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Next payment reminder */}
      {nextPendingInstallment && !isFullyPaid && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            {t('nextPayment')}
          </h3>
          <p className="text-blue-600 mb-4">
            {t('nextPaymentInstruction')}
          </p>
          <button
            onClick={() => handlePayInstallment(nextPendingInstallment._id)}
            disabled={processingPayment}
            className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
              ${processingPayment && 'opacity-50 cursor-not-allowed'}`}
          >
            {processingPayment && currentInstallmentId === nextPendingInstallment._id ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {t('processing')}</>
            ) : (
              <>
                {t('payNextInstallment')} 
                ({new Intl.NumberFormat(registration.language === 'en' ? 'en-US' : 'fr-FR').format(nextPendingInstallment.amount)} {currency})
              </>
            )}
          </button>
        </div>
      )}

      {/* Payment complete message */}
      {isFullyPaid && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="text-green-500 w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">
              {t('paymentCompleteTitle')}
            </h3>
          </div>
          <p className="mt-2 text-green-700">
            {t('paymentCompleteMessage')}
          </p>
          <p className="mt-1 text-green-600">
            {t('confirmationCodeMessage')}: <span className="font-bold">{registration.confirmationCode}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentInstallments;