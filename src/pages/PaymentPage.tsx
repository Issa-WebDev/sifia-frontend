import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentCard from "../components/PaymentCard";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  CreditCard,
} from "lucide-react";

const PaymentPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const registrationId = queryParams.get("registration_id");
  const transactionId = queryParams.get("transaction_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentInstallmentId, setCurrentInstallmentId] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Calculate payment progress
  const calculateProgress = () => {
    if (!registration) return 0;

    const totalAmount = registration.amount;
    const paidAmount = installments
      .filter((i) => i.status === "completed")
      .reduce((sum, i) => sum + i.amount, 0);

    return Math.round((paidAmount / totalAmount) * 100);
  };

  // Fetch registration and installments data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let url;
      if (registrationId) {
        url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payment/installments/${registrationId}`;
      } else if (transactionId) {
        url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payment/verify?transaction_id=${transactionId}`;
      } else {
        throw new Error(
          t("missingPaymentIdentifier") || "Missing payment identifier"
        );
      }

      const response = await axios.get(url);

      if (response.data.success) {
        if (registrationId) {
          setRegistration(response.data.registration);
          setInstallments(response.data.installments || []);
          setPaymentComplete(
            response.data.registration.paymentStatus === "completed"
          );
        } else {
          setRegistration(response.data.paymentData);
          setInstallments(response.data.paymentData.installments || []);
          setPaymentComplete(
            response.data.paymentData.paymentStatus === "completed"
          );
        }
      } else {
        setError(
          response.data.message ||
            t("errorFetchingData") ||
            "Error fetching payment data"
        );
      }
    } catch (err) {
      console.error("Error fetching payment data:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          t("errorFetchingData") ||
          "Error fetching payment data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initiate payment for an installment
  const handlePayInstallment = async (installmentId) => {
    try {
      setProcessingPayment(true);
      setCurrentInstallmentId(installmentId);
      setError(null);

      // Update local state to show processing
      setInstallments((prevInstallments) =>
        prevInstallments.map((inst) =>
          inst._id === installmentId ? { ...inst, processing: true } : inst
        )
      );

      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/payment/pay-installment/${installmentId}`
      );

      if (response.data.success && response.data.payment_url) {
        // Redirect to CinetPay payment page
        window.location.href = response.data.payment_url;
      } else {
        setError(
          response.data.message ||
            t("errorInitiatingPayment") ||
            "Error initiating payment"
        );
        setProcessingPayment(false);
        setCurrentInstallmentId(null);

        // Revert processing state
        setInstallments((prevInstallments) =>
          prevInstallments.map((inst) =>
            inst._id === installmentId ? { ...inst, processing: false } : inst
          )
        );
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          t("errorInitiatingPayment") ||
          "Error initiating payment"
      );
      setProcessingPayment(false);
      setCurrentInstallmentId(null);

      // Revert processing state
      setInstallments((prevInstallments) =>
        prevInstallments.map((inst) =>
          inst._id === installmentId ? { ...inst, processing: false } : inst
        )
      );
    }
  };

  // Load data on component mount and set up polling
  useEffect(() => {
    fetchData();

    // Poll for updates every 15 seconds if payment is in progress
    const intervalId = setInterval(() => {
      if (!paymentComplete) {
        fetchData();
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, [registrationId, transactionId]);

  // Handle back navigation
  const handleGoBack = () => {
    navigate("/");
  };

  const progress = calculateProgress();
  const nextPendingInstallment = installments.find(
    (i) => i.status === "pending"
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-sifia-blue mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("verifyingPayment") || "Verifying Payment"}
          </h2>
          <p className="text-gray-600">{t("pleaseWait") || "Please wait..."}</p>
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
          <button
            onClick={handleGoBack}
            className="flex items-center text-sifia-blue hover:underline mb-6"
          >
            <ChevronLeft size={18} />
            <span>{t("backToHome") || "Back to Home"}</span>
          </button>

          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-red-700">
                {t("paymentError") || "Payment Error"}
              </h2>
            </div>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-sifia-blue text-white rounded-md hover:bg-sifia-dark-blue transition-colors"
            >
              {t("backToHome") || "Back to Home"}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12">
          <button
            onClick={handleGoBack}
            className="flex items-center text-sifia-blue hover:underline mb-6"
          >
            <ChevronLeft size={18} />
            <span>{t("backToHome") || "Back to Home"}</span>
          </button>

          <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-yellow-500 w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold text-yellow-700">
                {t("paymentNotFound") || "Payment Not Found"}
              </h2>
            </div>
            <p className="text-yellow-600 mb-6">
              {t("paymentInfoUnavailable") ||
                "Payment information is unavailable"}
            </p>
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-sifia-blue text-white rounded-md hover:bg-sifia-dark-blue transition-colors"
            >
              {t("backToHome") || "Back to Home"}
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
        <button
          onClick={handleGoBack}
          className="flex items-center text-sifia-blue hover:underline mb-6"
        >
          <ChevronLeft size={18} />
          <span>{t("backToHome") || "Back to Home"}</span>
        </button>

        <div className="max-w-4xl mx-auto">
          {paymentComplete ? (
            // Payment completion view
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 animate-fade-in">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-500 w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold text-green-700">
                  {t("paymentSuccess") || "Payment Successful"}
                </h2>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t("registrationDetails") || "Registration Details"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      {t("confirmationCode") || "Confirmation Code"}
                    </p>
                    <p className="text-lg font-semibold">
                      {registration.confirmationCode}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t("name") || "Name"}</p>
                    <p className="text-lg font-semibold">
                      {registration.firstName} {registration.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      {t("participantType") || "Participant Type"}
                    </p>
                    <p className="text-lg font-semibold">
                      {registration.participantType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t("package") || "Package"}</p>
                    <p className="text-lg font-semibold">
                      {registration.packageName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      {t("amountPaid") || "Amount Paid"}
                    </p>
                    <p className="text-lg font-semibold">
                      {new Intl.NumberFormat("fr-FR").format(
                        registration.amount
                      )}{" "}
                      {registration.currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      {t("paymentDate") || "Payment Date"}
                    </p>
                    <p className="text-lg font-semibold">
                      {registration.paymentDate
                        ? new Date(
                            registration.paymentDate
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-green-700 mb-6">
                {t("paymentConfirmationMessage") ||
                  "Your payment has been successfully processed and your registration is complete."}
              </p>

              <p className="text-gray-600 mb-8">
                {t("confirmationEmailSent") ||
                  "A confirmation email has been sent to your registered email address with all the details."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGoBack}
                  className="px-6 py-3 bg-sifia-blue text-white rounded-md hover:bg-sifia-dark-blue transition-colors font-medium"
                >
                  {t("backToHome") || "Back to Home"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  {t("printConfirmation") || "Print Confirmation"}
                </button>
              </div>
            </div>
          ) : (
            // Installment payment view
            <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t("paymentInstallments") || "Payment Installments"}
              </h2>

              {/* Registration Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  {t("registrationSummary") || "Registration Summary"}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("name") || "Name"}
                      </p>
                      <p className="font-medium">
                        {registration.firstName} {registration.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("participantType") || "Participant Type"}
                      </p>
                      <p className="font-medium">
                        {registration.participantType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("package") || "Package"}
                      </p>
                      <p className="font-medium">{registration.packageName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("confirmationCode") || "Confirmation Code"}
                      </p>
                      <p className="font-medium">
                        {registration.confirmationCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Progress */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">
                      {t("totalAmount") || "Total Amount"}
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {new Intl.NumberFormat("fr-FR").format(
                        registration.amount
                      )}{" "}
                      {registration.currency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">
                      {t("paymentStatus") || "Payment Status"}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {t("pending") || "Pending"}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-sifia-blue h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    {progress}% {t("paid") || "paid"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {
                      installments.filter((i) => i.status === "completed")
                        .length
                    }
                    /{installments.length} {t("installments") || "installments"}
                  </p>
                </div>
              </div>

              {/* Installments List */}
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {t("paymentInstallments") || "Payment Installments"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {installments.map((installment) => (
                  <PaymentCard
                    key={installment._id}
                    installment={installment}
                    currency={registration.currency}
                    onPayNow={handlePayInstallment}
                    disabled={processingPayment}
                    isProcessing={processingPayment}
                    installmentCount={installments.length}
                  />
                ))}
              </div>

              {/* Next payment reminder */}
              {nextPendingInstallment && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    {t("nextPayment") || "Next Payment"}
                  </h3>
                  <p className="text-blue-600 mb-4">
                    {t("nextPaymentInstruction") ||
                      "Please complete your next installment payment to continue your registration process."}
                  </p>
                  <button
                    onClick={() =>
                      handlePayInstallment(nextPendingInstallment._id)
                    }
                    disabled={processingPayment}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sifia-blue hover:bg-sifia-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processingPayment &&
                    currentInstallmentId === nextPendingInstallment._id ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t("processing") || "Processing..."}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        {t("payNextInstallment") || "Pay Next Installment"}(
                        {new Intl.NumberFormat("fr-FR").format(
                          nextPendingInstallment.amount
                        )}{" "}
                        {registration.currency})
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Payment instructions */}
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {t("paymentInstructions") || "Payment Instructions"}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    {t("paymentInstruction1") ||
                      "Pay each installment in sequence, starting from the first pending payment."}
                  </li>
                  <li>
                    {t("paymentInstruction2") ||
                      "After each successful payment, the status will be updated automatically."}
                  </li>
                  <li>
                    {t("paymentInstruction3") ||
                      "You will receive email confirmations for each completed payment."}
                  </li>
                  <li>
                    {t("paymentInstruction4") ||
                      "Once all installments are paid, your registration will be marked as complete."}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
