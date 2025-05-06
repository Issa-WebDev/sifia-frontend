import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import axios from "axios";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import {
  participantTypes,
  getParticipantTypeById,
  getPackageById,
} from "../data/packagesData";
import { formatPrice } from "../lib/utils";

interface RegistrationFormProps {
  onRegistrationSuccess: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  participantTypeId: string;
  packageId: string;
  sector: string;
  additionalInfo: string;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegistrationSuccess,
}) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    participantTypeId: "",
    packageId: "",
    sector: "",
    additionalInfo: "",
  });

  const countriesList = Object.entries(countries)
    .map(([code, data]) => ({
      code,
      name: data.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const participantTypeId = searchParams.get("type");
    const packageId = searchParams.get("package");

    if (participantTypeId) {
      setFormData((prev) => ({ ...prev, participantTypeId }));
    }

    if (packageId) {
      setFormData((prev) => ({ ...prev, packageId }));
    }
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
  };

  const nextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast.info(t("creatingPaymentSession"));

      const selectedPackage = getPackageById(
        formData.participantTypeId,
        formData.packageId
      );
      const participantType = getParticipantTypeById(
        formData.participantTypeId
      );

      if (!selectedPackage || !participantType) {
        throw new Error("Invalid package selection");
      }

      const paymentData = {
        ...formData,
        participantType:
          participantType.name[language as keyof typeof participantType.name],
        packageName:
          selectedPackage.name[language as keyof typeof selectedPackage.name],
        amount: selectedPackage.price.fcfa,
        currency: "FCFA",
        language,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment`,
        paymentData
      );

      const { payment_url } = response.data;
      toast.success(t("redirectingToPayment"));
      onRegistrationSuccess();
      window.location.href = payment_url;
    } catch (error) {
      toast.error(t("paymentInitiationFailed"));
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!formData.participantTypeId || !formData.packageId) return null;

    const selectedPackage = getPackageById(
      formData.participantTypeId,
      formData.packageId
    );
    if (!selectedPackage) return null;

    return selectedPackage.price;
  };

  const price = calculatePrice();

  const validateStep1 = () => {
    return formData.participantTypeId !== "";
  };

  const validateStep2 = () => {
    return formData.packageId !== "";
  };

  const validateStep3 = () => {
    return (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      formData.email.includes("@") &&
      formData.phone !== "" &&
      formData.country !== ""
    );
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-10 h-10 rounded-full ${
                formStep >= step ? "bg-sifia-blue" : "bg-gray-300"
              } text-white flex items-center justify-center font-bold`}
            >
              {formStep > step ? <Check size={20} /> : step}
            </div>
            {step < 4 && (
              <div
                className={`h-1 w-12 ${
                  formStep > step ? "bg-sifia-blue" : "bg-gray-300"
                } mx-2`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
      {renderStepIndicator()}

      <form
        onSubmit={formStep === 4 ? handleSubmit : (e) => e.preventDefault()}
        className="space-y-6"
      >
        {formStep === 1 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("step1Title")}
            </h2>

            <div className="space-y-6">
              <div>
                <Label
                  className="block text-sifia-blue font-medium mb-2"
                  htmlFor="participantTypeId"
                >
                  {t("participationTypeLabel")} *
                </Label>

                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  {participantTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.participantTypeId === type.id
                          ? "border-sifia-blue bg-sifia-blue/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          participantTypeId: type.id,
                          packageId: "",
                        }))
                      }
                    >
                      <div className="flex items-center justify-center h-12 mb-2 text-2xl">
                        {type.id === "local-exhibitor"
                          ? "🏢"
                          : type.id === "international-exhibitor"
                          ? "🌍"
                          : "🧑"}
                      </div>
                      <h3 className="font-medium text-center">
                        {type.name[language as keyof typeof type.name]}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  className={`sifia-button-primary ${
                    !validateStep1() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!validateStep1()}
                  onClick={nextStep}
                >
                  <span>{t("nextBtn")}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {formStep === 2 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("step2Title")}
            </h2>

            <div className="space-y-6">
              <div>
                <Label
                  className="block text-sifia-blue font-medium mb-2"
                  htmlFor="packageId"
                >
                  {t("packageLabel")} *
                </Label>

                {formData.participantTypeId && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {getParticipantTypeById(
                      formData.participantTypeId
                    )?.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all relative ${
                          formData.packageId === pkg.id
                            ? "border-sifia-blue bg-sifia-blue/5"
                            : pkg.popular
                            ? "border-sifia-blue"
                            : "border-gray-300 hover:border-gray-400"
                        } ${
                          pkg.id === "gold"
                            ? "bg-gradient-to-b from-amber-50 to-white"
                            : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            packageId: pkg.id,
                          }))
                        }
                      >
                        {pkg.popular && (
                          <div className="absolute top-0 right-0 bg-sifia-blue text-white px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg">
                            {t("popular")}
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">
                            {pkg.name[language as keyof typeof pkg.name]}
                          </h3>
                          <span className="text-sifia-gold">
                            {pkg.id === "basic" || pkg.id === "standard"
                              ? "🥉"
                              : pkg.id === "prestige" || pkg.id === "vip"
                              ? "🥈"
                              : "🥇"}
                          </span>
                        </div>

                        <div className="text-xl font-bold mb-4 text-sifia-blue">
                          {formatPrice(pkg.price.fcfa)}
                          {pkg.price.usd && (
                            <span className="block text-sm font-normal text-gray-600">
                              {`${pkg.price.usd}$`}
                            </span>
                          )}
                        </div>

                        <ul className="space-y-2 mb-4 text-sm">
                          {pkg.features[language as keyof typeof pkg.features]
                            .slice(0, 4)
                            .map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-sifia-gold mr-2">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          {pkg.features[language as keyof typeof pkg.features]
                            .length > 4 && (
                            <li className="text-sm text-gray-500 italic">
                              +{" "}
                              {pkg.features[
                                language as keyof typeof pkg.features
                              ].length - 4}{" "}
                              {t("moreFeatures")}
                            </li>
                          )}
                        </ul>

                        {formData.packageId === pkg.id && (
                          <div className="absolute inset-0 border-2 border-sifia-blue rounded-lg pointer-events-none"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  onClick={prevStep}
                >
                  <ChevronLeft size={18} />
                  <span>{t("backBtn")}</span>
                </button>

                <button
                  type="button"
                  className={`sifia-button-primary flex items-center ${
                    !validateStep2() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!validateStep2()}
                  onClick={nextStep}
                >
                  <span>{t("nextBtn")}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {formStep === 3 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("step3Title")}
            </h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    className="block text-sifia-blue font-medium mb-2"
                    htmlFor="firstName"
                  >
                    {t("firstNameLabel")} *
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label
                    className="block text-sifia-blue font-medium mb-2"
                    htmlFor="lastName"
                  >
                    {t("lastNameLabel")} *
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    className="block text-sifia-blue font-medium mb-2"
                    htmlFor="email"
                  >
                    {t("emailLabel")} *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label
                    className="block text-sifia-blue font-medium mb-2"
                    htmlFor="phone"
                  >
                    {t("phoneLabel")} *
                  </Label>
                  <PhoneInput
                    international
                    defaultCountry="CI"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    className="block text-sifia-blue font-medium mb-2"
                    htmlFor="company"
                  >
                    {t("companyLabel")}
                  </Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label
                    className="block text-sifia-blue font-medium mb-2"
                    htmlFor="country"
                  >
                    {t("countryLabel")} *
                  </Label>
                  <Select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full"
                    required
                  >
                    <option value="">{t("selectCountry")}</option>
                    {countriesList.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <Label
                  className="block text-sifia-blue font-medium mb-2"
                  htmlFor="sector"
                >
                  {t("sectorLabel")}
                </Label>
                <Input
                  type="text"
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  onClick={prevStep}
                >
                  <ChevronLeft size={18} />
                  <span>{t("backBtn")}</span>
                </button>

                <button
                  type="button"
                  className={`sifia-button-primary flex items-center ${
                    !validateStep3() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!validateStep3()}
                  onClick={nextStep}
                >
                  <span>{t("nextBtn")}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {formStep === 4 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("step4Title")}
            </h2>

            {formData.participantTypeId === "exhibitor" && (
              <div className="mb-6">
                <Label
                  className="block text-sifia-blue font-medium mb-2"
                  htmlFor="additionalInfo"
                >
                  {t("additionalInfoLabel")}
                </Label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sifia-blue focus:border-transparent outline-none"
                  rows={4}
                ></textarea>
              </div>
            )}

            <div className="bg-gray-50 p-5 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-4 text-sifia-blue border-b pb-2">
                {t("registrationSummary")}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{t("participationType")}:</span>
                  <span>
                    {formData.participantTypeId &&
                      (() => {
                        const type = getParticipantTypeById(
                          formData.participantTypeId
                        );
                        return (
                          type?.name?.[language as keyof typeof type.name] ?? ""
                        );
                      })()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t("packageType")}:</span>
                  <span>
                    {formData.packageId &&
                      formData.participantTypeId &&
                      (() => {
                        const pkg = getPackageById(
                          formData.participantTypeId,
                          formData.packageId
                        );
                        return (
                          pkg?.name?.[language as keyof typeof pkg.name] ?? ""
                        );
                      })()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t("name")}:</span>
                  <span>
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t("email")}:</span>
                  <span>{formData.email}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t("phone")}:</span>
                  <span>{formData.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">{t("country")}:</span>
                  <span>
                    {formData.country &&
                      countries[formData.country as keyof typeof countries]
                        ?.name}
                  </span>
                </div>

                {formData.company && (
                  <div className="flex justify-between">
                    <span className="font-medium">{t("company")}:</span>
                    <span>{formData.company}</span>
                  </div>
                )}

                {formData.sector && (
                  <div className="flex justify-between">
                    <span className="font-medium">{t("sector")}:</span>
                    <span>{formData.sector}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>{t("totalAmount")}:</span>
                  <span className="text-sifia-blue">
                    {price ? formatPrice(price.fcfa) : "-"}
                    {price?.usd && (
                      <span className="block text-sm font-normal text-gray-600 text-right">
                        {`${price.usd}$`}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <p className="text-sm text-gray-500 mb-4">
                {t("termsAgreement")}
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                onClick={prevStep}
              >
                <ChevronLeft size={18} />
                <span>{t("backBtn")}</span>
              </button>

              <button
                type="submit"
                className="sifia-button-primary flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-block animate-spin mr-2">⟳</span>
                ) : null}
                <span>{t("submitAndPayBtn")}</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
