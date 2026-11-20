import icon from "@/assets/icon.png";

export function Footer() {
  return (
    <footer className="relative z-10 w-full bg-transparent px-4 py-5 text-white sm:px-8 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <img src={icon} alt="Ankit Paul" className="size-8 object-contain" />
        <p className="type-label text-center text-white/45">
          © {new Date().getFullYear()} Ankit Paul. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
