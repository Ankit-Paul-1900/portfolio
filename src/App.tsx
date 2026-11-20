import { HeroSection } from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { AboutSection } from "./components/AboutSection";
import { StarfieldBackground } from "./components/StarfieldBackground";
import  ExperienceSection  from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";
import { Footer } from "./components/Footer";
import { useRef } from "react";

function App() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={scrollContainerRef} className="dark scrollbar-hidden h-screen w-full snap-y snap-proximity scroll-smooth overflow-x-hidden overflow-y-scroll bg-transparent font-sans text-white" style={{ scrollBehavior: 'smooth' }}>
      <StarfieldBackground />
      <Navbar containerRef={scrollContainerRef} />
      <HeroSection />
      <AboutSection />
      <ExperienceSection scrollContainerRef={scrollContainerRef} />
      <ProjectsSection scrollerRef={scrollContainerRef} />
      <LetsWorkTogether />
      <Footer />
      
    </div>
  );
}

export default App;
