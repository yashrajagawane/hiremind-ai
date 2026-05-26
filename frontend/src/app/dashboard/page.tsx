"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import ResumeUpload from "@/components/ResumeUpload";

import {
  FileText,
  Target,
  Brain,
  Bot,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
    "
    >
      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
      />

      {/* MAIN CONTENT */}
      <div
        className={`
        transition-all duration-300
        ${collapsed ? "ml-[90px]" : "ml-[260px]"}
      `}
      >
        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="p-8">
          {/* UPLOAD */}
          <ResumeUpload />

          {/* STATS */}
          <div
            className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mt-8
          "
          >
            <StatCard
              title="Total Resumes"
              value="12"
              icon={<FileText size={26} />}
            />

            <StatCard
              title="ATS Score"
              value="86%"
              icon={<Target size={26} />}
            />

            <StatCard
              title="Skills Found"
              value="24"
              icon={<Brain size={26} />}
            />

            <StatCard
              title="AI Interviews"
              value="5"
              icon={<Bot size={26} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}