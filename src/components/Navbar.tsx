import { useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar as ResizableNavbar,
  NavbarButton,
  NavbarLogo,
  NavItems,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Resume", link: "#resume" },
];

export function Navbar({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showResumeConfirm, setShowResumeConfirm] = useState(false);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavItemClick = (
    item: { name: string; link: string },
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (item.name !== "Resume") return;
    event.preventDefault();
    setShowResumeConfirm(true);
  };

  return (
    <ResizableNavbar containerRef={containerRef}>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} onItemClick={handleNavItemClick} />
        <NavbarButton href="#contact">Get in touch</NavbarButton>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMenu}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={(event) => {
                closeMenu();
                if (item.name === "Resume") handleNavItemClick(item, event);
              }}
              className="type-body w-full text-white/75 transition-colors hover:text-white"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton href="#contact" onClick={closeMenu} className="w-full">
            Get in touch
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>

      <AnimatePresence>
        {showResumeConfirm && (
          <motion.aside
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="alertdialog"
            aria-labelledby="resume-confirm-title"
            aria-describedby="resume-confirm-description"
            className="fixed right-4 top-24 z-[100] w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-white/12 bg-[#0b0b16]/90 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:right-6"
          >
            <h2 id="resume-confirm-title" className="type-subheading font-semibold">Download resume?</h2>
            <p id="resume-confirm-description" className="type-body mt-1 text-white/60">
              Save resume.pdf to your device?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResumeConfirm(false)}
                className="type-body rounded-full border border-white/12 bg-transparent px-4 py-2 text-white/70 transition hover:bg-white/[0.06] hover:text-white"
              >
                Cancel
              </button>
              <a
                href="/RESUME.pdf"
                download="resume.pdf"
                onClick={() => setShowResumeConfirm(false)}
                className="type-body rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 font-medium text-white transition hover:border-violet-300/30 hover:bg-violet-400/10"
              >
                Download PDF
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </ResizableNavbar>
  );
}

export default Navbar;
