import { z } from "zod";

export const fetchTracksSchema = z.object({
  href: z.string(),
  items: z.array(
    z.object({
      artists: z.array(
        z.object({
          external_urls: z.object({ spotify: z.string() }),
          href: z.string(),
          id: z.string(),
          name: z.string(),
          type: z.string(),
          uri: z.string(),
        })
      ),
      available_markets: z.array(z.string()),
      disc_number: z.number(),
      duration_ms: z.number(),
      explicit: z.boolean(),
      external_urls: z.object({ spotify: z.string() }),
      href: z.string(),
      id: z.string(),
      is_local: z.boolean(),
      name: z.string(),
      preview_url: z.string(),
      track_number: z.number(),
      type: z.string(),
      uri: z.string(),
    })
  ),
  limit: z.number(),
  next: z.null(),
  offset: z.number(),
  previous: z.null(),
  total: z.number(),
});
