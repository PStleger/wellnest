"use client";

import { useEffect, useState } from "react";

import { BodyFigure } from "@/components/somatic/body-figure";
import { Orb } from "@/components/somatic/orb";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import type { BodyRegionId } from "@/lib/somatic/regions";
import type { ShapeId } from "@/lib/somatic/shapes";
import type { TextureId } from "@/lib/somatic/textures";
import { cn } from "@/lib/utils";

type Story = {
  region: BodyRegionId;
  where: string;
  /** Vertical centre of the region, as a percentage of the figure's height. */
  y: number;
  color: string;
  shape: ShapeId;
  texture: TextureId;
  what: string;
  how: string;
  from: number;
  to: number;
};

const stories: Story[] = [
  {
    region: "chest",
    where: "in the chest",
    y: 32,
    color: "#e11d48",
    shape: "knot",
    texture: "prickly",
    what: "a tight knot",
    how: "prickly, vivid red",
    from: 7,
    to: 3,
  },
  {
    region: "stomach",
    where: "in the stomach",
    y: 42,
    color: "#f59e0b",
    shape: "flutter",
    texture: "grainy",
    what: "a flutter",
    how: "grainy, amber",
    from: 6,
    to: 2,
  },
  {
    region: "throat",
    where: "in the throat",
    y: 19.5,
    color: "#1d4ed8",
    shape: "stone",
    texture: "heavy",
    what: "a heavy stone",
    how: "dense, deep blue",
    from: 8,
    to: 5,
  },
  {
    region: "shoulders",
    where: "across the shoulders",
    y: 24,
    color: "#c2410c",
    shape: "band",
    texture: "rough",
    what: "a tight band",
    how: "rough, ember",
    from: 6,
    to: 3,
  },
];

function Tag({
  className,
  delay,
  children,
}: {
  className?: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "absolute animate-rise rounded-full border border-line bg-surface/90 px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-ink shadow-soft backdrop-blur",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

/**
 * Decorative: a feeling moving through the body and softening each time it's noticed.
 * Only opacity animates (compositor-only), and it holds still for reduced motion.
 */
export function HeroArt() {
  const reducedMotion = useReducedMotion();
  const [{ index, previous }, setStory] = useState<{ index: number; previous: number | null }>({
    index: 0,
    previous: null,
  });
  const story = stories[index]!;

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setStory((current) => ({ index: (current.index + 1) % stories.length, previous: current.index }));
    }, 5200);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[4/5] w-full max-w-md select-none">
      <div className="absolute inset-[4%] animate-drift rounded-[58%_42%_52%_48%/46%_54%_46%_54%] bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--apricot)_70%,transparent),transparent_62%),radial-gradient(circle_at_70%_70%,var(--primary-soft),transparent_68%)] will-change-transform" />
      {/* Keeps the figure's 200:460 ratio so orbs can sit on each region. */}
      <div className="absolute top-[5%] left-1/2 aspect-[200/460] h-[90%] -translate-x-1/2">
        <BodyFigure
          className="size-full opacity-90"
          fills={{ [story.region]: `color-mix(in srgb, ${story.color} 22%, var(--surface-2))` }}
        />
        {stories.map((item, itemIndex) =>
          itemIndex === index || itemIndex === previous ? (
            <div
              key={item.region}
              className={cn(
                "absolute left-1/2 w-[44%] -translate-x-1/2 transition-opacity duration-1000 ease-soft",
                itemIndex === index ? "opacity-100" : "opacity-0",
              )}
              style={{ top: `${item.y - 9.5}%` }}
            >
              <Orb
                color={item.color}
                shape={item.shape}
                texture={item.texture}
                animated
                className="aspect-square w-full"
              />
            </div>
          ) : null,
        )}
      </div>
      <div key={index}>
        <Tag className="top-[14%] left-0" delay={200}>
          {story.where}
        </Tag>
        <Tag className="top-[30%] right-0" delay={450}>
          {story.what}
        </Tag>
        <Tag className="top-[46%] left-[2%]" delay={700}>
          {story.how}
        </Tag>
        <Tag className="right-[4%] bottom-[22%]" delay={1100}>
          intensity <span className="text-ink-muted line-through decoration-1">{story.from}</span>{" "}
          <span className="font-semibold text-sage">{story.to}</span>
        </Tag>
      </div>
    </div>
  );
}
