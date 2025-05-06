import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { Globe, UserRound, Handshake, Map } from "lucide-react";

const OfferCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  link: string;
  btnText: string;
}> = ({ title, description, icon, link, btnText }) => (
  <div className="sifia-card animate-fade-in">
    <div className="flex justify-center mb-6">
      <div className="bg-sifia-blue/10 w-16 h-16 flex items-center justify-center rounded-full">
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-sifia-blue">{title}</h3>
    <p className="text-sifia-gray mb-6">{description}</p>
    <Link
      to={link}
      className="inline-block text-sifia-blue font-semibold hover:text-sifia-gold transition-colors"
    >
      {btnText} →
    </Link>
  </div>
);

const OffersSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="sifia-section bg-gray-50" id="offers">
      <div className="sifia-container">
        <div className="text-center mb-12">
          <h2 className="sifia-heading">{t("offersTitle")}</h2>
          <p className="sifia-subheading">{t("offersSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <OfferCard
            title={t("visitorTitle")}
            description={t("visitorDesc")}
            icon={<UserRound />}
            link="/offers/visitors"
            btnText={t("moreInfo")}
          />
          <OfferCard
            title={t("exhibitorLocalTitle")}
            description={t("exhibitorLocalDesc")}
            icon={<Map />}
            link="/offers/local-exhibitors"
            btnText={t("moreInfo")}
          />
          <OfferCard
            title={t("exhibitorIntTitle")}
            description={t("exhibitorIntDesc")}
            icon={<Globe />}
            link="/offers/international-exhibitors"
            btnText={t("moreInfo")}
          />
          <OfferCard
            title={t("sponsorTitle")}
            description={t("sponsorDesc")}
            icon={<Handshake />}
            link="/offers/sponsors"
            btnText={t("moreInfo")}
          />
        </div>

        <div className="mt-12 text-center">
          <Link to="/register" className="sifia-button-primary">
            {t("registerBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
