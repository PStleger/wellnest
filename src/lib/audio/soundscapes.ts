import { audioContext } from "./context";
import type { SoundscapeId } from "./soundscape-list";

type Colour = "white" | "pink" | "brown";

/**
 * A few seconds of stereo noise, crossfaded at the seam so it loops without a click.
 * Everything is synthesised; there are no audio files.
 */
function noise(ctx: AudioContext, colour: Colour, seconds = 8) {
  const rate = ctx.sampleRate;
  const fade = Math.floor(rate * 0.25);
  const length = Math.floor(rate * seconds);
  const buffer = ctx.createBuffer(2, length, rate);

  for (let channel = 0; channel < 2; channel++) {
    const raw = new Float32Array(length + fade);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0,
      last = 0;
    for (let i = 0; i < raw.length; i++) {
      const white = Math.random() * 2 - 1;
      if (colour === "white") {
        raw[i] = white * 0.5;
      } else if (colour === "pink") {
        // Paul Kellet's refined pink noise filter.
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        raw[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else {
        last = (last + 0.02 * white) / 1.02;
        raw[i] = last * 3.5;
      }
    }
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) data[i] = raw[i]!;
    for (let i = 0; i < fade; i++) {
      const t = i / fade;
      data[i] = raw[i]! * t + raw[length + i]! * (1 - t);
    }
  }
  return buffer;
}

/** Sparse, quickly decaying clicks: individual drops on top of the rain. */
function droplets(ctx: AudioContext, seconds = 6) {
  const rate = ctx.sampleRate;
  const length = Math.floor(rate * seconds);
  const buffer = ctx.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      if (Math.random() < 0.0009) {
        const amplitude = (0.3 + Math.random() * 0.7) * (Math.random() < 0.5 ? -1 : 1);
        const decay = Math.floor(rate * (0.002 + Math.random() * 0.006));
        for (let j = 0; j < decay && i + j < length; j++) {
          data[i + j]! += amplitude * Math.exp((-6 * j) / decay) * (Math.random() * 2 - 1);
        }
      }
    }
  }
  return buffer;
}

function loop(ctx: AudioContext, buffer: AudioBuffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function filter(ctx: AudioContext, type: BiquadFilterType, frequency: number, q = 0.7) {
  const node = ctx.createBiquadFilter();
  node.type = type;
  node.frequency.value = frequency;
  node.Q.value = q;
  return node;
}

function gain(ctx: AudioContext, value: number) {
  const node = ctx.createGain();
  node.gain.value = value;
  return node;
}

/** A slow sine wobbling an AudioParam: waves, gusts. */
function lfo(ctx: AudioContext, frequency: number, depth: number, target: AudioParam) {
  const oscillator = ctx.createOscillator();
  oscillator.frequency.value = frequency;
  const amount = gain(ctx, depth);
  oscillator.connect(amount).connect(target);
  return oscillator;
}

export type Soundscape = { setVolume: (value: number) => void; stop: (fadeSeconds?: number) => void };

export function startSoundscape(id: SoundscapeId, volume = 0.6): Soundscape {
  const ctx = audioContext();
  const now = ctx.currentTime;
  const master = gain(ctx, 0);
  master.connect(ctx.destination);
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(volume, now + 3);

  const sources: AudioScheduledSourceNode[] = [];
  const start = (...nodes: AudioScheduledSourceNode[]) => {
    for (const node of nodes) {
      node.start(now);
      sources.push(node);
    }
  };

  if (id === "rain") {
    const bed = loop(ctx, noise(ctx, "pink"));
    bed
      .connect(filter(ctx, "highpass", 400))
      .connect(filter(ctx, "lowpass", 6500))
      .connect(gain(ctx, 0.55))
      .connect(master);
    const drops = loop(ctx, droplets(ctx));
    drops
      .connect(filter(ctx, "bandpass", 2600, 0.9))
      .connect(gain(ctx, 0.35))
      .connect(master);
    start(bed, drops);
  } else if (id === "ocean") {
    const swell = gain(ctx, 0.45);
    const body = filter(ctx, "lowpass", 550);
    const water = loop(ctx, noise(ctx, "brown"));
    water.connect(body).connect(swell).connect(master);
    const foam = gain(ctx, 0.04);
    const spray = loop(ctx, noise(ctx, "pink"));
    spray
      .connect(filter(ctx, "highpass", 1800))
      .connect(foam)
      .connect(master);
    // One wave every ~11 seconds: level, brightness and spray rise and fall together.
    start(
      water,
      spray,
      lfo(ctx, 0.09, 0.35, swell.gain),
      lfo(ctx, 0.09, 450, body.frequency),
      lfo(ctx, 0.09, 0.035, foam.gain),
    );
  } else if (id === "wind") {
    const band = filter(ctx, "bandpass", 420, 0.55);
    const level = gain(ctx, 0.5);
    const air = loop(ctx, noise(ctx, "pink"));
    air.connect(band).connect(level).connect(master);
    start(air, lfo(ctx, 0.05, 260, band.frequency), lfo(ctx, 0.031, 0.3, level.gain));
  } else {
    const hush = loop(ctx, noise(ctx, "brown"));
    hush
      .connect(filter(ctx, "lowpass", 900))
      .connect(gain(ctx, 0.7))
      .connect(master);
    start(hush);
  }

  return {
    setVolume(value) {
      master.gain.setTargetAtTime(value, ctx.currentTime, 0.2);
    },
    stop(fadeSeconds = 1.5) {
      const end = ctx.currentTime + fadeSeconds;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, end);
      for (const source of sources) source.stop(end + 0.05);
      setTimeout(() => master.disconnect(), (fadeSeconds + 0.2) * 1000);
    },
  };
}
