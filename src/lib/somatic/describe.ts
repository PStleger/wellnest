import { describeColor } from "./colors";
import { regionLabel } from "./regions";
import { getShape } from "./shapes";
import { getTexture } from "./textures";
import type { Sensation } from "./types";

/** "A tight knot, vivid red and prickly, in the chest (7/10)" */
export function describeSensation(sensation: Sensation, { withIntensity = true } = {}) {
  const shape =
    sensation.shape === "custom" ? "a shape you drew" : (getShape(sensation.shape)?.description ?? "a shape");
  const texture = getTexture(sensation.texture).description;
  const region = regionLabel(sensation.region).toLowerCase();
  const where = sensation.region === "whole-body" ? "across the whole body" : `in the ${region}`;
  const intensity = withIntensity ? ` (${sensation.intensity}/10)` : "";
  const sentence = `${shape}, ${describeColor(sensation.color)} and ${texture}, ${where}${intensity}`;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function describeShift(before: Sensation, after: Sensation | null) {
  if (!after) return "Not re-checked";
  const delta = after.intensity - before.intensity;
  if (delta < 0) return `Eased by ${Math.abs(delta)}`;
  if (delta > 0) return `Grew by ${delta}`;
  return "Held steady";
}
