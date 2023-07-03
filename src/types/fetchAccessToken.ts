import { z } from "zod";

export const fetchAccessToken = z.object({
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
});
