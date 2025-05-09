import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  participantTypes,
  getParticipantTypeById,
  getPackageById,
} from "../data/packagesData";
import { Loader2, AlertCircle, Check } from "lucide-react";

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    postal: "",
    city: "",
    address: "",
    participantTypeId: "",
    packageId: "",
    sector: "",
    additionalInfo: "",
  });

  const [availablePackages, setAvailablePackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [needsInstallments, setNeedsInstallments] = useState(false);

  // Maximum payment amount allowed by CinetPay
  const MAX_PAYMENT_AMOUNT = 999999;

  // Set available packages based on selected participant type
  useEffect(() => {
    if (formData.participantTypeId) {
      const participantType = getParticipantTypeById(
        formData.participantTypeId
      );
      if (participantType) {
        setAvailablePackages(participantType.packages);
        // Reset package selection when participant type changes
        setFormData((prev) => ({ ...prev, packageId: "" }));
      }
    }
  }, [formData.participantTypeId]);

  // Check if selected package requires installments
  useEffect(() => {
    if (formData.participantTypeId && formData.packageId) {
      const packageData = getPackageById(
        formData.participantTypeId,
        formData.packageId
      );
      if (packageData) {
        setNeedsInstallments(packageData.price.fcfa > MAX_PAYMENT_AMOUNT);
      }
    } else {
      setNeedsInstallments(false);
    }
  }, [formData.participantTypeId, formData.packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Get participant type and package details
    const participantType = getParticipantTypeById(formData.participantTypeId);
    const packageType = getPackageById(
      formData.participantTypeId,
      formData.packageId
    );

    if (!participantType || !packageType) {
      setError(
        t("invalidSelection") ||
          "Please select valid participant type and package"
      );
      setLoading(false);
      return;
    }

    try {
      // Prepare registration data
      const registrationData = {
        ...formData,
        participantType:
          language === "en" ? participantType.name.en : participantType.name.fr,
        packageName:
          language === "en" ? packageType.name.en : packageType.name.fr,
        amount: packageType.price.fcfa,
        currency: "FCFA",
        language,
      };

      // Submit registration
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment`,
        registrationData
      );

      if (response.data.success) {
        // Check if this requires installment payments
        if (response.data.requires_installments) {
          // Navigate to installment payment page
          navigate(
            `/payment-page?registration_id=${response.data.registration_id}`
          );
        } else if (response.data.payment_url) {
          // Redirect to CinetPay payment page
          window.location.href = response.data.payment_url;
        } else {
          setError(t("unexpectedResponse") || "Unexpected server response");
        }
      } else {
        setError(
          response.data.message ||
            t("registrationFailed") ||
            "Registration failed"
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          t("registrationError") ||
          "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate price display
  const getSelectedPackagePrice = () => {
    if (formData.participantTypeId && formData.packageId) {
      const packageType = getPackageById(
        formData.participantTypeId,
        formData.packageId
      );
      if (packageType) {
        return {
          raw: packageType.price.fcfa,
          formatted: new Intl.NumberFormat(
            language === "en" ? "en-US" : "fr-FR"
          ).format(packageType.price.fcfa),
        };
      }
    }
    return { raw: 0, formatted: "" };
  };

  // Calculate number of installments needed
  const calculateInstallments = (totalAmount) => {
    let remaining = totalAmount;
    let count = 0;

    while (remaining > 0) {
      const installmentAmount = Math.min(remaining, MAX_PAYMENT_AMOUNT);
      remaining -= installmentAmount;
      count++;
    }

    return count;
  };

  const selectedPrice = getSelectedPackagePrice();

  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8"
      id="registration"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t("registerTitle") || "Register for SIFIA"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-5 rounded-md mb-6 flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            {t("registrationSuccessTitle") || "Registration Successful!"}
          </h3>
          <p className="text-center mb-4">
            {t("registrationSuccessMessage") ||
              "Your registration has been submitted successfully."}
          </p>
          <p className="text-center text-sm">
            {t("registrationSuccessEmail") ||
              "You will receive a confirmation email shortly."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                {t("personalInformation") || "Personal Information"}
              </h3>

              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("firstNameLabel") || "First Name"} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("lastNameLabel") || "Last Name"} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("emailLabel") || "Email"} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("phoneLabel") || "Phone"} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("companyLabel") || "Company"}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="sector"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("sector") || "Sector"}
                </label>
                <input
                  type="text"
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Address and Package Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                {t("addressAndPackage") || "Address & Package"}
              </h3>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("countryLabel") || "Country"} *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("city") || "City"} *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="postal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("postal") || "Postal Code"} *
                </label>
                <input
                  type="text"
                  id="postal"
                  name="postal"
                  value={formData.postal}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("address") || "Address"} *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="participantTypeId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("participantTypeId") || "Participant Type"} *
                </label>
                <select
                  id="participantTypeId"
                  name="participantTypeId"
                  value={formData.participantTypeId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">
                    {t("selectParticipantType") || "Select Participant Type"}
                  </option>
                  {participantTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {language === "en" ? type.name.en : type.name.fr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="packageId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("packageId") || "Package"} *
                </label>
                <select
                  id="packageId"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!formData.participantTypeId}
                >
                  <option value="">
                    {t("selectPackage") || "Select Package"}
                  </option>
                  {availablePackages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {language === "en" ? pkg.name.en : pkg.name.fr} -{" "}
                      {new Intl.NumberFormat(
                        language === "en" ? "en-US" : "fr-FR"
                      ).format(pkg.price.fcfa)}{" "}
                      FCFA
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("additionalInfo") || "Additional Information"}
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Selected Package Price */}
          {formData.participantTypeId && formData.packageId && (
            <div
              className={`p-4 rounded-md border ${
                needsInstallments
                  ? "bg-amber-50 border-amber-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <p
                className={`${
                  needsInstallments ? "text-amber-700" : "text-blue-700"
                } font-medium`}
              >
                {t("selectedPackagePrice") || "Selected Package Price"}:
                <span className="font-bold ml-2">
                  {selectedPrice.formatted} FCFA
                </span>
              </p>

              {/* Installment payment notice if price > 999,999 FCFA */}
              {needsInstallments && (
                <div className="mt-3">
                  <p className="text-amber-700 font-semibold mb-1">
                    {t("installmentNotice") ||
                      "Payment will be processed in installments"}
                  </p>
                  <p className="text-amber-600 text-sm">
                    {t("installmentExplanation") ||
                      `Due to payment processor limits, this amount will be split into ${calculateInstallments(
                        selectedPrice.raw
                      )} installments.`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-sifia-blue text-white font-medium rounded-md hover:bg-sifia-dark-blue transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("processing") || "Processing..."}
                </span>
              ) : (
                t("proceedToPayment") || "Proceed to Payment"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
