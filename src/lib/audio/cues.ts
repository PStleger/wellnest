import type { PhaseKind } from "@/lib/somatic/breathing";

import { audioContext } from "./context";

type Partial = [frequency: number, gain: number];

const tones: Record<PhaseKind | "end", { partials: Partial[]; length: number }> = {
  // Soft sine "bells": a fundamental with a quiet octave, rising for in, lower for out.
  in: {
    partials: [
      [392, 1],
      [784, 0.18],
      [1176, 0.05],
    ],
    length: 1.8,
  },
  "hold-in": { partials: [[523.25, 0.45]], length: 0.9 },
  out: {
    partials: [
      [293.66, 1],
      [587.33, 0.16],
    ],
    length: 2.2,
  },
  "hold-out": { partials: [[261.63, 0.35]], length: 0.9 },
  end: {
    partials: [
      [392, 0.8],
      [493.88, 0.5],
      [587.33, 0.45],
      [783.99, 0.15],
    ],
    length: 4,
  },
};

export function playTone(kind: PhaseKind | "end", volume = 0.16) {
  if (!hasInteracted()) return;
  const ctx = audioContext();
  const now = ctx.currentTime;
  const { partials, length } = tones[kind];
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(volume, now + 0.03);
  master.gain.exponentialRampToValueAtTime(0.0001, now + length);
  master.connect(ctx.destination);

  for (const [frequency, gain] of partials) {
    for (const detune of [-4, 4]) {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = detune;
      const level = ctx.createGain();
      level.gain.value = gain / 2;
      oscillator.connect(level).connect(master);
      oscillator.start(now);
      oscillator.stop(now + length + 0.1);
    }
  }
}

const vibrations: Record<PhaseKind | "end", number | number[]> = {
  in: 60,
  "hold-in": 15,
  out: [30, 90, 30],
  "hold-out": 15,
  end: [80, 120, 80, 120, 160],
};

/** Browsers only allow vibration after the person has interacted with the page. */
function hasInteracted() {
  return navigator.userActivation?.hasBeenActive ?? true;
}

export function vibrate(kind: PhaseKind | "end") {
  if ("vibrate" in navigator && hasInteracted()) navigator.vibrate(vibrations[kind]);
}

let chosenVoice: SpeechSynthesisVoice | null | undefined;

/** Prefer a calm British English voice, then any English voice. */
function pickVoice() {
  if (chosenVoice !== undefined) return chosenVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferred = /serena|kate|martha|sonia|libby|stephanie|google uk english female/i;
  chosenVoice =
    voices.find((voice) => voice.lang === "en-GB" && preferred.test(voice.name)) ??
    voices.find((voice) => voice.lang === "en-GB") ??
    voices.find((voice) => voice.lang.startsWith("en")) ??
    null;
  return chosenVoice;
}

export function speak(text: string, { interrupt = true } = {}) {
  if (!("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  if (interrupt) synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82;
  utterance.pitch = 0.95;
  utterance.volume = 0.9;
  const voice = pickVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  synth.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
