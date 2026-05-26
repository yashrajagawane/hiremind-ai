"use client";

import Link from "next/link";

export default function Navbar() {

  return (

    <nav className="w-full border-b border-purple-500/10 bg-[#080808]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">

      {/* LOGO */}
      <div className="text-xl font-bold tracking-tight">

        <span className="bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
          HireMind
        </span>

        <span className="text-[#8B5CF6] ml-1">
          AI
        </span>

      </div>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-10 text-base text-[#C4B5FD] font-medium">

        <a
          href="#"
          className="hover:text-white transition-all duration-300"
        >
          Features
        </a>

        <a
          href="#"
          className="hover:text-white transition-all duration-300"
        >
          About
        </a>

        <a
          href="#"
          className="hover:text-white transition-all duration-300"
        >
          Contact
        </a>

      </div>

      {/* BUTTON */}
      <Link href="/auth">

        <button className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_12px_rgba(79,70,229,0.20)]">

          Get Started

        </button>

      </Link>

    </nav>
  );
}