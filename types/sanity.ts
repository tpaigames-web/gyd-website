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
