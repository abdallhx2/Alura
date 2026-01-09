"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const params = useParams();
  const locale = params.locale as string;
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between relative z-50">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="relative group block"
          >
            <span className="text-2xl md:text-3xl font-display tracking-ultra uppercase text-white relative z-10">
              ALOURA
            </span>
          </Link>

          {/* Language Switcher - Visible on all screens */}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
