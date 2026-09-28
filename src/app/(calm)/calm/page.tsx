import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { CalmNow } from "@/components/practice/calm-now";

export const metadata: Metadata = {
  title: "Calm now",
  description:
    "A quiet space for hard moments: slow breathing with a guide, kind words, grounding and soft rain. No account needed.",
  alternates: { canonical: "/calm" },
};

export default function CalmPage() {
  return (
    <PageTransition>
      <CalmNow />
    </PageTransition>
  );
}
