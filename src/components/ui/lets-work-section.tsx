"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ContactWithGlobe from "@/components/ui/contact-with-globe";

export function LetsWorkTogether() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleOpenContact = () => {
    setIsClicked(true);
    window.setTimeout(() => setShowContact(true), 450);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsHovered(false);
          setIsClicked(false);
          setShowContact(false);
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={`dark relative flex w-full snap-start items-center justify-center overflow-x-hidden px-4 py-6 text-white sm:px-8 sm:py-8 ${showContact ? "min-h-screen overflow-y-visible md:h-auto md:min-h-screen" : "min-h-screen"}`}>
      <div
        className={`relative flex w-full max-w-7xl justify-center py-3 ${showContact ? "h-full min-h-0 items-start pt-16 sm:pt-20 md:items-center" : "min-h-[calc(100dvh-3rem)] items-center sm:min-h-[calc(100dvh-4rem)]"}`}
        aria-live="polite"
      >
        <div
          className={`flex flex-col items-center gap-10 transition-all duration-500 ${
            isClicked ? "pointer-events-none absolute inset-0" : "relative"
          }`}
          style={{
            opacity: isClicked ? 0 : 1,
            transform: isClicked ? "translateY(-20px) scale(0.97)" : "translateY(0) scale(1)",
            pointerEvents: isClicked ? "none" : "auto",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="type-body font-medium uppercase tracking-widest text-slate-400">
              Available for projects
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenContact}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer"
          >
            <span className="flex flex-col items-center gap-6">
              <span className="type-display text-center font-light tracking-tight text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <span className="block overflow-hidden">
                  <span
                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: isHovered ? "translateY(-8%)" : "translateY(0)" }}
                  >
                    Let's work
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="block transition-transform delay-75 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: isHovered ? "translateY(-8%)" : "translateY(0)" }}
                  >
                    <span className="text-white/55">together</span>
                  </span>
                </span>
              </span>

              <span className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
                <span
                  className="pointer-events-none absolute inset-0 rounded-full border transition-all duration-500 ease-out"
                  style={{
                    borderColor: isHovered ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.2)",
                    backgroundColor: isHovered ? "white" : "transparent",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <ArrowUpRight
                  className="size-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                  style={{
                    transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)",
                    color: isHovered ? "#080812" : "white",
                  }}
                />
              </span>
            </span>

            <span className="absolute -left-8 top-1/2 h-px w-8 -translate-y-1/2 bg-white/30 transition-all duration-500 group-hover:scale-x-150 group-hover:opacity-100 sm:-left-16 sm:w-12" />
            <span className="absolute -right-8 top-1/2 h-px w-8 -translate-y-1/2 bg-white/30 transition-all duration-500 group-hover:scale-x-150 group-hover:opacity-100 sm:-right-16 sm:w-12" />
          </button>

          <div className="mt-2 flex flex-col items-center gap-4 text-center">
            <p className="type-body max-w-md text-slate-400">
              Have a project in mind? I'd love to hear about it. Let's create something exceptional together.
            </p>
            <span className="type-label uppercase tracking-widest text-slate-500">ankitpaul1900@gmail.com</span>
          </div>
        </div>

        <div
          className={`z-20 w-full px-0 pt-0 pb-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-2 sm:pb-4 ${
            showContact ? "relative" : "pointer-events-none absolute inset-0"
          }`}
          style={{
            opacity: showContact ? 1 : 0,
            transform: showContact ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
            pointerEvents: showContact ? "auto" : "none",
          }}
          aria-hidden={!showContact}
          inert={!showContact}
        >
          <ContactWithGlobe className="h-full min-h-0" />
        </div>
      </div>
    </section>
  );
}
