let context: AudioContext | null = null;

/** One shared AudioContext, created on the first user gesture (browsers require it). */
export function audioContext() {
  context ??= new AudioContext({ latencyHint: "playback" });
  if (context.state === "suspended") void context.resume();
  return context;
}
