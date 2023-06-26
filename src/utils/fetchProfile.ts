import type { UserProfile } from "~/types/types";

const fetchProfile = async (token: string): Promise<UserProfile> => {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return (await result.json()) as UserProfile;
};

export default fetchProfile;
