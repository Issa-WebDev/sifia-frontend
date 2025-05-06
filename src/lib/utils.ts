import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a unique confirmation code for registrations
export function generateConfirmationCode(): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SIFIA-2025-${randomPart}`;
}

// Calculate price based on participant type and package
export function calculatePrice(
  participantType: string,
  packageType: string
): number {
  const prices = {
    localExhibitor: {
      basic: 1000000,
      prestige: 2000000,
      gold: 5000000,
    },
    internationalExhibitor: {
      standard: 2500000,
      prestige: 4000000,
      gold: 6500000,
    },
    visitor: {
      standard: 350000,
      vip: 550000,
      vvip: 850000,
    },
  };

  // Default to 0 if combination not found
  return (
    prices[participantType as keyof typeof prices]?.[
      packageType as keyof (typeof prices)[keyof typeof prices]
    ] || 0
  );
}

export function formatPrice(price: number, currency: string = "FCFA"): string {
  // For USD, convert from FCFA and format
  if (currency === "USD") {
    // Approximate conversion rate
    const usdPrice = price / 550;
    return `$${usdPrice.toFixed(2)}`;
  }

  // Default FCFA formatting
  return new Intl.NumberFormat("fr-FR").format(price) + " " + currency;
}