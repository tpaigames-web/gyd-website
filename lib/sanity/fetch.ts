import { client } from "./client";
import {
  homepageQuery,
  siteSettingsQuery,
  aboutPageQuery,
  servicesQuery,
  teamMembersQuery,
  featuredTestimonialsQuery,
  faqQuery,
  blogPostsQuery,
} from "./queries";
import type {
  Homepage,
  SiteSettings,
  AboutPage,
  Service,
  TeamMember,
  Testimonial,
  FAQ,
  BlogPost,
} from "@/types/sanity";

export async function getHomepage(): Promise<Homepage | null> {
  return client.fetch(homepageQuery);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return client.fetch(aboutPageQuery);
}

export async function getServices(): Promise<Service[]> {
  return client.fetch(servicesQuery);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(teamMembersQuery);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(featuredTestimonialsQuery);
}

export async function getFAQ(): Promise<FAQ[]> {
  return client.fetch(faqQuery);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(blogPostsQuery);
}
