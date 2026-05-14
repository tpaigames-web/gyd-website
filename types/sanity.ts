export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Service {
  _id: string;
  titleZh: string;
  titleEn: string;
  slug: { current: string };
  shortDescZh: string;
  shortDescEn: string;
  icon?: SanityImage;
  order: number;
  featured: boolean;
}

export interface TeamMember {
  _id: string;
  nameZh: string;
  nameEn: string;
  positionZh: string;
  positionEn: string;
  photo?: SanityImage;
  order: number;
}

export interface Testimonial {
  _id: string;
  contentZh: string;
  contentEn: string;
  clientName: string;
  clientCompany?: string;
  rating: number;
  featured: boolean;
}

export interface FAQ {
  _id: string;
  questionZh: string;
  questionEn: string;
  answerZh: unknown;
  answerEn: unknown;
  category?: string;
  order: number;
}

export interface BlogPost {
  _id: string;
  titleZh: string;
  titleEn: string;
  slug: { current: string };
  excerptZh: string;
  excerptEn: string;
  coverImage?: SanityImage;
  publishedAt: string;
}

export interface Homepage {
  _id: string;
  heroEnabled?: boolean;
  heroTitleZh?: string;
  heroTitleEn?: string;
  heroSubtitleZh?: string;
  heroSubtitleEn?: string;
  heroBackgroundType?: "image" | "video" | "gradient";
  heroImage?: SanityImage;
  heroCTATextZh?: string;
  heroCTATextEn?: string;
  heroCTALink?: string;
  heroMarqueeTextZh?: string;
  heroMarqueeTextEn?: string;
  servicesEnabled?: boolean;
  servicesTitleZh?: string;
  servicesTitleEn?: string;
  featuredServices?: Service[];
  testimonialsEnabled?: boolean;
  featuredTestimonials?: Testimonial[];
  ctaEnabled?: boolean;
  ctaTitleZh?: string;
  ctaTitleEn?: string;
  seoTitleZh?: string;
  seoTitleEn?: string;
  seoDescriptionZh?: string;
  seoDescriptionEn?: string;
}

export interface ServiceCategory {
  _key: string;
  nameZh?: string;
  nameEn?: string;
  blurbZh?: string;
  blurbEn?: string;
  iconHint?: string;
}

export interface AboutPage {
  _id: string;
  taglineZh?: string;
  taglineEn?: string;
  taglineHighlights?: string[];
  taglineHighlightsEn?: string[];

  brandStoryEnabled?: boolean;
  brandStoryTitleZh?: string;
  brandStoryTitleEn?: string;
  brandStoryFormalName?: string;
  brandStoryLowercaseMark?: string;
  brandStoryAcronymZh?: string;
  brandStoryAcronymEn?: string;
  brandStoryPhilosophyZh?: string;
  brandStoryPhilosophyEn?: string;
  brandStoryNoteZh?: string;
  brandStoryNoteEn?: string;

  philosophyEnabled?: boolean;
  philosophySectionTitleZh?: string;
  philosophySectionTitleEn?: string;
  // Following come from homepage doc via GROQ projection
  philosophyQuoteZh?: string;
  philosophyQuoteEn?: string;
  positioningQuoteZh?: string;
  positioningQuoteEn?: string;

  categoriesEnabled?: boolean;
  categoriesTitleZh?: string;
  categoriesTitleEn?: string;
  categoriesSubtitleZh?: string;
  categoriesSubtitleEn?: string;
  categories?: ServiceCategory[];

  ctaEnabled?: boolean;
  ctaTitleZh?: string;
  ctaTitleEn?: string;
  ctaButtonTextZh?: string;
  ctaButtonTextEn?: string;
  ctaButtonLink?: string;

  seoTitleZh?: string;
  seoTitleEn?: string;
  seoDescriptionZh?: string;
  seoDescriptionEn?: string;
}

export interface SiteSettings {
  _id: string;
  logo?: SanityImage;
  primaryColor?: string;
  secondaryColor?: string;
  phone?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  email?: string;
  address?: string;
  businessHours?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    xiaohongshu?: string;
    tiktok?: string;
  };
  googleBusinessProfile?: string;
  cowSounds?: Array<{ _key: string; url?: string }>;
}
