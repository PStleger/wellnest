"use client";

import { Eraser } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Choice } from "@/components/ui/choice";
import { hexToHsl, hslToHex, swatches } from "@/lib/somatic/colors";
import { bodyRegions, type BodyRegionId, regionAreas } from "@/lib/somatic/regions";
import { type ShapeId, shapes } from "@/lib/somatic/shapes";
import { type TextureId, textures } from "@/lib/somatic/textures";
import { cn } from "@/lib/utils";

import { BodyFigure } from "./body-figure";
import { Orb } from "./orb";

/* ------------------------------------------------------------------ */
/* Location                                                            */
/* ------------------------------------------------------------------ */

export function RegionPicker({
  value,
  color,
  onChange,
  name = "region",
}: {
  value: BodyRegionId | null;
  color?: string;
  onChange: (region: BodyRegionId) => void;
  name?: string;
}) {
  const fill = color ?? "var(--primary)";
  const fills =
    value === "whole-body"
      ? Object.fromEntries(bodyRegions.map((region) => [region.id, fill]))
      : value
        ? { [value]: fill }
        : {};

  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,15rem)_1fr]">
      <div className="text-center">
        <BodyFigure fills={fills} onRegionClick={onChange} className="mx-auto h-72 w-auto md:h-96" />
        <p className="mt-3 text-sm text-ink-muted">Like a mirror: your left is on the left.</p>
      </div>
      <fieldset className="space-y-5">
        <legend className="sr-only">Where in your body?</legend>
        {regionAreas.map((area) => (
          <div key={area}>
            <p className="mb-2 text-sm font-semibold text-ink-muted" aria-hidden="true">
              {area}
            </p>
            <div className="flex flex-wrap gap-2">
              {bodyRegions
                .filter((region) => region.area === area)
                .map((region) => (
                  <Choice
                    key={region.id}
                    name={name}
                    value={region.id}
                    checked={value === region.id}
                    onChange={() => onChange(region.id)}
                  >
                    {region.label}
                  </Choice>
                ))}
            </div>
          </div>
        ))}
      </fieldset>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Colour                                                              */
/* ------------------------------------------------------------------ */

