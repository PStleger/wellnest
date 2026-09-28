import type { BodyRegionId } from "./regions";

export const bodyScanSteps: { title: string; text: string; regions: BodyRegionId[] }[] = [
  {
    title: "Settle",
    text: "Let your eyes soften or close. Take a few slow breaths and feel the weight of your body wherever it's supported.",
    regions: ["whole-body"],
  },
  {
    title: "Feet",
    text: "Bring your attention to your feet. Notice temperature, pressure, tingling, or nothing much at all. Nothing is information too.",
    regions: ["left-foot", "right-foot"],
  },
  {
    title: "Legs",
    text: "Move slowly up through your ankles, calves, knees and thighs. If you find tightness, acknowledge it without trying to change it.",
    regions: ["left-leg", "right-leg"],
  },
  {
    title: "Hips and belly",
    text: "Notice your pelvis and stomach. Is there holding here, or softness? Let your belly rise and fall on its own.",
    regions: ["hips", "stomach"],
  },
  {
    title: "Chest and back",
    text: "Feel your chest move with each breath. Let your attention widen to include your upper and lower back.",
    regions: ["chest"],
  },
  {
    title: "Arms and hands",
    text: "Travel down both arms to your fingertips. Notice warmth, weight, buzzing, or stillness.",
    regions: ["left-arm", "right-arm", "left-hand", "right-hand"],
  },
  {
    title: "Shoulders, throat and face",
    text: "Check in with your shoulders, throat and jaw, and the small muscles around your eyes. Soften anything that wants to soften.",
    regions: ["shoulders", "throat", "face"],
  },
  {
    title: "The whole of you",
    text: "Finally, sense your whole body at once, breathing. Is there a place that is quietly asking for your attention?",
    regions: ["head", "whole-body"],
  },
];
