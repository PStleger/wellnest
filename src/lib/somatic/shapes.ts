/**
 * Preset shapes, each drawn inside a 100×100 viewBox.
 * Descriptions are written for screen readers and for the summary line.
 */
export const shapes = [
  {
    id: "ball",
    label: "Ball",
    description: "a round ball",
    path: "M50 12c21 0 38 17 38 38S71 88 50 88 12 71 12 50 29 12 50 12Z",
  },
  {
    id: "stone",
    label: "Stone",
    description: "a heavy stone",
    path: "M20 58c-6-14 2-30 18-35 12-4 22-2 33 2 13 5 20 16 18 29-2 14-12 25-30 27-17 2-33-8-39-23Z",
  },
  {
    id: "knot",
    label: "Knot",
    description: "a tight knot",
    path: "M50 16c10 0 15 8 22 10 9 3 16 10 13 20-2 7 3 12 1 20-3 11-15 14-24 16-9 2-13 8-22 5-10-3-12-12-20-17-9-6-10-16-5-24 4-7 2-15 9-21 7-6 16-9 26-9Zm-2 22c-7 0-12 5-12 12s5 12 12 12 14-5 14-12-7-12-14-12Z",
  },
  {
    id: "shard",
    label: "Shard",
    description: "a sharp, spiky shard",
    path: "M50 8 60 34 90 26 70 50 92 72 62 68 52 94 40 70 12 80 28 54 8 34 38 36Z",
  },
  {
    id: "cloud",
    label: "Cloud",
    description: "a soft cloud",
    path: "M28 72c-10 0-18-7-18-17 0-9 7-16 16-17 1-12 11-21 23-21 10 0 18 6 21 15 11-1 20 8 20 19 0 12-9 21-21 21H28Z",
  },
  {
    id: "band",
    label: "Band",
    description: "a tight band",
    path: "M14 40c0-6 5-10 11-10h50c6 0 11 4 11 10v20c0 6-5 10-11 10H25c-6 0-11-4-11-10V40Z",
  },
  {
    id: "wave",
    label: "Wave",
    description: "a rolling wave",
    path: "M8 36c7-9 21-9 28 0c7 9 21 9 28 0c7-9 21-9 28 0v30c-7-9-21-9-28 0c-7 9-21 9-28 0c-7-9-21-9-28 0Z",
  },
  {
    id: "flutter",
    label: "Flutter",
    description: "a fluttering, restless form",
    path: "M50 50C40 30 20 18 14 28c-7 11 12 22 36 22-24 0-43 11-36 22 6 10 26-2 36-22 10 20 30 32 36 22 7-11-12-22-36-22 24 0 43-11 36-22-6-10-26 2-36 22Z",
  },
] as const;

export type Shape = (typeof shapes)[number];
export type PresetShapeId = Shape["id"];
export type ShapeId = PresetShapeId | "custom";

export const presetShapeIds = shapes.map((shape) => shape.id) as [PresetShapeId, ...PresetShapeId[]];

export function getShape(id: ShapeId) {
  return shapes.find((shape) => shape.id === id);
}
