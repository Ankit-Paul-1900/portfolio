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
    title: "ChatVerse — Real-Time Chat Application",
    description:
      "A real-time messaging platform featuring secure authentication, online user status, instant messaging, and image sharing with a responsive chat interface.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Messaging interface on a digital screen",
    badge: "Full Stack",
    tags: ["Next.js", "Node.js", "Socket.IO", "MongoDB", "Cloudinary"],
    accent: "#a78bfa",
    githubUrl: "https://github.com/Ankit-Paul-1900/real-time-chat-application",
    liveUrl: "",
  },
  {
    title: "AI-Powered Quiz Application",
    description:
      "An interactive quiz platform that leverages AI to generate engaging questions and learning experiences through intelligent content generation.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Study materials and a laptop on a desk",
    badge: "AI Integration",
    tags: ["Next.js", "Hugging Face API", "JavaScript", "AI"],
    accent: "#67e8f9",
    githubUrl: "https://github.com/Ankit-Paul-1900/AI-enabled-quiz-app",
    liveUrl: "",
  },
  {
    title: "CineArchive — Movie Discovery Platform",
    description:
      "A movie discovery application featuring dynamic movie listings, detailed movie information, and API-driven content with a clean and responsive user experience.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Cinema screen in a movie theater",
    badge: "Web Application",
    tags: ["React", "Node.js", "Express.js", "TMDB API"],
    accent: "#c084fc",
    githubUrl: "https://github.com/Ankit-Paul-1900/CineArchieve-movie-application",
    liveUrl: "",
  },
  {
    title: "Payment QR Code Generator",
    description:
      "A flexible QR code generation tool that creates scannable codes for payment details, merchant information, and custom URLs.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Digital payment transaction using a mobile device",
    badge: "Utility",
    tags: ["Next.js", "QR Generation", "JavaScript", "UI Design"],
    accent: "#818cf8",
    githubUrl: "https://github.com/Ankit-Paul-1900/qrcode_generation",
    liveUrl: "",
  },
  {
    title: "Emotion-Based Music Recommendation",
    description:
      "An experimental application that uses computer vision and emotion recognition to identify facial expressions and recommend music based on detected emotions.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Person listening to music with headphones",
    badge: "Machine Learning",
    tags: ["Python", "OpenCV", "Machine Learning", "Anaconda"],
    accent: "#67e8f9",
    githubUrl: "https://github.com/Ankit-Paul-1900/EmotionBasedMusicRecommendationSystem",
    liveUrl: "",
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
  const [openProjectMenu, setOpenProjectMenu] = useState<string | null>(null);

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
                  surface="#080812"
                  className="h-full"
                  menuOpen={openProjectMenu === project.title}
                  onMenuOpenChange={(open) =>
                    setOpenProjectMenu(open ? project.title : null)
                  }
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
