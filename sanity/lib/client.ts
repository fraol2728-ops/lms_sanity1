import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const readToken = process.env.SANITY_API_READ_TOKEN;
const perspective = readToken ? "drafts" : "published";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective,
  token: readToken,
});

// Write client for mutations - server-side only
// Requires SANITY_API_WRITE_TOKEN env var with Editor or higher permissions
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});
