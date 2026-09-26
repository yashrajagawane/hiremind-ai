"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  FileText,
  Target,
  Brain,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  Wand2,
  DollarSign
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  user: any;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  user,
}: SidebarProps) {

  const menuItems = [

    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Resume Review",
      href: "/resume-review",
      icon: <FileText size={20} />,
    },

    {
      name: "AI Job Match",
      href: "/ai-job-match",
      icon: <Target size={20} />,
    },

    {
      name: "AI Interview",
      href: "/ai-interview",
      icon: <Brain size={20} />,
    },

    {
      name: "Career Analytics",
      href: "/career-analytics",
      icon: <BarChart3 size={20} />,
    },

    {
      name: "Resume History",
      href: "/resume-history",
      icon: <Clock size={20} />,
    },

    {
      name: "AI Suggestions",
      href: "/ai-suggestions",
      icon: <Wand2 size={20} />,
    },

    {
      name: "Salary Insights",
      href: "/salary-insights",
      icon: <DollarSign size={20} />,
    },

    {
      name: "Settings",
      href: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (

    <aside
      className={`
      fixed top-0 left-0 h-screen
      bg-black
      border-r border-white/5
      transition-all duration-300
      flex flex-col
      z-50
      ${collapsed ? "w-[90px]" : "w-[260px]"}
    `}
    >

      {/* TOP */}
      <div className="flex flex-col flex-1 min-h-0">

        {/* LOGO */}
        <div
          className="
          h-[72px] min-h-[72px] shrink-0
          flex items-center justify-between
          px-5
          border-b border-white/5
        "
        >

          {!collapsed && (

            <h1
              className="
              text-2xl font-bold
              bg-gradient-to-r
              from-white
              via-blue-400
              to-purple-500
              bg-clip-text text-transparent
            "
            >
              HireMind AI
            </h1>

          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
            w-9 h-9
            rounded-xl
            bg-[#0A0A0A]
            border border-white/10
            flex items-center justify-center
            text-[#6EA8FF]
            hover:bg-gradient-to-r
            hover:from-[#0A1120]
            hover:to-[#120A20]
            transition-all duration-300
          "
          >

            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}

          </button>

        </div>

        {/* MENU */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#333]">

          {menuItems.map((item, index) => (

            <Link
              key={index}
              href={item.href}
              className="
              w-full
              flex items-center gap-4
              px-4 py-3
              rounded-2xl
              bg-[#050505]
              hover:bg-gradient-to-r
              hover:from-[#0A1120]
              hover:to-[#120A20]
              border border-white/5
              hover:border-purple-500/20
              transition-all duration-300
              text-white
              group
            "
            >

              <span
                className="
                text-[#6EA8FF]
                group-hover:scale-110
                transition-all duration-300
              "
              >
                {item.icon}
              </span>

              {!collapsed && (

                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>

              )}

            </Link>

          ))}

        </div>

      </div>

      {/* USER */}
      <div className="px-3 py-2 border-t border-white/5 shrink-0">

        <div
          className="
          flex items-center gap-2
          bg-[#050505]
          rounded-xl
          px-3 py-2
          border border-white/5
        "
        >

          <div
            className="
            w-7 h-7
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            flex items-center justify-center
            text-white text-xs font-bold shrink-0
          "
          >
            {user?.full_name?.charAt(0)}
          </div>

          {!collapsed && (

            <div className="text-left">

              <p className="text-[10px] text-gray-500 leading-none">
                Logged in as
              </p>

              <p className="text-xs text-white font-medium leading-none mt-0.5">
                {user?.full_name}
              </p>

            </div>

          )}

        </div>

      </div>

    </aside>
  );
}