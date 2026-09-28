import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { BreathePage } from "@/components/practice/breathe-page";
import { getPattern } from "@/lib/somatic/breathing";

export const metadata: Metadata = {
  title: "Breathe",
  description:
    "Five guided breathing rhythms with a calm visual pacer: longer exhale, box breathing, coherent breathing, the physiological sigh and 4-7-8. Free, no account needed.",
  alternates: { canonical: "/breathe" },
};

export default function Breathe() {
  return (
    <PageTransition>
      <BreathePage pattern={getPattern(null)} isDefault />
    </PageTransition>
  );
}
