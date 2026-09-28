/** Swatches chosen to span warm/cool and light/dark without feeling clinical. */
export const swatches = [
  { hex: "#c2410c", name: "ember" },
  { hex: "#e11d48", name: "red" },
  { hex: "#f59e0b", name: "amber" },
  { hex: "#facc15", name: "yellow" },
  { hex: "#84cc16", name: "lime" },
  { hex: "#0f766e", name: "teal" },
  { hex: "#38bdf8", name: "sky blue" },
  { hex: "#1d4ed8", name: "deep blue" },
  { hex: "#7c3aed", name: "violet" },
  { hex: "#db2777", name: "pink" },
  { hex: "#78716c", name: "stone grey" },
  { hex: "#1c1917", name: "near black" },
] as const;

const HEX = /^#[0-9a-f]{6}$/i;

export function isHexColor(value: string) {
  return HEX.test(value);
}

export function hslToHex(h: number, s: number, l: number) {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const channel = (n: number) => {
    const value = light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

export function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Plain-language colour names for screen readers and summaries,
 * e.g. "#e11d48" → "vivid red".
 */
export function describeColor(hex: string) {
  const swatch = swatches.find((candidate) => candidate.hex === hex.toLowerCase());
  if (swatch) return swatch.name;

  const { h, s, l } = hexToHsl(hex);
  if (l < 12) return "near black";
  if (l > 92) return "near white";
  if (s < 12) return l < 45 ? "dark grey" : "grey";

  const hues: [number, string][] = [
    [15, "red"],
    [40, "orange"],
    [65, "yellow"],
    [90, "lime"],
    [160, "green"],
    [190, "teal"],
    [245, "blue"],
    [265, "indigo"],
    [290, "violet"],
    [330, "pink"],
    [360, "red"],
  ];
  const hue = hues.find(([limit]) => h < limit)?.[1] ?? "red";
  const tone = l < 35 ? "deep " : l > 70 ? "pale " : s > 75 ? "vivid " : "";
  return `${tone}${hue}`;
}
