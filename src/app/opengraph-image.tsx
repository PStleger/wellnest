import { ImageResponse } from "next/og";

import { OgCard } from "@/components/og/og-card";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <OgCard
      eyebrow="WellNest · a somatic journal"
      title="Feel it where it lives."
      footer="Breathe · Scan · Give it form · Watch it shift"
    />,
    size,
  );
}
