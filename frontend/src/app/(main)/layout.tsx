"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [collapsed, setCollapsed] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );

    }

  }, []);

  return (

    <div className="min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
      />

      {/* MAIN */}
      <div
        className={`
        transition-all duration-300
        ${collapsed ? "ml-[90px]" : "ml-[260px]"}
      `}
      >

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
}