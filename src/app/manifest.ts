import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: somatic check-in & journal`,
    short_name: site.name,
    description: site.description,
    start_url: "/nest",
    scope: "/",
    display: "standalone",
    background_color: "#f7f2ec",
    theme_color: "#f7f2ec",
    categories: ["health", "lifestyle", "productivity"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "New check-in", url: "/check-in" },
      { name: "Calm now", url: "/calm" },
      { name: "Breathe", url: "/breathe" },
      { name: "Journal", url: "/journal" },
    ],
  };
}
