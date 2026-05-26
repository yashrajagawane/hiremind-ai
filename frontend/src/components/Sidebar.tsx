"use client";

import {
  LayoutDashboard,
  FileText,
  Target,
  Brain,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
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
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Resume Analyzer",
      icon: <FileText size={20} />,
    },
    {
      name: "ATS Score",
      icon: <Target size={20} />,
    },
    {
      name: "AI Interview",
      icon: <Brain size={20} />,
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Settings",
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
      flex flex-col justify-between
      z-50
      ${collapsed ? "w-[90px]" : "w-[260px]"}
    `}
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div
          className="
          h-[72px]
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
        <div className="p-4 space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
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
            </button>
          ))}
        </div>
      </div>

      {/* USER */}
      <div className="p-4 border-t border-white/5">
        <div
          className="
          flex items-center gap-3
          bg-[#050505]
          rounded-2xl
          p-3
          border border-white/5
        "
        >
          <div
            className="
            w-10 h-10
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            flex items-center justify-center
            text-white font-bold
          "
          >
            {user?.full_name?.charAt(0)}
          </div>

          {!collapsed && (
            <div className="text-left">
              <p className="text-xs text-gray-500">
                Logged in as
              </p>

              <p className="text-sm text-white font-medium">
                {user?.full_name}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}