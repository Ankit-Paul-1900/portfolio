"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CircleMenuItem {
  label: string;
  href?: string;
}

interface CircleMenuProps {
  items: CircleMenuItem[];
  trigger: ReactNode;
  triggerLabel: string;
  className?: string;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CircleMenu({ items, trigger, triggerLabel, className, triggerClassName, triggerStyle, isOpen: controlledOpen, onOpenChange }: CircleMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = (open: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(open);
    onOpenChange?.(open);
  };

  return (
    <div className={cn("absolute bottom-0 right-0 z-30", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label={`${triggerLabel} links`}
            initial={{ opacity: 0, y: 8, scale: 0.92, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-[calc(100%-0.25rem)] left-[calc(100%+0.5rem)] flex flex-col items-start gap-2 max-[639px]:bottom-[calc(100%+0.5rem)] max-[639px]:left-auto max-[639px]:right-0"
          >
            {items.map((item, index) =>
              item.href ? (
                <a
                  key={item.label}
                  role="menuitem"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="type-body flex items-center gap-2 whitespace-nowrap rounded-full border border-violet-300/20 bg-[#241c3a]/95 px-3 py-2 text-white/90 shadow-lg backdrop-blur-xl transition hover:bg-[#34264f] hover:text-white"
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  {item.label}<ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  disabled
                  aria-disabled="true"
                  className="type-body flex cursor-not-allowed items-center gap-2 whitespace-nowrap rounded-full border border-violet-300/15 bg-[#241c3a]/95 px-3 py-2 text-white/40 shadow-lg backdrop-blur-xl"
                >
                  {item.label}<ExternalLink aria-hidden="true" className="size-3.5 opacity-40" />
                </button>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={triggerLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(!isOpen)}
        className={cn("relative z-10 flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-[background-color,color,scale] duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400", triggerClassName)}
        style={triggerStyle}
      >
        {trigger}
      </button>
    </div>
  );
}

export default CircleMenu;
