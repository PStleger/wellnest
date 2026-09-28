/** Kept separate from the synthesis code so pages can list soundscapes without loading it. */
export const soundscapes = [
  { id: "rain", name: "Soft rain", description: "Steady rain against a window" },
  { id: "ocean", name: "Ocean", description: "Slow waves rolling in" },
  { id: "wind", name: "Wind", description: "A breeze moving through trees" },
  { id: "brown", name: "Brown noise", description: "A deep, even hush" },
] as const;

export type SoundscapeId = (typeof soundscapes)[number]["id"];

export function getSoundscape(id: SoundscapeId) {
  return soundscapes.find((soundscape) => soundscape.id === id)!;
}
