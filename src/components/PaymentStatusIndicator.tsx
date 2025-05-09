import React from "react";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PaymentStatusIndicator = ({ status, className = "" }) => {
  const { t } = useLanguage();

  const getStatusInfo = () => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
          text: t("completed") || "Completed",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
        };
      case "pending":
        return {
          icon: <Clock className="w-4 h-4 mr-1" />,
          text: t("pending") || "Pending",
          bgColor: "bg-amber-100",
          textColor: "text-amber-800",
        };
      case "failed":
        return {
          icon: <XCircle className="w-4 h-4 mr-1" />,
          text: t("failed") || "Failed",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
      case "partial":
        return {
          icon: <AlertCircle className="w-4 h-4 mr-1" />,
          text: t("partial") || "Partial",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4 mr-1" />,
          text: t("unknown") || "Unknown",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor} ${className}`}
    >
      {statusInfo.icon}
      {statusInfo.text}
    </span>
  );
};

export default PaymentStatusIndicator;
