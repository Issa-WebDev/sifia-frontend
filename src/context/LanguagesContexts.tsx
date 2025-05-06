import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// Define language resources
const resources = {
  en: {
    translation: {
      // General
      sifia: "SIFIA 2025",
      backToOffers: "Back to offers",
      backToHome: "Back to Home",

      // Navigation
      home: "Home",
      about: "About",
      offers: "Offers",
      register: "Register",
      contact: "Contact",

      // Registration Form
      registerTitle: "Register for SIFIA 2025",
      registerSubtitle: "Join us at the largest African innovation forum",
      step1Title: "Choose your participant type",
      step2Title: "Select your package",
      step3Title: "Personal information",
      step4Title: "Review and Payment",
      participationTypeLabel: "Participant Type",
      packageLabel: "Choose your package",
      moreFeatures: "more features",
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      emailLabel: "Email",
      phoneLabel: "Phone Number",
      companyLabel: "Company/Organization",
      countryLabel: "Country",
      sectorLabel: "Sector of Activity",
      additionalInfoLabel: "Additional Information (Stand requirements)",
      selectCountry: "Select your country",
      registrationSummary: "Registration Summary",
      participationType: "Participant Type",
      packageType: "Package",
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      country: "Country",
      sector: "Sector",
      totalAmount: "Total Amount",
      termsAgreement:
        'By clicking "Submit", you agree to the terms and conditions of SIFIA 2025.',

      // Participant Types
      visitor: "Visitor",
      exhibitor: "Exhibitor",
      sponsor: "Sponsor",
      localExhibitor: "Local Exhibitor",
      internationalExhibitor: "International Exhibitor",

      // Package Types
      basicPackage: "Basic Package",
      standardPackage: "Standard Package",
      prestigePackage: "Prestige Package",
      goldPackage: "Gold Package",
      vipPackage: "VIP Package",
      vvipPackage: "VVIP Package",
      popular: "Popular",

      // Buttons
      backBtn: "Back",
      nextBtn: "Next",
      submitBtn: "Continue",
      submitAndPayBtn: "Submit and Pay",

      // Payment
      creatingPaymentSession: "Creating payment session...",
      redirectingToPayment: "Redirecting to payment...",
      paymentInitiationFailed: "Payment initiation failed",
      paymentSuccessful: "Payment successful",
      paymentFailed: "Payment failed",

      // Registration Success
      registrationSuccessTitle: "Registration Successful!",
      registrationSuccessMessage:
        "Your registration for SIFIA 2025 has been received and confirmed. Thank you for your payment.",
      registrationSuccessEmail:
        "You will receive a confirmation email with all the details shortly.",
    },
  },
  fr: {
    translation: {
      // General
      sifia: "SIFIA 2025",
      backToOffers: "Retour aux offres",
      backToHome: "Retour à l'accueil",

      // Navigation
      home: "Accueil",
      about: "À propos",
      offers: "Offres",
      register: "Inscription",
      contact: "Contact",

      // Registration Form
      registerTitle: "Inscription au SIFIA 2025",
      registerSubtitle:
        "Rejoignez-nous au plus grand forum d'innovation africain",
      step1Title: "Choisissez votre type de participant",
      step2Title: "Sélectionnez votre forfait",
      step3Title: "Informations personnelles",
      step4Title: "Récapitulatif et Paiement",
      participationTypeLabel: "Type de participant",
      packageLabel: "Choisissez votre forfait",
      moreFeatures: "autres fonctionnalités",
      firstNameLabel: "Prénom",
      lastNameLabel: "Nom",
      emailLabel: "Email",
      phoneLabel: "Numéro de téléphone",
      companyLabel: "Entreprise/Organisation",
      countryLabel: "Pays",
      sectorLabel: "Secteur d'activité",
      additionalInfoLabel: "Informations supplémentaires (exigences du stand)",
      selectCountry: "Sélectionnez votre pays",
      registrationSummary: "Récapitulatif d'inscription",
      participationType: "Type de participant",
      packageType: "Forfait",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      company: "Entreprise",
      country: "Pays",
      sector: "Secteur",
      totalAmount: "Montant total",
      termsAgreement:
        'En cliquant sur "Soumettre", vous acceptez les termes et conditions du SIFIA 2025.',

      // Participant Types
      visitor: "Visiteur",
      exhibitor: "Exposant",
      sponsor: "Sponsor",
      localExhibitor: "Exposant Local",
      internationalExhibitor: "Exposant International",

      // Package Types
      basicPackage: "Forfait Basique",
      standardPackage: "Forfait Standard",
      prestigePackage: "Forfait Prestige",
      goldPackage: "Forfait Or",
      vipPackage: "Forfait VIP",
      vvipPackage: "Forfait VVIP",
      popular: "Populaire",

      // Buttons
      backBtn: "Retour",
      nextBtn: "Suivant",
      submitBtn: "Continuer",
      submitAndPayBtn: "Soumettre et Payer",

      // Payment
      creatingPaymentSession: "Création de la session de paiement...",
      redirectingToPayment: "Redirection vers le paiement...",
      paymentInitiationFailed: "Échec de l'initialisation du paiement",
      paymentSuccessful: "Paiement réussi",
      paymentFailed: "Échec du paiement",

      // Registration Success
      registrationSuccessTitle: "Inscription Réussie !",
      registrationSuccessMessage:
        "Votre inscription au SIFIA 2025 a été reçue et confirmée. Merci pour votre paiement.",
      registrationSuccessEmail:
        "Vous recevrez bientôt un email de confirmation avec tous les détails.",
    },
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "fr", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

// Create context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState("fr");
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
