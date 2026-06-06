"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {

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
      <div>

        <h1
          className="
          text-3xl
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
          text-sm
          text-gray-400
          mt-1
        "
        >
          {currentPage.description}
        </p>

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
