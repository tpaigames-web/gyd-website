export const homepageQuery = `*[_type == "homepage"][0]{
  ...,
  featuredServices[]->,
  featuredTestimonials[]->
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc)`;

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc)`;

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true]`;

export const faqQuery = `*[_type == "faq"] | order(order asc)`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc)`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  ...,
  "cowSounds": cowSounds[]{ _key, "url": asset->url }
}`;

// Pull aboutPage doc + project philosophy quotes from homepage doc
// (single source of truth — edit homepage = updates About philosophy too).
export const aboutPageQuery = `*[_id == "aboutPage"][0]{
  ...,
  "philosophyQuoteZh": *[_id == "homepage"][0].philosophyQuoteZh,
  "philosophyQuoteEn": *[_id == "homepage"][0].philosophyQuoteEn,
  "positioningQuoteZh": *[_id == "homepage"][0].positioningQuoteZh,
  "positioningQuoteEn": *[_id == "homepage"][0].positioningQuoteEn
}`;
