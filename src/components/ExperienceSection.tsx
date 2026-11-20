import Timeline from "@/components/ui/timeline";
import type { RefObject } from "react";

interface ExperienceSectionProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export default function ExperienceSection({
  scrollContainerRef,
}: ExperienceSectionProps) {
  return <Timeline scrollerRef={scrollContainerRef} />;
}
