"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  window.addEventListener("wellnest:prefs", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("wellnest:prefs", callback);
  };
}

/** The in-app motion setting wins; otherwise the operating system's preference applies. */
function snapshot() {
  const setting = document.documentElement.dataset.motion;
  if (setting === "reduce") return true;
  if (setting === "full") return false;
  return window.matchMedia(query).matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
