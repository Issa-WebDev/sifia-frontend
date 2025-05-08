import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  participantTypes,
  getParticipantTypeById,
  getPackageById,
} from "../data/packagesData";
import { Loader2 } from "lucide-react";

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
      setError(t("invalidSelection"));
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
        `${process.env.VITE_BACKEND_URL}/api/payment`,
        registrationData
      );

      if (response.data.success) {
        // Check if this requires installment payments
        if (response.data.requires_installments) {
          // Navigate to installment payment page
          navigate(`/payment/${response.data.registration_id}`);
        } else if (response.data.payment_url) {
          // Redirect to CinetPay payment page
          window.location.href = response.data.payment_url;
        } else {
          setError(t("unexpectedResponse"));
        }
      } else {
        setError(response.data.message || t("registrationFailed"));
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || t("registrationError"));
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
        return new Intl.NumberFormat(
          language === "en" ? "en-US" : "fr-FR"
        ).format(packageType.price.fcfa);
      }
    }
    return "";
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8"
      id="registration"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t("registrationFormTitle")}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              {t("personalInformation")}
            </h3>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("firstName")} *
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
                {t("lastName")} *
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
                {t("email")} *
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
                {t("phone")} *
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
                {t("company")}
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
                {t("sector")}
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
              {t("addressAndPackage")}
            </h3>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("country")} *
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
                {t("city")} *
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
                {t("postal")} *
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
                {t("address")} *
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
                {t("participantType")} *
              </label>
              <select
                id="participantTypeId"
                name="participantTypeId"
                value={formData.participantTypeId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">{t("selectParticipantType")}</option>
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
                {t("package")} *
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
                <option value="">{t("selectPackage")}</option>
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
        <div className="mb-6">
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t("additionalInfo")}
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
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="text-blue-700">
              {t("selectedPackagePrice")}:
              <span className="font-bold ml-2">
                {getSelectedPackagePrice()} FCFA
              </span>
            </p>

            {/* Installment payment notice if price > 999,999 FCFA */}
            {getPackageById(formData.participantTypeId, formData.packageId)
              ?.price.fcfa > 999999 && (
              <p className="text-blue-700 mt-2">
                <span className="font-semibold">{t("installmentNotice")}</span>{" "}
                {t("installmentExplanation")}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t("processing")}
              </span>
            ) : (
              t("proceedToPayment")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
