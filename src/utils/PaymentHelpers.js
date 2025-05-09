/**
 * Payment Helper Functions
 * Utility functions for payment processing, installment calculation and status checks
 */

// Maximum amount CinetPay can process in a single transaction
export const MAX_PAYMENT_AMOUNT = 999999;

/**
 * Split a total amount into installments based on the maximum payment amount
 * @param {number} totalAmount - The full payment amount
 * @returns {Array<number>} Array of installment amounts
 */
export const splitAmountIntoInstallments = (totalAmount) => {
  const installments = [];
  let remainingAmount = totalAmount;

  while (remainingAmount > 0) {
    const installmentAmount = Math.min(remainingAmount, MAX_PAYMENT_AMOUNT);
    installments.push(installmentAmount);
    remainingAmount -= installmentAmount;
  }

  return installments;
};

/**
 * Calculate the total amount paid across all installments
 * @param {Array} installments - Array of installment objects
 * @returns {number} Total amount paid
 */
export const calculateTotalPaid = (installments) => {
  if (!installments || !installments.length) return 0;

  return installments
    .filter((installment) => installment.status === "completed")
    .reduce((sum, installment) => sum + installment.amount, 0);
};

/**
 * Check if all installments have been paid
 * @param {Array} installments - Array of installment objects
 * @returns {boolean} True if all installments are paid
 */
export const isFullyPaid = (installments) => {
  if (!installments || !installments.length) return false;

  return installments.every(
    (installment) => installment.status === "completed"
  );
};

/**
 * Calculate payment progress as a percentage
 * @param {number} totalAmount - The full payment amount
 * @param {number} paidAmount - The amount already paid
 * @returns {number} Percentage of payment completed
 */
export const calculatePaymentProgress = (totalAmount, paidAmount) => {
  if (!totalAmount || totalAmount === 0) return 0;
  return Math.round((paidAmount / totalAmount) * 100);
};

/**
 * Get the next installment that needs payment
 * @param {Array} installments - Array of installment objects
 * @returns {Object|null} The next installment to pay or null if all are paid
 */
export const getNextPendingInstallment = (installments) => {
  if (!installments || !installments.length) return null;

  return (
    installments.find((installment) => installment.status === "pending") || null
  );
};

/**
 * Format currency amount based on locale
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (e.g., 'FCFA')
 * @param {string} locale - Locale code (e.g., 'fr-FR', 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "FCFA", locale = "fr-FR") => {
  return `${new Intl.NumberFormat(locale).format(amount)} ${currency}`;
};

/**
 * Generate a unique transaction ID
 * @param {string} prefix - Prefix for the transaction ID
 * @returns {string} Unique transaction ID
 */
export const generateTransactionId = (prefix = "SIFIA") => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${randomStr}`;
};

/**
 * Get a human-readable payment status
 * @param {string} status - Payment status code
 * @param {string} language - Language code (e.g., 'fr', 'en')
 * @returns {Object} Object with status text and styles
 */
export const getPaymentStatusInfo = (status, language = "fr") => {
  const texts = {
    completed: {
      en: "Completed",
      fr: "Complété",
    },
    pending: {
      en: "Pending",
      fr: "En attente",
    },
    failed: {
      en: "Failed",
      fr: "Échoué",
    },
    partial: {
      en: "Partial",
      fr: "Partiel",
    },
  };

  switch (status) {
    case "completed":
      return {
        text: texts.completed[language] || texts.completed.fr,
        color: "green",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
      };
    case "pending":
      return {
        text: texts.pending[language] || texts.pending.fr,
        color: "amber",
        bgColor: "bg-amber-100",
        textColor: "text-amber-800",
      };
    case "failed":
      return {
        text: texts.failed[language] || texts.failed.fr,
        color: "red",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    case "partial":
      return {
        text: texts.partial[language] || texts.partial.fr,
        color: "blue",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    default:
      return {
        text: status,
        color: "gray",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
      };
  }
};
