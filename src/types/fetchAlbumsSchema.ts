import { z } from "zod";

export const fetchAlbumsSchema = z.object({
  albums: z.object({
    href: z.string(),
    items: z.array(
      z.object({
        album_group: z.string(),
        album_type: z.string(),
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
        external_urls: z.object({ spotify: z.string() }),
        href: z.string(),
        id: z.string(),
        images: z.array(
          z.object({ height: z.number(), url: z.string(), width: z.number() })
        ),
        name: z.string(),
        release_date: z.string(),
        release_date_precision: z.string(),
        total_tracks: z.number(),
        type: z.string(),
        uri: z.string(),
      })
    ),
    limit: z.number(),
    next: z.string(),
    offset: z.number(),
    previous: z.null(),
    total: z.number(),
  }),
});
