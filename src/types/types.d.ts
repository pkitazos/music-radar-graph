import "@total-typescript/ts-reset";

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export type colorHSL = { H: number; S: number; L: number };

export type colorRGB = { R: number; G: number; B: number };

export type colorLab = { L: number; a: number; b: number };
