export type PackageType = {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  price: {
    fcfa: number;
    usd?: number;
  };
  popular?: boolean;
  features: {
    en: string[];
    fr: string[];
  };
};

export type ParticipantType = {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  packages: PackageType[];
};

export const participantTypes: ParticipantType[] = [
  {
    id: "local-exhibitor",
    name: {
      en: "Local Exhibitors",
      fr: "Exposants Locaux",
    },
    packages: [
      {
        id: "basic",
        name: {
          en: "Basic Package",
          fr: "Forfait Basique",
        },
        price: {
          fcfa: 100,
        },
        features: {
          en: ["4 m² stand", "1 table & 2 chairs", "TV"],
          fr: ["Stand 4 m²", "1 table & 2 chaises", "TV"],
        },
      },
      {
        id: "prestige",
        name: {
          en: "Prestige Package",
          fr: "Forfait Prestige",
        },
        price: {
          fcfa: 2000000,
        },
        popular: true,
        features: {
          en: [
            "12 m² stand",
            "Lounge with 3 seats",
            "2 TVs",
            "1 table & 4 chairs",
            "Tablets",
            "Official sponsor",
            "Branding",
            "Speech at closing",
            "Masterclass (2 places)",
            "Online banner",
          ],
          fr: [
            "Stand prestige 12 m²",
            "Salon 3 places",
            "2 TV",
            "1 table & 4 chaises",
            "Tablettes",
            "Sponsor officiel",
            "Branding",
            "Discours de clôture",
            "Masterclass (2 places)",
            "Bannière en ligne",
          ],
        },
      },
      {
        id: "gold",
        name: {
          en: "Gold Package",
          fr: "Forfait Or",
        },
        price: {
          fcfa: 5000000,
        },
        features: {
          en: [
            "Panelist",
            "24 m² stand",
            "Lounge with 5 seats",
            "2 TVs",
            "1 table & 4 chairs",
            "Tablets",
            "Main sponsor",
            "Branding",
            "Speech at closing gala",
            "Masterclass (4 places)",
            "Online banner",
          ],
          fr: [
            "Panéliste",
            "Stand or 24 m²",
            "Salon 5 places",
            "2 TV",
            "1 table & 4 chaises",
            "Tablettes",
            "Sponsor principal",
            "Branding",
            "Discours de clôture et gala",
            "Masterclass (4 places)",
            "Bannière en ligne",
          ],
        },
      },
    ],
  },
  {
    id: "international-exhibitor",
    name: {
      en: "International Exhibitors",
      fr: "Exposants Internationaux",
    },
    packages: [
      {
        id: "standard",
        name: {
          en: "Standard Package",
          fr: "Forfait Standard",
        },
        price: {
          fcfa: 2500000,
          usd: 3960,
        },
        features: {
          en: [
            "6 m² stand",
            "1 table & 2 chairs",
            "TV + USB + HDMI",
            "Accommodation (SEEN HOTEL)",
            "4 nights",
            "Lunch at expo",
            "Dinner at hotel",
          ],
          fr: [
            "Stand basique 6 m²",
            "1 table & 2 chaises",
            "TV + USB + HDMI",
            "Hébergement (SEEN HOTEL)",
            "4 nuits",
            "Déjeuner à l'expo",
            "Dîner à l'hôtel",
          ],
        },
      },
      {
        id: "prestige",
        name: {
          en: "Prestige Package",
          fr: "Forfait Prestige",
        },
        price: {
          fcfa: 4000000,
          usd: 6350,
        },
        popular: true,
        features: {
          en: [
            "12 m² stand",
            "Lounge with 3 seats",
            "2 TVs",
            "1 table & 4 chairs",
            "Tablets",
            "Official sponsor",
            "Branding",
            "Accommodation (HOTEL BYBLOS)",
            "Speech at closing",
            "Masterclass (2 places)",
          ],
          fr: [
            "Stand prestige 12 m²",
            "Salon 3 places",
            "2 TV",
            "1 table & 4 chaises",
            "Tablettes",
            "Sponsor officiel",
            "Branding",
            "Hébergement (HOTEL BYBLOS)",
            "Discours de clôture",
            "Masterclass (2 places)",
          ],
        },
      },
      {
        id: "gold",
        name: {
          en: "Gold Package",
          fr: "Forfait Or",
        },
        price: {
          fcfa: 6500000,
          usd: 10200,
        },
        features: {
          en: [
            "Panelist",
            "24 m² stand",
            "Lounge with 5 seats",
            "2 TVs",
            "1 table & 4 chairs",
            "Tablets",
            "Main sponsor",
            "Branding",
            "Speech at closing gala",
            "Masterclass (4 places)",
            "Accommodation (HOTEL BYBLOS)",
            "Official introduction",
          ],
          fr: [
            "Panéliste",
            "Stand or 24 m²",
            "Salon 5 places",
            "2 TV",
            "1 table & 4 chaises",
            "Tablettes",
            "Sponsor principal",
            "Branding",
            "Discours de clôture et gala",
            "Masterclass (4 places)",
            "Hébergement (HOTEL BYBLOS)",
            "Introduction officielle",
          ],
        },
      },
    ],
  },
  {
    id: "visitor",
    name: {
      en: "Visitors",
      fr: "Visiteurs",
    },
    packages: [
      {
        id: "standard",
        name: {
          en: "Standard Package",
          fr: "Forfait Standard",
        },
        price: {
          fcfa: 350000,
          usd: 650,
        },
        features: {
          en: [
            "SEEN HOTEL",
            "4 nights",
            "Shuttle",
            "Breakfast",
            "Dinner",
            "Forum ticket",
            "Gala dinner",
            "Conference",
            "Panel",
          ],
          fr: [
            "HOTEL SEEN",
            "4 nuits",
            "Navette",
            "Petit-déjeuner",
            "Dîner",
            "Billet pour le forum",
            "Dîner de gala",
            "Conférence",
            "Panel",
          ],
        },
      },
      {
        id: "vip",
        name: {
          en: "VIP Package",
          fr: "Forfait VIP",
        },
        price: {
          fcfa: 550000,
          usd: 990,
        },
        popular: true,
        features: {
          en: [
            "BYBLOS HOTEL",
            "4 nights",
            "Shuttle",
            "Breakfast",
            "Dinner",
            "Forum ticket",
            "Gala dinner",
            "Conference",
            "Panel",
          ],
          fr: [
            "HOTEL BYBLOS",
            "4 nuits",
            "Navette",
            "Petit-déjeuner",
            "Dîner",
            "Billet pour le forum",
            "Dîner de gala",
            "Conférence",
            "Panel",
          ],
        },
      },
      {
        id: "vvip",
        name: {
          en: "VVIP Package",
          fr: "Forfait VVIP",
        },
        price: {
          fcfa: 850000,
          usd: 1550,
        },
        features: {
          en: [
            "SOFITEL NOOM HOTEL",
            "4 nights",
            "Shuttle",
            "Breakfast",
            "Dinner",
            "Forum ticket",
            "Gala dinner",
            "Conference",
            "Panel",
            "VIP Protocol",
          ],
          fr: [
            "HOTEL SOFITEL NOOM",
            "4 nuits",
            "Navette",
            "Petit-déjeuner",
            "Dîner",
            "Billet pour le forum",
            "Dîner de gala",
            "Conférence",
            "Panel",
            "Protocole VIP",
          ],
        },
      },
    ],
  },
];

export const getParticipantTypeById = (
  id: string
): ParticipantType | undefined => {
  return participantTypes.find((type) => type.id === id);
};

export const getPackageById = (
  participantTypeId: string,
  packageId: string
): PackageType | undefined => {
  const participantType = getParticipantTypeById(participantTypeId);
  if (!participantType) return undefined;

  return participantType.packages.find((pkg) => pkg.id === packageId);
};
