import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-12-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const client = createClient(sanityConfig);

const builder = createImageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
