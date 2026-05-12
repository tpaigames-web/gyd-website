export const COMPANY = {
  nameZh: process.env.NEXT_PUBLIC_COMPANY_NAME_ZH || "管一点营销",
  nameEn: process.env.NEXT_PUBLIC_COMPANY_NAME_EN || "GYD Marketing",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hq@gydmarketing.co",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+6588017838",
  location: "Iskandar Puteri, Johor, Malaysia",
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const placeholderImage = (width: number, height: number, text: string) =>
  `https://placehold.co/${width}x${height}/3B82F6/FFF?text=${encodeURIComponent(text)}`;
