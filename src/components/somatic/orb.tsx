import { useId } from "react";

import { getShape, type ShapeId } from "@/lib/somatic/shapes";
import { getTexture, type TextureId, type TextureRecipe } from "@/lib/somatic/textures";
import { cn } from "@/lib/utils";

export function TextureFilter({ id, recipe }: { id: string; recipe: TextureRecipe }) {
  const specular = recipe.light === "specular";
  const light = <feDistantLight azimuth={235} elevation={recipe.elevation} />;

  return (
    <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence
        type={recipe.noise}
        baseFrequency={recipe.frequency}
        numOctaves={recipe.octaves}
        seed={7}
        result="noise"
      />
      {specular ? (
        <feSpecularLighting
          in="noise"
          surfaceScale={recipe.surfaceScale}
          specularConstant={1.1}
          specularExponent={20}
          lightingColor="#fff"
          result="light"
        >
          {light}
        </feSpecularLighting>
      ) : (
        <feDiffuseLighting
          in="noise"
          surfaceScale={recipe.surfaceScale}
          diffuseConstant={1}
          lightingColor="#fff"
          result="light"
        >
          {light}
        </feDiffuseLighting>
      )}
      {recipe.blur ? <feGaussianBlur in="light" stdDeviation={recipe.blur} result="light" /> : null}
      {specular ? (
        // Add glossy highlights on top of the colour.
        <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k2={0.75} k3={1} />
      ) : (
        // Multiply the lit surface into the colour, keeping some of the flat colour.
        <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1={0.95} k3={0.22} />
      )}
    </filter>
  );
}

export type OrbProps = {
  color: string;
  shape: ShapeId;
  customPath?: string;
  texture: TextureId;
  /** Accessible description. Omit for purely decorative orbs. */
  label?: string;
  animated?: boolean;
  className?: string;
};

/**
 * A "felt-sense portrait": the colour, shape and texture someone gave a sensation.
 */
export function Orb({ color, shape, customPath, texture, label, animated, className }: OrbProps) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const isCustom = shape === "custom";
  const path = isCustom ? customPath : getShape(shape)?.path;
  const recipe = getTexture(texture).recipe;

  if (!path) return null;

  const shapeProps = isCustom
    ? {
        fill: "white",
        stroke: "white",
        strokeWidth: 9,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
      }
    : { fill: "white", fillRule: "evenodd" as const };

  return (
    <svg
      viewBox="0 0 100 100"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("overflow-visible", animated && "animate-breathe", className)}
    >
      <defs>
        <mask id={`${uid}-mask`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
          <path d={path} {...shapeProps} />
        </mask>
        <TextureFilter id={`${uid}-texture`} recipe={recipe} />
        <radialGradient id={`${uid}-shade`} cx="34%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter={`url(#${uid}-glow)`} opacity="0.45">
        <rect width="100" height="100" fill={color} mask={`url(#${uid}-mask)`} />
      </g>
      <g mask={`url(#${uid}-mask)`}>
        <rect width="100" height="100" fill={color} filter={`url(#${uid}-texture)`} />
        <rect width="100" height="100" fill={`url(#${uid}-shade)`} />
      </g>
    </svg>
  );
}
