import { HeartHandshake } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="not-prose flex gap-4 rounded-3xl border border-sage/30 bg-sage-soft p-5 text-base leading-relaxed">
      <HeartHandshake className="mt-0.5 size-5 shrink-0 text-sage" aria-hidden="true" />
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <div className="mt-1 text-ink/90">{children}</div>
      </div>
    </aside>
  );
}

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href as Route} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  a: Anchor,
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
