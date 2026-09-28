/**
 * Textures are rendered procedurally with SVG filters (turbulence + lighting),
 * so they cost zero image bytes and adapt to whatever colour was chosen.
 */
export type TextureRecipe = {
  noise: "fractalNoise" | "turbulence";
  /** One value, or "x y" for directional textures like water. */
  frequency: string;
  octaves: number;
  surfaceScale: number;
  light: "diffuse" | "specular";
  elevation: number;
  /** Softens the texture after lighting. */
  blur?: number;
};

export const textures = [
  {
    id: "soft",
    label: "Soft",
    description: "soft and fuzzy",
    recipe: {
      noise: "fractalNoise",
      frequency: "0.9",
      octaves: 2,
      surfaceScale: 1.2,
      light: "diffuse",
      elevation: 70,
      blur: 0.6,
    },
  },
  {
    id: "smooth",
    label: "Smooth",
    description: "smooth and cool",
    recipe: {
      noise: "fractalNoise",
      frequency: "0.012",
      octaves: 1,
      surfaceScale: 6,
      light: "specular",
      elevation: 55,
    },
  },
  {
    id: "rough",
    label: "Rough",
    description: "rough, like concrete",
    recipe: {
      noise: "fractalNoise",
      frequency: "0.5",
      octaves: 4,
      surfaceScale: 3.5,
      light: "diffuse",
      elevation: 40,
    },
  },
  {
    id: "grainy",
    label: "Grainy",
    description: "grainy, like pebbles",
    recipe: {
      noise: "turbulence",
      frequency: "0.12",
      octaves: 2,
      surfaceScale: 4,
      light: "diffuse",
      elevation: 45,
    },
  },
  {
    id: "prickly",
    label: "Prickly",
    description: "sharp and prickly",
    recipe: {
      noise: "turbulence",
      frequency: "0.28",
      octaves: 1,
      surfaceScale: 9,
      light: "diffuse",
      elevation: 25,
    },
  },
  {
    id: "fluid",
    label: "Fluid",
    description: "fluid, like water",
    recipe: {
      noise: "fractalNoise",
      frequency: "0.008 0.07",
      octaves: 2,
      surfaceScale: 5,
      light: "specular",
      elevation: 50,
    },
  },
  {
    id: "tingly",
    label: "Tingly",
    description: "tingly and buzzing",
    recipe: {
      noise: "turbulence",
      frequency: "1.4",
      octaves: 1,
      surfaceScale: 2.5,
      light: "diffuse",
      elevation: 60,
    },
  },
  {
    id: "heavy",
    label: "Heavy",
    description: "dense and heavy",
    recipe: {
      noise: "fractalNoise",
      frequency: "0.035",
      octaves: 3,
      surfaceScale: 7,
      light: "diffuse",
      elevation: 30,
      blur: 0.8,
    },
  },
] as const satisfies readonly {
  id: string;
  label: string;
  description: string;
  recipe: TextureRecipe;
}[];

export type Texture = (typeof textures)[number];
export type TextureId = Texture["id"];

export const textureIds = textures.map((texture) => texture.id) as [TextureId, ...TextureId[]];

export function getTexture(id: TextureId) {
  return textures.find((texture) => texture.id === id) ?? textures[0];
}
