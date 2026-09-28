"use client";

import { useSyncExternalStore } from "react";

/**
 * Small per-device preferences kept in localStorage. Nothing here is sensitive,
 * and none of it needs to reach the server.
 */
export type Prefs = {
  theme: "system" | "light" | "dark";
  motion: "system" | "reduce" | "full";
  tone: boolean;
  haptics: boolean;
  voice: boolean;
};

const defaults: Prefs = { theme: "system", motion: "system", tone: false, haptics: true, voice: false };
const EVENT = "wellnest:prefs";

function read<K extends keyof Prefs>(key: K): Prefs[K] {
  try {
    const raw = localStorage.getItem(`pref:${key}`);
    if (raw === null) {
      // The theme key predates this store.
      const legacy = key === "theme" ? localStorage.getItem("theme") : null;
      return (legacy ?? defaults[key]) as Prefs[K];
    }
    return JSON.parse(raw) as Prefs[K];
  } catch {
    return defaults[key];
  }
}

export function setPref<K extends keyof Prefs>(key: K, value: Prefs[K]) {
  try {
    localStorage.setItem(`pref:${key}`, JSON.stringify(value));
    if (key === "theme") {
      if (value === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", String(value));
    }
  } catch {
    // Storage can be blocked; the choice still applies until the page closes.
  }
  const root = document.documentElement;
  if (key === "theme") {
    if (value === "system") delete root.dataset.theme;
    else root.dataset.theme = String(value);
  }
  if (key === "motion") {
    if (value === "system") delete root.dataset.motion;
    else root.dataset.motion = String(value);
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function usePref<K extends keyof Prefs>(key: K): Prefs[K] {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => defaults[key],
  );
}
