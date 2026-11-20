"use client";

import {
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experiences from "@/static/experiences";

gsap.registerPlugin(ScrollTrigger);

export interface TimelineProps {
  scrollerRef: RefObject<HTMLDivElement | null>;
}

export default function Timeline({ scrollerRef }: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [scrollDistance, setScrollDistance] = useState(1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const measure = () => {
      const distance = Math.max(1, track.scrollHeight - viewport.clientHeight);
      setScrollDistance((current) =>
        Math.abs(current - distance) < 1 ? current : distance,
      );
    };

    measure();
    const observer = new ResizeObserver(() => {
      measure();
      ScrollTrigger.refresh();
    });
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const scroller = scrollerRef.current;

    if (!section || !track || !progress || !scroller) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(track, { y: -scrollDistance, duration: 1 }, 0);
      timeline.fromTo(progress, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);

      experiences.forEach((item, index) => {
        const node = nodeRefs.current[index];
        const connector = connectorRefs.current[index];
        const point = index / (experiences.length - 1);

        if (node) {
          timeline.fromTo(
            node,
            {
              backgroundColor: "rgba(11, 11, 24, 0.96)",
              color: "#94a3b8",
              borderColor: "rgba(255,255,255,0.2)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            },
            {
              backgroundColor: item.accent,
              color: "#080812",
              borderColor: item.accent,
              boxShadow: `0 0 24px ${item.accent}88`,
              duration: 0.08,
              ease: "power1.out",
            },
            Math.min(0.92, Math.max(0, point - 0.06)),
          );
        }

        if (connector) {
          timeline.fromTo(
            connector,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.12, ease: "none" },
            Math.max(0, point - 0.06),
          );
        }

      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      context.revert();
    };
  }, [scrollerRef, scrollDistance]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full text-white"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div className="sticky top-20 flex h-[calc(100dvh-5rem)] flex-col overflow-hidden px-5 py-4 sm:px-8 sm:py-8 md:px-12">
        <header className="mb-4 w-full shrink-0 text-center sm:mb-2">
          <p className="type-label mb-1 uppercase tracking-[0.3em] text-violet-400">
            My Journey
          </p>
          <h2 className="type-section-title font-bold tracking-tight">
            Experience
          </h2>
          <p className="type-body mx-auto mt-2 max-w-xl text-slate-400">
            Scroll to explore my work and development milestones.
          </p>
        </header>

          <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="relative w-full"
          >
            <div className="absolute bottom-[22.5vh] left-[24px] top-[20.5vh] z-0 w-[2px] bg-white/15 md:left-1/2" />
            <div
              ref={progressRef}
              className="absolute bottom-[22.5vh] left-[24px] top-[10.5vh] z-[1] w-[2px] origin-top bg-gradient-to-b from-violet-400 via-blue-400 to-cyan-400 shadow-[0_0_14px_rgba(139,92,246,0.75)] md:left-1/2"
              style={{ transformOrigin: "center top" }}
            />

            {experiences.map((item, index) => {
              const Icon = item.Icon;

              return (
                <article
                  key={item.id}
                  className="relative flex h-[40vh] items-center py-6"
                >
                  <div
                    ref={(node) => {
                      nodeRefs.current[index] = node;
                    }}
                    className="absolute left-[24px] top-1/2 z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b0b18] text-slate-400 shadow-lg transition-colors md:left-1/2 max-[600px]:size-12"
                    style={{ borderColor: `${item.accent}66` }}
                    aria-label={`${item.title} milestone`}
                  >
                    <Icon className="size-6 max-[600px]:size-5" strokeWidth={1.7} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={`relative ml-[88px] w-[min(calc(100%_-_88px),40rem)] p-4 text-left md:w-[min(40rem,calc(50%_-_3rem))] md:p-5 ${
                      index % 2 === 0
                        ? "md:ml-auto md:mr-[calc(50%_+_3rem)]"
                        : "md:ml-[calc(50%_+_3rem)] md:mr-auto"
                    } ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    <span
                      className={`absolute top-1/2 z-10 -left-10 h-[2px] w-10 bg-white/15 ${
                        index % 2 === 0
                          ? "md:right-[-3rem] md:left-auto md:w-12"
                          : "md:left-[-3rem] md:right-auto md:w-12"
                      }`}
                      aria-hidden="true"
                    >
                      <span
                        ref={(node) => {
                          connectorRefs.current[index] = node;
                        }}
                        className={`absolute inset-0 origin-left bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 shadow-[0_0_14px_rgba(139,92,246,0.75)] ${
                          index % 2 === 0 ? "md:origin-right" : "md:origin-left"
                        }`}
                      />
                      <span
                        className={`absolute top-1/2 right-0 size-3 -translate-y-1/2 rounded-full border border-cyan-200 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)] ${
                          index % 2 === 0
                            ? "md:right-auto md:left-0"
                            : ""
                        }`}
                      />
                    </span>
                    <p className="type-label mb-1 font-semibold uppercase tracking-[0.18em] text-violet-300">
                      {item.date}
                    </p>
                    <h3 className="type-subheading font-semibold leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="type-body mt-1 text-slate-400">
                      {item.company} <span aria-hidden="true">/</span> {item.location}
                    </p>
                    <p className="type-body mt-1 text-slate-300">
                      {item.description}
                    </p>
                    <ul className={`mt-3 flex flex-wrap gap-x-3 gap-y-1.5 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="type-label font-medium uppercase tracking-wider text-slate-400"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

