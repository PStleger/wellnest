import type { SVGProps } from "react";

import type { BodyRegionId } from "@/lib/somatic/regions";
import { cn } from "@/lib/utils";

type Drawable = Exclude<BodyRegionId, "upper-back" | "lower-back" | "whole-body">;

/**
 * Soft "pebble" segments in a 200×460 viewBox, drawn like a mirror:
 * the person's left side is on the viewer's left.
 */
const segments: { id: Drawable; element: SVGProps<SVGElement> & { kind: string } }[] = [
  { id: "head", element: { kind: "ellipse", cx: 100, cy: 44, rx: 30, ry: 33 } },
  { id: "face", element: { kind: "ellipse", cx: 100, cy: 55, rx: 17, ry: 15 } },
  { id: "throat", element: { kind: "rect", x: 88, y: 80, width: 24, height: 18, rx: 9 } },
  { id: "shoulders", element: { kind: "rect", x: 50, y: 101, width: 100, height: 20, rx: 10 } },
  { id: "chest", element: { kind: "rect", x: 62, y: 124, width: 76, height: 46, rx: 20 } },
  { id: "stomach", element: { kind: "rect", x: 66, y: 173, width: 68, height: 40, rx: 18 } },
  { id: "hips", element: { kind: "rect", x: 62, y: 216, width: 76, height: 36, rx: 17 } },
  {
    id: "left-arm",
    element: { kind: "rect", x: 32, y: 108, width: 19, height: 124, rx: 9.5, transform: "rotate(7 41 170)" },
  },
  {
    id: "right-arm",
    element: {
      kind: "rect",
      x: 149,
      y: 108,
      width: 19,
      height: 124,
      rx: 9.5,
      transform: "rotate(-7 158 170)",
    },
  },
  { id: "left-hand", element: { kind: "ellipse", cx: 30, cy: 253, rx: 11.5, ry: 15 } },
  { id: "right-hand", element: { kind: "ellipse", cx: 170, cy: 253, rx: 11.5, ry: 15 } },
  { id: "left-leg", element: { kind: "rect", x: 66, y: 255, width: 31, height: 150, rx: 15.5 } },
  { id: "right-leg", element: { kind: "rect", x: 103, y: 255, width: 31, height: 150, rx: 15.5 } },
  { id: "left-foot", element: { kind: "ellipse", cx: 78, cy: 421, rx: 19, ry: 11 } },
  { id: "right-foot", element: { kind: "ellipse", cx: 122, cy: 421, rx: 19, ry: 11 } },
];

type BodyFigureProps = {
  /** Fill colour per region. Regions without an entry use the resting fill. */
  fills?: Partial<Record<BodyRegionId, string>>;
  /** 0–1 opacity per region for heat maps. */
  heat?: Partial<Record<BodyRegionId, number>>;
  highlight?: readonly BodyRegionId[];
  onRegionClick?: (id: BodyRegionId) => void;
  className?: string;
  label?: string;
};

export function BodyFigure({
  fills,
  heat,
  highlight = [],
  onRegionClick,
  className,
  label,
}: BodyFigureProps) {
  const everywhere = highlight.includes("whole-body");

  return (
    <svg
      viewBox="0 0 200 460"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("block", className)}
    >
      {segments.map(({ id, element: { kind, ...shape } }) => {
        const Tag = kind as "rect" | "ellipse";
        const highlighted = everywhere || highlight.includes(id);
        const fill = fills?.[id] ?? (heat ? "var(--primary)" : "var(--surface-2)");
        const opacity = heat ? 0.12 + (heat[id] ?? 0) * 0.88 : 1;
        return (
          <Tag
            key={id}
            {...(shape as object)}
            data-region={id}
            fill={fill}
            fillOpacity={opacity}
            stroke={highlighted ? "var(--primary)" : "var(--line-strong)"}
            strokeWidth={highlighted ? 3 : 1.25}
            onClick={onRegionClick ? () => onRegionClick(id) : undefined}
            className={cn(
              "transition-[fill,stroke,stroke-width] duration-300",
              onRegionClick && "cursor-pointer hover:stroke-primary",
              highlighted && "animate-pulse",
            )}
          />
        );
      })}
    </svg>
  );
}
