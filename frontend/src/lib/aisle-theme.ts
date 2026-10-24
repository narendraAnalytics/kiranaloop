export type Theme = { from: string; to: string; dark: boolean; soft: string };

// One bold two-tone gradient per aisle. Dark themes carry white text, light ones teal.
// `soft` is the resting tint for the aisle's filter chip and its aisle-page cards.
const themes: Record<string, Theme> = {
  "dairy-eggs": { from: "#efe8ff", to: "#cdb8ff", dark: false, soft: "#efe8ff" },
  "fruits-veg": { from: "#d6f9e8", to: "#3ddc97", dark: false, soft: "#d6f9e8" },
  bakery: { from: "#ffe6c2", to: "#ff9f1c", dark: false, soft: "#ffe6c2" },
  "atta-rice-dal": { from: "#fff3c4", to: "#ffc93c", dark: false, soft: "#fff3c4" },
  "tea-coffee": { from: "#2fa56f", to: "#11724a", dark: true, soft: "#d3efe1" },
  "masala-oil": { from: "#ff6b9b", to: "#e11d63", dark: true, soft: "#ffd9e6" },
  snacks: { from: "#ffd2bd", to: "#ff7a45", dark: false, soft: "#ffe3d6" },
  cleaning: { from: "#dff3f4", to: "#7fd6d9", dark: false, soft: "#dff3f4" },
  "personal-care": { from: "#efe4f6", to: "#c9a6ea", dark: false, soft: "#efe4f6" },
  "baby-care": { from: "#fce4ee", to: "#ff9fc4", dark: false, soft: "#fce4ee" },
  pets: { from: "#fdeccd", to: "#ffc46b", dark: false, soft: "#fdeccd" },
};
export const fallbackTheme: Theme = { from: "#ffffff", to: "#e2f1ea", dark: false, soft: "#e2f1ea" };
export const allTheme: Theme = { from: "#1d5a5b", to: "#0b3b3c", dark: true, soft: "#dff2ea" };

export function aisleTheme(slug: string): Theme {
  return themes[slug] ?? fallbackTheme;
}
