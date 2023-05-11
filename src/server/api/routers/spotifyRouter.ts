import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchAlbumsSchema } from "~/types/fetchAlbumsSchema";
import getAccessToken from "~/utils/getAccessToken";

export const spotifyRouter = createTRPCRouter({
  getSearchRequest: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      let token = await getAccessToken({ ctx });

      let params: RequestInit = {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
        body: JSON.stringify({ q: input, type: "album", limit: "50" }),
      };

      let result = await fetch("https://api.spotify.com/v1/search", params)
        .then((res) => res.json())
        .then((e) => fetchAlbumsSchema.parse(e));
    }),
});
