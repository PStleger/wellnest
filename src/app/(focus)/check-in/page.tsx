import type { Metadata } from "next";

import { CheckInFlow } from "@/components/check-in/check-in-flow";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Check in",
  description: "A guided somatic check-in: breathe, scan, and give a feeling a colour, shape and texture.",
};

/**
 * Fully static, so it opens instantly. The proxy only lets visitors with a session
 * cookie through, and saving re-verifies the session on the server.
 */
export default function CheckInPage() {
  return (
    <PageTransition>
      <CheckInFlow />
    </PageTransition>
  );
}
