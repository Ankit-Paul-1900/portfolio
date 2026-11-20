"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotchedProjectCardProps {
  href: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  badge?: string;
  tags?: string[];
  screen?: { src: string; alt: string; className?: string };
  dim?: number;
  monochrome?: boolean;
  surface?: string;
  accent?: string;
  accentForeground?: string;
  className?: string;
}

const DISC = 64;
const BLOCK = 80;
const FILLET = 28;

export function NotchedProjectCard({
  href,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  tags = [],
  screen,
  dim = screen ? 0.45 : 0,
  monochrome = false,
  surface = "var(--color-background)",
  accent,
  accentForeground = "#0a0a0a",
  className,
}: NotchedProjectCardProps) {
  const tone = monochrome
    ? "grayscale transition-[filter,scale] duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
    : "transition-[scale] duration-500";

  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080812]",
        className,
      )}
    >
      <div className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-[#10101e]">
          <img
            src={image}
            alt={screen ? "" : imageAlt}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              tone,
              !screen && "group-hover:scale-[1.04]",
            )}
          />
          {dim > 0 && (
            <div aria-hidden className="absolute inset-0" style={{ backgroundColor: `rgb(0 0 0 / ${dim})` }} />
          )}
          {screen && (
            <img
              src={screen.src}
              alt={screen.alt}
              className={cn(
                "absolute bottom-0 right-0 w-[82%] origin-bottom-right drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)] group-hover:scale-[1.07]",
                tone,
                screen.className,
              )}
            />
          )}
          {badge && (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4">
              <span className="type-label rounded-full border border-white/20 bg-[#080812]/60 px-3 py-1 font-medium text-white/90 backdrop-blur-md">
                {badge}
              </span>
            </div>
          )}
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 right-0"
          style={{ width: BLOCK, height: BLOCK, borderTopLeftRadius: BLOCK - DISC / 2, background: surface }}
        />
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 right-0 flex items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-[background-color,color,scale] duration-300 group-hover:scale-105",
            accent
              ? "group-hover:bg-[var(--card-accent)] group-hover:text-[var(--card-accent-fg)]"
              : "group-hover:bg-violet-400 group-hover:text-[#080812]",
          )}
          style={
            {
              width: DISC,
              height: DISC,
              "--card-accent": accent,
              "--card-accent-fg": accentForeground,
            } as React.CSSProperties
          }
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <h3 className="type-subheading mt-4 font-semibold tracking-tight text-white">{title}</h3>
      {description && <p className="type-body mt-2 text-slate-400">{description}</p>}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <li
              key={`${tag}-${i}`}
              className="type-label rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-semibold uppercase tracking-wider text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </a>
  );
}

export default NotchedProjectCard;
