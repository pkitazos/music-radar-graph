const HEXtoRGB: (hex: string) => colorRGB = (hex) => {
  const [R, G, B] = hex.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  if (!(R && G && B)) return { R: 0, G: 0, B: 0 };
  return { R, G, B };
};

const RGBtoHEX: (rgb: colorRGB) => string = (rgb) => {
  let r = Math.round(rgb.R).toString(16).padStart(2, "0");
  let g = Math.round(rgb.G).toString(16).padStart(2, "0");
  let b = Math.round(rgb.B).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

const RGBtoHSL: (p: colorRGB) => colorHSL = ({ R, G, B }) => {
  let r = R / 255;
  let g = G / 255;
  let b = B / 255;

  let c_min = Math.min(r, g, b);
  let c_max = Math.max(r, g, b);
  let c_delta = c_max - c_min;

  let h = 0,
    s = 0,
    l = 0;

  // Hue
  if (c_delta === 0) h = 0;
  else if (c_max === r) h = ((g - b) / c_delta) % 6;
  else if (c_max === g) h = (b - r) / c_delta + 2;
  else if (c_max === b) h = (r - g) / c_delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Lightness
  l = (c_max + c_min) / 2;

  // Saturation
  s = c_delta === 0 ? 0 : c_delta / (1 - Math.abs(2 * l - 1));

  return { H: h, S: s, L: l };
};

const HSLtoRGB: (p: colorHSL) => colorRGB = ({ H, S, L }) => {
  let C = (1 - Math.abs(2 * L - 1)) * S;
  let X = C * (1 - Math.abs(((H / 60) % 2) - 1));
  let m = L - C / 2;
  let r, g, b;

  if (H < 60) {
    [r, g, b] = [C, X, 0];
  } else if (H < 120) {
    [r, g, b] = [X, C, 0];
  } else if (H < 180) {
    [r, g, b] = [0, C, X];
  } else if (H < 240) {
    [r, g, b] = [0, X, C];
  } else if (H < 300) {
    [r, g, b] = [X, 0, C];
  } else {
    [r, g, b] = [C, 0, X];
  }

  let R = (r + m) * 255;
  let G = (g + m) * 255;
  let B = (b + m) * 255;

  return { R, G, B };
};

export { HEXtoRGB, RGBtoHEX, RGBtoHSL, HSLtoRGB };
