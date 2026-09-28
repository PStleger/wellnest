export const bodyRegions = [
  { id: "head", label: "Head", area: "Head & neck" },
  { id: "face", label: "Face & jaw", area: "Head & neck" },
  { id: "throat", label: "Throat", area: "Head & neck" },
  { id: "shoulders", label: "Shoulders", area: "Upper body" },
  { id: "chest", label: "Chest", area: "Upper body" },
  { id: "upper-back", label: "Upper back", area: "Upper body" },
  { id: "stomach", label: "Stomach", area: "Core" },
  { id: "lower-back", label: "Lower back", area: "Core" },
  { id: "hips", label: "Hips & pelvis", area: "Core" },
  { id: "left-arm", label: "Left arm", area: "Arms & hands" },
  { id: "right-arm", label: "Right arm", area: "Arms & hands" },
  { id: "left-hand", label: "Left hand", area: "Arms & hands" },
  { id: "right-hand", label: "Right hand", area: "Arms & hands" },
  { id: "left-leg", label: "Left leg", area: "Legs & feet" },
  { id: "right-leg", label: "Right leg", area: "Legs & feet" },
  { id: "left-foot", label: "Left foot", area: "Legs & feet" },
  { id: "right-foot", label: "Right foot", area: "Legs & feet" },
  { id: "whole-body", label: "Whole body", area: "Everywhere" },
] as const;

export type BodyRegion = (typeof bodyRegions)[number];
export type BodyRegionId = BodyRegion["id"];

export const bodyRegionIds = bodyRegions.map((region) => region.id) as [BodyRegionId, ...BodyRegionId[]];

export const regionAreas = [...new Set(bodyRegions.map((region) => region.area))];

export function regionLabel(id: BodyRegionId) {
  return bodyRegions.find((region) => region.id === id)?.label ?? id;
}
