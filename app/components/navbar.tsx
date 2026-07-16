"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setExpanded(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Clear hash on mount or when navigation finishes
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      // Small timeout to allow browser to scroll to the target first
      const t = setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        border border-white/5
        bg-black/40 backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-out
        overflow-hidden

        ${expanded
          ? "w-[92%] max-w-6xl"
          : "w-[85%] max-w-3xl"}

        ${menuOpen ? "rounded-3xl h-[230px]" : "rounded-full h-16"}
      `}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo Haikal" 
            className="w-12 h-12 md:w-24 md:h-24 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <Link href="#hero" onClick={(e) => handleNavClick(e, "hero")} className="hover:text-red-400 transition-colors duration-200">Home</Link>
          <Link href="#about" onClick={(e) => handleNavClick(e, "about")} className="hover:text-red-400 transition-colors duration-200">About</Link>
          <Link href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="hover:text-red-400 transition-colors duration-200">Portofolio</Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex md:hidden flex-col gap-1.5 justify-center items-center w-8 h-8 focus:outline-none z-50 cursor-pointer"
          aria-label="Toggle Menu"
        >
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU LINKS */}
      <div
        className={`md:hidden flex flex-col items-center gap-1.5 pb-6 text-sm text-white/70 transition-all duration-300 border-t border-white/5 pt-3 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <Link 
          href="#hero" 
          onClick={(e) => { setMenuOpen(false); handleNavClick(e, "hero"); }} 
          className="hover:text-red-400 w-full text-center py-2 transition-colors hover:bg-white/5 rounded-xl font-medium"
        >
          Home
        </Link>
        <Link 
          href="#about" 
          onClick={(e) => { setMenuOpen(false); handleNavClick(e, "about"); }} 
          className="hover:text-red-400 w-full text-center py-2 transition-colors hover:bg-white/5 rounded-xl font-medium"
        >
          About
        </Link>
        <Link 
          href="#projects" 
          onClick={(e) => { setMenuOpen(false); handleNavClick(e, "projects"); }} 
          className="hover:text-red-400 w-full text-center py-2 transition-colors hover:bg-white/5 rounded-xl font-medium"
        >
          Portofolio
        </Link>
      </div>
    </nav>
  );
}
