"use client";

import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import icon from "@/assets/icon.png";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: (item: { name: string; link: string }, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className, containerRef }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: containerRef,
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-4 z-50 w-full px-4", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => (
  <motion.div
    animate={{
      backdropFilter: "blur(16px)",
      boxShadow: visible
        ? "0 8px 32px rgba(0,0,0,.3), inset 0 0 0 1px rgba(255,255,255,.12)"
        : "0 4px 24px rgba(0,0,0,.18), inset 0 0 0 1px rgba(255,255,255,.07)",
      width: visible ? "82%" : "100%",
      y: visible ? 8 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      "relative z-[60] mx-auto hidden w-full max-w-5xl flex-row items-center justify-between self-start rounded-full border border-white/10 bg-[#090914]/55 px-4 py-2 backdrop-blur-xl lg:flex",
      className,
    )}
  >
    {children}
  </motion.div>
);

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "type-body absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-1 font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, index) => (
        <a
          key={`nav-link-${item.name}-${index}`}
          href={item.link}
          onMouseEnter={() => setHovered(index)}
          onClick={(event) => onItemClick?.(item, event)}
          className="relative rounded-full px-3 py-2 text-white/65 transition-colors hover:text-white"
        >
          {hovered === index && (
            <motion.span
              layoutId="portfolio-navbar-hover"
              className="absolute inset-0 rounded-full bg-white/[0.08]"
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => (
  <motion.div
    animate={{
      backdropFilter: "blur(16px)",
      boxShadow: visible ? "0 8px 32px rgba(0,0,0,.3)" : "0 4px 24px rgba(0,0,0,.18)",
      width: visible ? "94%" : "100%",
      y: visible ? 8 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      "relative z-50 mx-auto flex w-full max-w-5xl flex-col items-center justify-between rounded-full border border-white/10 bg-[#090914]/55 px-3 py-1.5 backdrop-blur-xl lg:hidden",
      className,
    )}
  >
    {children}
  </motion.div>
);

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full flex-row items-center justify-between", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className={cn(
          "type-body absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl border border-white/10 bg-[#10101e]/95 px-5 py-5 shadow-[0_16px_48px_rgba(0,0,0,.35)] backdrop-blur-2xl",
          className,
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) =>
  isOpen ? (
    <X className="size-4 cursor-pointer text-white" onClick={onClick} />
  ) : (
    <Menu className="size-4 cursor-pointer text-white" onClick={onClick} />
  );

export const NavbarLogo = () => (
  <a href="#home" aria-label="Home" className="relative z-20 mr-4 flex items-center px-2 py-1">
    <img src={icon} alt="" className="h-8 w-10 rounded-md object-contain sm:h-10 sm:w-12 lg:h-12" />
  </a>
);

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      "type-body relative z-20 inline-flex items-center justify-center rounded-full px-4 py-2 font-medium transition duration-200 hover:-translate-y-0.5",
      variant === "primary"
        ? "border border-white/15 bg-white/[0.045] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,.12)] backdrop-blur-xl hover:border-violet-300/30 hover:bg-violet-400/[0.1]"
        : "border border-white/15 bg-transparent text-white hover:bg-white/[0.08]",
      className,
    )}
  >
    {children}
  </a>
);
