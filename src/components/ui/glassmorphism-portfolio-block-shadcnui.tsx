import { motion, type Variants } from "framer-motion";
import { Activity, AppWindow, ArrowUpRight, Atom, Blocks, Braces, Code2, Database, Layers3, Server, Wind, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolchainMarquee, { type ToolchainItem } from "@/components/ui/toolchain-marquee";
import profileImage from "@/assets/profileimage.jpg";

type SocialLink = { label: string; handle: string; href: string; icon: "github" | "linkedin" | "mail" };

const techStacks: ToolchainItem[][] = [
  [
    { label: "React", icon: <Atom />, accent: "#62c7de" },
    { label: "TypeScript", icon: <Braces />, accent: "#5685d8" },
    { label: "Next.js", icon: <AppWindow />, accent: "#b8b8b8" },
    { label: "Tailwind CSS", icon: <Wind />, accent: "#59c8e6" },
    { label: "JavaScript", icon: <Code2 />, accent: "#d3a562" },
  ],
  [
    { label: "Node.js", icon: <Server />, accent: "#9fd55d" },
    { label: "FastAPI", icon: <Zap />, accent: "#65d7c7" },
    { label: "MongoDB", icon: <Database />, accent: "#6f9cf5" },
   { label: "SQL", icon: <Database />, accent: "#a995ff" },
   {  label: "PowerApps",  icon: <Blocks />,  accent: "#742774",}
  ],
];

const socialLinks: SocialLink[] = [
  { label: "GitHub", handle: "View my code", href: "https://github.com/Ankit-Paul-1900", icon: "github" },
  { label: "LinkedIn", handle: "Connect with me", href: "https://www.linkedin.com/in/ankit-paul-3a9344294", icon: "linkedin" },
  { label: "Email", handle: "Let's get in touch", href: "mailto:ankitpaul1900@gmail.com", icon: "mail" },
];

const listVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function SocialIcon({ name }: { name: SocialLink["icon"] }) {
  if (name === "github") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.6 1.2 14 3.8a13 13 0 0 0-7 0C3.4 1.2 2.2 1.6 2.2 1.6a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 .7 8.8c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 6 18.1V22" /></svg>;
  }
  if (name === "linkedin") {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /></svg>;
  }
  return      <svg  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /> </svg>
}

export function GlassmorphismPortfolioBlock() {
  return (
    <section id="about" className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-x-clip px-4 pt-24 pb-8 text-white sm:px-6 sm:pt-28 sm:pb-10 lg:px-8 lg:py-28 2xl:py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[18%] size-72 rounded-full bg-violet-500/10 blur-[110px]" />
        <div className="absolute bottom-[8%] right-[10%] size-80 rounded-full bg-cyan-400/[0.07] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-3 space-y-1 text-center sm:mb-4 2xl:mb-3"
        >
          <p className="type-label uppercase tracking-[0.3em] text-violet-400">Get to know me</p>
          <h2 className="type-section-title font-bold tracking-tight text-white">About</h2>
          <p className="type-body mx-auto max-w-xl text-white/55">
            A little about who I am and the work I love to build.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b16]/45 p-3 shadow-[0_24px_90px_rgba(0,0,0,.22)] backdrop-blur-2xl sm:p-5 lg:p-6 2xl:p-5"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-violet-400/[0.035]" />
          <div className="relative grid grid-cols-1 items-center gap-5 sm:gap-7 lg:grid-cols-2 lg:gap-8 2xl:gap-6">
            <div className="order-2 space-y-6 lg:order-1 sm:space-y-7 2xl:space-y-4">
              <span className="inline-flex items-center rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-3.5 py-1.5 type-label font-medium uppercase tracking-[0.2em] text-violet-200/80 backdrop-blur">
                About me
              </span>

              <div className="space-y-4 2xl:space-y-3">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="type-section-title font-semibold leading-[1.08] tracking-tight text-white"
                >
                  <span className="block text-white/65">Hi there,</span>
                  <span className="mt-1 block bg-gradient-to-r from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">I'm Ankit Paul</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.14 }}
                  className="type-body max-w-[38rem] leading-relaxed text-white/65 2xl:leading-snug"
                >
                  I’m a Full Stack Software Developer with 2+ years of hands-on experience turning ideas and business requirements into functional web applications. I enjoy building responsive user interfaces, integrating APIs, and developing reliable backend solutions using React.js, Next.js, Node.js, and Python. As a quick learner, I adapt to new technologies and challenges while valuing collaboration, clear communication, and understanding client needs to create meaningful digital experiences.
                </motion.p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 2xl:space-y-2 2xl:pt-3">
                <h3 className="type-subheading font-semibold tracking-tight text-white">Tech Stack</h3>
                <ToolchainMarquee stacks={techStacks} rows={2} duration={28} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  size="lg"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="type-body h-10 gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-white/[0.14]"
                >
                  Get in touch <ArrowUpRight className="size-4" />
                </Button>
              </motion.div>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-b from-violet-400/15 via-transparent to-cyan-300/[0.08] blur-3xl" />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.035] p-4 backdrop-blur-2xl sm:p-5 lg:p-6 2xl:p-5">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-3"
                  >
                    <div className="absolute inset-[-1rem] rounded-full bg-violet-400/20 blur-2xl" />
                    <img src={profileImage} alt="Ankit Paul" className="relative size-24 rounded-full border border-white/20 object-cover shadow-[0_20px_55px_rgba(0,0,0,.45)] sm:size-28 lg:size-32 2xl:size-28" />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="type-subheading font-semibold tracking-tight text-white">Ankit Paul</h3>
                    <p className="type-label font-semibold uppercase tracking-[0.25em] text-white/45">Full Stack Software Developer</p>
                  </div>
                  <p className="type-body mt-3 max-w-sm text-white/60">
                    Developing Responsive Web Applications & Reliable Backend Solutions.
                  </p>
                </div>

                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="mt-4 flex flex-col gap-2 2xl:mt-3 2xl:gap-1.5"
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      variants={itemVariants}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-1.5 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-lg sm:px-3.5"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/75 transition-colors group-hover:text-white">
                          <span className="size-3.5"><SocialIcon name={social.icon} /></span>
                        </span>
                        <span className="min-w-0 text-left">
                          <span className="type-body block font-semibold text-white/85">{social.label}</span>
                          <span className="type-label block truncate text-white/45">{social.handle}</span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-white/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/75" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
