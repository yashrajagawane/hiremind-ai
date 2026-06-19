"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
const [hovered, setHovered] = useState<string | null>(null);

return ( <nav className="w-full border-b border-purple-500/10 bg-[#080808]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between relative z-50">

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
  <div className="hidden md:flex items-center gap-10 text-base text-[#C4B5FD] font-medium relative">

    {/* FEATURES */}
    <div
      className="relative"
      onMouseEnter={() => setHovered("features")}
      onMouseLeave={() => setHovered(null)}
    >
      <button className="hover:text-white transition-all duration-300">
        Features
      </button>

      {hovered === "features" && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl border border-purple-500/20 bg-[#0f0f0f] shadow-2xl backdrop-blur-lg">
          <h3 className="text-purple-400 font-semibold mb-2">
            🚀 Key Features
          </h3>

          <ul className="text-sm text-gray-300 space-y-1">
            <li>• AI Resume Analysis</li>
            <li>• ATS Score Evaluation</li>
            <li>• AI Job Matching</li>
            <li>• Interview Preparation</li>
            <li>• Career Analytics</li>
          </ul>
        </div>
      )}
    </div>

    {/* ABOUT */}
    <div
      className="relative"
      onMouseEnter={() => setHovered("about")}
      onMouseLeave={() => setHovered(null)}
    >
      <button className="hover:text-white transition-all duration-300">
        About
      </button>

      {hovered === "about" && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 p-4 rounded-xl border border-purple-500/20 bg-[#0f0f0f] shadow-2xl backdrop-blur-lg">
          <h3 className="text-purple-400 font-semibold mb-2">
            🤖 About HireMind AI
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            AI-powered career intelligence platform built with
            Next.js, FastAPI, Gemini AI and Groq for resume
            screening, ATS analysis, career growth and interview
            preparation.
          </p>
        </div>
      )}
    </div>

    {/* CONTACT */}
    <div
      className="relative"
      onMouseEnter={() => setHovered("contact")}
      onMouseLeave={() => setHovered(null)}
    >
      <button className="hover:text-white transition-all duration-300">
        Contact
      </button>

      {hovered === "contact" && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 p-4 rounded-xl border border-purple-500/20 bg-[#0f0f0f] shadow-2xl backdrop-blur-lg">
          <h3 className="text-purple-400 font-semibold mb-2">
            📬 Contact
          </h3>

          <div className="text-sm text-gray-300 space-y-2">
            <p>📧 agawaneyash865@gmail.com</p>
            <p>📱 7058400490</p>
            <p>🐙 github.com/yashrajagawane</p>
          </div>
        </div>
      )}
    </div>

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
