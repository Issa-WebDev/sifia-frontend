import React from "react";
import { Check, AlertCircle, XCircle, CreditCard } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PaymentStatusIcon = ({ status }) => {
  switch (status) {
    case "completed":
      return <Check className="w-5 h-5 text-green-500" />;
    case "pending":
      return <AlertCircle className="w-5 h-5 text-amber-500" />;
    case "failed":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const PaymentCard = ({
  installment,
  currency = "FCFA",
  onPayNow,
  disabled = false,
  isProcessing = false,
  installmentCount,
}) => {
  const { t, language } = useLanguage();

  // Format amount based on language
  const formattedAmount = new Intl.NumberFormat(
    language === "en" ? "en-US" : "fr-FR"
  ).format(installment.amount);

  // Format date if it exists
  const formattedDate = installment.paymentDate
    ? new Date(installment.paymentDate).toLocaleDateString(
        language === "en" ? "en-US" : "fr-FR",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : null;

  // Status text and colors
  const getStatusInfo = () => {
    switch (installment.status) {
      case "completed":
        return {
          text: t("paid") || "Paid",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
        };
      case "pending":
        return {
          text: t("pending") || "Pending",
          bgColor: "bg-amber-100",
          textColor: "text-amber-800",
        };
      case "failed":
        return {
          text: t("failed") || "Failed",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
      default:
        return {
          text: t("unknown") || "Unknown",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div
      className={`border rounded-lg p-4 ${
        installment.status === "completed"
          ? "border-green-200 bg-green-50"
          : installment.status === "failed"
          ? "border-red-200 bg-red-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <PaymentStatusIcon status={installment.status} />
          <span className="ml-2 font-semibold">
            {t("installmentNumber", { number: installment.index + 1 }) ||
              `Installment ${installment.index + 1} of ${installmentCount}`}
          </span>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
        >
          {statusInfo.text}
        </span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600">{t("amount") || "Amount"}:</span>
        <span className="font-bold text-lg">
          {formattedAmount} {currency}
        </span>
      </div>

      {formattedDate && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">
            {t("paymentDate") || "Payment Date"}:
          </span>
          <span className="text-gray-800">{formattedDate}</span>
        </div>
      )}

      {installment.paymentMethod && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">
            {t("paymentMethod") || "Payment Method"}:
          </span>
          <span className="text-gray-800">{installment.paymentMethod}</span>
        </div>
      )}

      {installment.status === "pending" && (
        <button
          onClick={() => onPayNow(installment._id)}
          disabled={disabled || isProcessing}
          className="w-full mt-2 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sifia-blue hover:bg-sifia-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sifia-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing && installment.processing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("processing") || "Processing..."}
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              {t("payNow") || "Pay Now"}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default PaymentCard;
