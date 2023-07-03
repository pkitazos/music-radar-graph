/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchAlbumsSchema, fetchTracksSchema } from "~/types";
import getAccessToken from "~/utils/getAccessToken";

const spotifyRouter = createTRPCRouter({
  getSearchRequest: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const token = await getAccessToken({ ctx });

      const params: RequestInit = {
        headers: { Authorization: `Bearer ${token!}` },
        method: "GET",
        body: JSON.stringify({ q: input, type: "album", limit: "50" }),
      };

      const result = await fetch("https://api.spotify.com/v1/search", params)
        .then((res) => res.json())
        .then((e) => fetchAlbumsSchema.parse(e));

      return result;
    }),

  getTrackList: publicProcedure
    .input(z.string())
    .output(z.array(z.string()))
    .query(async ({ ctx, input: id }) => {
      const token = await getAccessToken({ ctx });

      const params: RequestInit = {
        headers: { Authorization: `Bearer ${token!}` },
        method: "GET",
      };

      const result = await fetch(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        params
      )
        .then((res) => res.json())
        .then((e) => {
          console.log(e);
          return fetchTracksSchema.parse(e);
        });

      // return ["track1", "track2"];
      return result.items.map((track) => track.name);
    }),
});

export default spotifyRouter;
