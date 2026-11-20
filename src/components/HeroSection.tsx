import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const TypewriterText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && subIndex === words[index].length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse text-violet-300">|</span>
    </span>
  );
};

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative flex h-screen w-full shrink-0 snap-start items-center justify-center overflow-hidden bg-transparent px-4 py-16 text-white sm:px-6 lg:px-8">
      
      {/* Dynamic Glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[min(80vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.09] blur-[120px]"
        animate={{
          x: `calc(-50% + ${mousePosition.x * 2}px)`,
          y: `calc(-50% + ${mousePosition.y * 2}px)`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-2 py-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="type-body mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-3.5 py-1.5 text-white/80"
        >
          <Sparkles className="size-4 text-violet-300" />
          <span>Hi, I'm Ankit Paul</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="type-display max-w-4xl font-bold tracking-tight text-white"
        >
          I build fast, scalable, and{" "}
          <span className="animate-gradient-x bg-gradient-to-r from-violet-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            user-focused
          </span>{" "}
          web applications.
        </motion.h1>

       <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
  className="type-subheading mt-5 font-semibold text-white/75"
>
  Building with{" "}
  <TypewriterText
    words={["Python", "React.js", "Next.js", "REST APIs", "Databases"]}
  />
</motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="type-body mt-4 max-w-2xl text-white/55"
        >
          Full Stack Software Developer turning ideas into reliable digital products with robust, scalable architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3"
        >
          <Button size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="type-body h-11 w-full gap-2 rounded-full border border-violet-300/25 bg-violet-400/[0.09] px-6 font-semibold text-violet-100 shadow-[0_8px_28px_rgba(167,139,250,.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-violet-200/45 hover:bg-violet-400/[0.16] sm:w-auto">
            View My Projects <ArrowUpRight className="size-4" />
          </Button>
          <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="type-body h-11 w-full gap-2 rounded-full bg-transparent px-6 font-semibold text-white/90 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/[0.045] sm:w-auto">
            Get In Touch <ArrowUpRight className="size-4 text-white/55" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
