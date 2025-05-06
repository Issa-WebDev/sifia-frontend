import React, { useState } from "react";
import { Language, useLanguage } from "../context/LanguageContext";
import { ChevronDown } from "lucide-react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "/fr.svg" },
  { code: "en", label: "English", flag: "/en.svg" },
  { code: "tr", label: "Türkçe", flag: "/tr.svg" },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border px-4 py-2 rounded-md bg-white hover:shadow-md"
      >
        <img
          src={currentLang?.flag}
          alt={currentLang?.label}
          className="w-5 h-5"
        />
        <span className="uppercase text-sm font-medium">
          {currentLang?.code}
        </span>
        <ChevronDown />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 right-0 w-40 bg-white border rounded-md shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-6 py-4 text-sm hover:bg-gray-100 ${
                language === lang.code
                  ? "bg-sifia-blue text-white rounded-md hover:bg-sifia-blue/90"
                  : "text-gray-700"
              }`}
            >
              <img src={lang.flag} alt={lang.label} className="w-5 h-5 mr-2" />
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
