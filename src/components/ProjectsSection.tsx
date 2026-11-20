import {
  type RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Full Stack Web Applications",
    description:
      "Responsive, end-to-end products built around clear user experiences, reliable APIs, and maintainable architecture.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Analytics dashboard displayed on a laptop",
    badge: "Web Development",
    tags: ["React", "Node.js", "REST APIs"],
    accent: "#a78bfa",
  },
  {
    title: "Business Process Solutions",
    description:
      "Practical workflow and collaboration tools that help teams simplify everyday processes and work more efficiently.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Team collaborating around a table",
    badge: "Automation",
    tags: ["PowerApps", "Power Automate", "SharePoint"],
    accent: "#818cf8",
  },
  {
    title: "Modern UI Experiences",
    description:
      "Reusable interfaces with thoughtful motion, accessible interactions, and layouts that feel at home on every screen.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Colorful design work arranged on a desk",
    badge: "Frontend",
    tags: ["TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#c084fc",
  },
  {
    title: "Data Driven Dashboards",
    description:
      "Clear, responsive views for turning complex information into useful insights and helping people make informed decisions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Data visualizations on a computer display",
    badge: "Analytics",
    tags: ["React", "Charts", "API Integration"],
    accent: "#67e8f9",
  },
  {
    title: "Scalable API Platforms",
    description:
      "Backend foundations for modern applications, with structured services, dependable data flows, and room to grow.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Server infrastructure with blue lights",
    badge: "Backend",
    tags: ["Node.js", "Python", "Databases"],
    accent: "#818cf8",
  },
];

interface ProjectsSectionProps {
  scrollerRef: RefObject<HTMLDivElement | null>;
}

export function ProjectsSection({ scrollerRef }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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
    const scroller = scrollerRef.current;
    if (!section || !track || !scroller) return;

    const context = gsap.context(() => {
      gsap.to(track, {
        y: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    }, section);

    return () => context.revert();
  }, [scrollerRef, scrollDistance]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full text-white"
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div className="sticky top-20 flex h-[calc(100dvh-5rem)] flex-col overflow-hidden px-5 py-6 sm:px-8 md:px-12">
        <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[110px]" />

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-6 w-full max-w-5xl shrink-0 text-center md:mb-8"
        >
          <p className="type-label mb-2 uppercase tracking-[0.3em] text-violet-400">Selected Work</p>
          <h2 className="type-section-title font-bold tracking-tight">Projects</h2>
          <p className="type-body mx-auto mt-2 max-w-2xl text-slate-400">
            A collection of the products, solutions, and interfaces I enjoy building.
          </p>
        </motion.header>

        <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.15 }}
              >
                <NotchedProjectCard
                  {...project}
                  href="#projects"
                  surface="#080812"
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
