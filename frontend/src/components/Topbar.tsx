"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {

  const pathname = usePathname();

  const pageData: any = {

    "/dashboard": {

      title: "Resume Scanner",

      description:
        "Analyze resumes with AI-powered ATS evaluation",
    },

    "/resume-review": {

      title: "Resume Review",

      description:
        "Deep AI analysis of resume strengths and weaknesses",
    },

    "/ai-job-match": {

      title: "AI Job Match",

      description:
        "Compare resumes against job descriptions using AI",
    },

    "/ai-interview": {

      title: "AI Interview",

      description:
        "Generate personalized interview questions instantly",
    },

    "/career-analytics": {

      title: "Career Analytics",

      description:
        "Track hiring potential and career growth insights",
    },

    "/resume-history": {

      title: "Resume History",

      description:
        "View and manage all your past resume analyses",
    },

    "/ai-suggestions": {

      title: "AI Suggestions",

      description:
        "Get AI-powered rewrites for any section of your resume",
    },

    "/salary-insights": {

      title: "Salary Intelligence",

      description:
        "Explore market salary data, demand trends, and negotiation tips",
    },

    "/settings": {

      title: "Settings",

      description:
        "Manage account preferences and application settings",
    },
  };



  const currentPage =

    pageData[pathname] || {

      title: "HireMind AI",

      description:
        "AI Recruitment Platform",
    };



  return (

    <div
      className="
      h-[72px]
      flex items-center justify-between
      border-b border-white/5
      px-8
      bg-black
      sticky top-0 z-40
      backdrop-blur-xl
    "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Mobile hamburger */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="
            flex md:hidden
            w-9 h-9
            rounded-xl
            bg-surface-hover
            border border-white/10
            items-center justify-center
            text-accent
            transition-all duration-300
          "
          >
            <Menu size={18} />
          </button>
        )}

        <div>
          <h1
            className="
            text-2xl md:text-3xl
            font-bold
            bg-gradient-to-r
            from-white
            via-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
          "
          >
            {currentPage.title}
          </h1>

          <p
            className="
            text-xs md:text-sm
            text-gray-400
            mt-1
          "
          >
            {currentPage.description}
          </p>
        </div>

      </div>



      {/* RIGHT STATUS */}
      <div
        className="
        hidden md:flex
        items-center gap-3
      "
      >

        <div
          className="
          w-2.5 h-2.5
          rounded-full
          bg-green-400
          animate-pulse
        "
        />

        <p
          className="
          text-sm
          text-gray-400
        "
        >
          AI Engine Active
        </p>

      </div>

    </div>
  );
}
