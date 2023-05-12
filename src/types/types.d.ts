import "@total-typescript/ts-reset";
interface UserProfile {
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

interface Image {
  url: string;
  height: number;
  width: number;
}

type colorHSL = { H: number; S: number; L: number };

type colorRGB = { R: number; G: number; B: number };

type colorLab = { L: number; a: number; b: number };
