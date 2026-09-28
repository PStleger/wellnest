import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Orb } from "@/components/somatic/orb";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col px-4 py-6 sm:px-10">
        <header>
          <Link href="/" className="inline-flex rounded-full" aria-label="WellNest home">
            <Logo />
          </Link>
        </header>
        <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          {children}
        </main>
      </div>
      <div
        aria-hidden="true"
        className="relative hidden overflow-hidden bg-ink lg:grid lg:place-items-center"
      >
        <div className="absolute size-[36rem] animate-drift bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--primary)_45%,transparent),transparent_60%),radial-gradient(circle_at_70%_70%,color-mix(in_srgb,var(--apricot)_40%,transparent),transparent_60%)] will-change-transform" />
        <div className="relative grid grid-cols-3 gap-8">
          <Orb color="#f59e0b" shape="flutter" texture="grainy" className="size-28" />
          <Orb color="#1d4ed8" shape="stone" texture="heavy" className="size-28 translate-y-10" />
          <Orb color="#db2777" shape="ball" texture="soft" className="size-28" />
          <Orb color="#0f766e" shape="wave" texture="fluid" className="size-28 translate-y-10" />
          <Orb color="#e11d48" shape="knot" texture="prickly" animated className="size-28" />
          <Orb color="#84cc16" shape="cloud" texture="soft" className="size-28 translate-y-10" />
        </div>
      </div>
    </div>
  );
}