export function ColorPicker({
  value,
  onChange,
  name = "color",
}: {
  value: string;
  onChange: (hex: string) => void;
  name?: string;
}) {
  const id = useId();
  const isSwatch = swatches.some((swatch) => swatch.hex === value);
  const [custom, setCustom] = useState(() => (isSwatch ? { h: 280, s: 70, l: 55 } : hexToHsl(value)));

  function updateCustom(patch: Partial<typeof custom>) {
    const next = { ...custom, ...patch };
    setCustom(next);
    onChange(hslToHex(next.h, next.s, next.l));
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-muted">Pick a colour</legend>
        <div className="grid max-w-lg grid-cols-6 gap-3 sm:gap-4">
          {swatches.map((swatch) => (
            <label
              key={swatch.hex}
              className="group relative aspect-square cursor-pointer rounded-full has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-(--focus)"
            >
              <input
                type="radio"
                name={name}
                value={swatch.hex}
                checked={value === swatch.hex}
                onChange={() => onChange(swatch.hex)}
                className="sr-only"
              />
              <span className="sr-only">{swatch.name}</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full shadow-soft ring-offset-2 ring-offset-canvas transition-transform group-hover:scale-105 group-has-checked:scale-110 group-has-checked:ring-3 group-has-checked:ring-ink"
                style={{ background: swatch.hex }}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-3xl border border-line bg-surface p-5">
        <legend className="px-2 text-sm font-semibold text-ink-muted">Or mix your own</legend>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => onChange(hslToHex(custom.h, custom.s, custom.l))}
            aria-pressed={!isSwatch}
            aria-label="Use my mixed colour"
            className="size-14 shrink-0 rounded-full shadow-soft ring-offset-2 ring-offset-surface aria-pressed:ring-3 aria-pressed:ring-ink"
            style={{ background: hslToHex(custom.h, custom.s, custom.l) }}
          />
          <div className="grid flex-1 gap-3">
            <label htmlFor={`${id}-hue`} className="text-sm font-medium">
              Hue
            </label>
            <input
              id={`${id}-hue`}
              type="range"
              min={0}
              max={359}
              value={custom.h}
              onChange={(event) => updateCustom({ h: Number(event.target.value) })}
              className="h-3 w-full cursor-pointer appearance-none rounded-full [background:linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)]"
            />
            <label htmlFor={`${id}-light`} className="text-sm font-medium">
              Lightness
            </label>
            <input
              id={`${id}-light`}
              type="range"
              min={10}
              max={90}
              value={custom.l}
              onChange={(event) => updateCustom({ l: Number(event.target.value) })}
              className="h-3 w-full cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, ${hslToHex(custom.h, custom.s, 10)}, ${hslToHex(custom.h, custom.s, 50)}, ${hslToHex(custom.h, custom.s, 90)})`,
              }}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shape                                                               */
/* ------------------------------------------------------------------ */

const MAX_PATH_LENGTH = 6000;

function toPath(strokes: [number, number][][]) {
  const round = (value: number) => Math.round(value * 10) / 10;
  return strokes
    .filter((stroke) => stroke.length > 1)
    .map((stroke) => {
      const [first, ...rest] = stroke;
      let d = `M${round(first![0])} ${round(first![1])}`;
      // Quadratic curves through midpoints give a smooth line from jittery input.
      rest.forEach((point, index) => {
        const nextPoint = rest[index + 1];
        if (!nextPoint) {
          d += `L${round(point[0])} ${round(point[1])}`;
          return;
        }
        const mid = [(point[0] + nextPoint[0]) / 2, (point[1] + nextPoint[1]) / 2];
        d += `Q${round(point[0])} ${round(point[1])} ${round(mid[0]!)} ${round(mid[1]!)}`;
      });
      return d;
    })
    .join("");
}

function DrawPad({ color, onChange }: { color: string; onChange: (path: string | undefined) => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [strokes, setStrokes] = useState<[number, number][][]>([]);
  const drawing = useRef(false);

  function point(event: React.PointerEvent): [number, number] {
    const rect = svgRef.current!.getBoundingClientRect();
    return [
      Math.max(2, Math.min(98, ((event.clientX - rect.left) / rect.width) * 100)),
      Math.max(2, Math.min(98, ((event.clientY - rect.top) / rect.height) * 100)),
    ];
  }

  function commit(next: [number, number][][]) {
    setStrokes(next);
    const path = toPath(next);
    onChange(path && path.length <= MAX_PATH_LENGTH ? path : undefined);
  }

  return (
    <div className="space-y-3">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Drawing area. Draw the shape with a mouse, finger or stylus."
        className="aspect-square w-full max-w-72 touch-none rounded-3xl border-2 border-dashed border-line-strong bg-surface"
        onPointerDown={(event) => {
          drawing.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          commit([...strokes, [point(event)]]);
        }}
        onPointerMove={(event) => {
          if (!drawing.current) return;
          const current = strokes.at(-1);
          const next = point(event);
          const previous = current?.at(-1);
          if (!current || (previous && Math.hypot(next[0] - previous[0], next[1] - previous[1]) < 1.5))
            return;
          commit([...strokes.slice(0, -1), [...current, next]]);
        }}
        onPointerUp={() => {
          drawing.current = false;
        }}
      >
        <path
          d={toPath(strokes)}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => commit([])} disabled={strokes.length === 0}>
          <Eraser className="size-4" aria-hidden="true" /> Clear
        </Button>
        <p className="text-sm text-ink-muted">Outlines and scribbles both work.</p>
      </div>
    </div>
  );
}

export function ShapePicker({
  value,
  color,
  texture,
  onChange,
  name = "shape",
}: {
  value: ShapeId | null;
  color: string;
  texture: TextureId | null;
  onChange: (shape: ShapeId, customPath?: string) => void;
  name?: string;
}) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="sr-only">Pick a shape</legend>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {shapes.map((shape) => (
            <Choice
              key={shape.id}
              variant="card"
              name={name}
              value={shape.id}
              checked={value === shape.id}
              onChange={() => onChange(shape.id)}
            >
              <Orb color={color} shape={shape.id} texture={texture ?? "smooth"} className="size-16" />
              {shape.label}
            </Choice>
          ))}
          <Choice
            variant="card"
            name={name}
            value="custom"
            checked={value === "custom"}
            onChange={() => onChange("custom")}
          >
            <span
              aria-hidden="true"
              className="grid size-16 place-items-center rounded-full border-2 border-dashed border-line-strong text-2xl text-ink-muted"
            >
              ✎
            </span>
            Draw your own
          </Choice>
        </div>
      </fieldset>
      {value === "custom" ? <DrawPad color={color} onChange={(path) => onChange("custom", path)} /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Texture                                                             */
/* ------------------------------------------------------------------ */

export function TexturePicker({
  value,
  color,
  onChange,
  name = "texture",
}: {
  value: TextureId | null;
  color: string;
  onChange: (texture: TextureId) => void;
  name?: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Pick a texture</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {textures.map((texture) => (
          <Choice
            key={texture.id}
            variant="card"
            name={name}
            value={texture.id}
            checked={value === texture.id}
            onChange={() => onChange(texture.id)}
          >
            <Orb color={color} shape="ball" texture={texture.id} className="size-20" />
            <span>
              {texture.label}
              <span className="block text-xs font-normal text-ink-muted">{texture.description}</span>
            </span>
          </Choice>
        ))}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/* Intensity                                                           */
/* ------------------------------------------------------------------ */

export function intensityWord(value: number) {
  if (value === 0) return "barely there";
  if (value <= 3) return "mild";
  if (value <= 6) return "moderate";
  if (value <= 8) return "strong";
  return "overwhelming";
}

export function IntensitySlider({
  value,
  onChange,
  label = "Intensity",
}: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-ink-muted">
          {label}
        </label>
        <p aria-hidden="true" className="text-right">
          <span className="font-display text-6xl text-primary tabular-nums">{value}</span>
          <span className="text-ink-muted"> / 10 · {intensityWord(value)}</span>
        </p>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        aria-valuetext={`${value} out of 10, ${intensityWord(value)}`}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-3 w-full cursor-pointer"
      />
      <div className="flex justify-between text-sm text-ink-muted" aria-hidden="true">
        <span>0 · barely there</span>
        <span>10 · overwhelming</span>
      </div>
    </div>
  );
}

export function PreviewOrb({
  color,
  shape,
  customPath,
  texture,
  intensity,
  className,
}: {
  color: string;
  shape: ShapeId | null;
  customPath?: string;
  texture: TextureId | null;
  intensity?: number;
  className?: string;
}) {
  const usable = shape && (shape !== "custom" || customPath);
  const scale = intensity === undefined ? 1 : 0.7 + intensity * 0.04;
  return (
    <div className={cn("grid place-items-center", className)}>
      <div className="transition-transform duration-500 ease-soft" style={{ transform: `scale(${scale})` }}>
        <Orb
          color={color}
          shape={usable ? shape : "ball"}
          customPath={customPath}
          texture={texture ?? "smooth"}
          animated
          className="size-40 sm:size-48"
        />
      </div>
    </div>
  );
}
