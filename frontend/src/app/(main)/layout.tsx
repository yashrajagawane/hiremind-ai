"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PageTransition from "@/components/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, [router]);

  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={user}
      />

      {/* MAIN */}
      <div
        className={`
        transition-all duration-300
        /* Mobile: full width, no margin */
        ml-0
        /* Desktop: margin depends on collapse state */
        ${collapsed ? "md:ml-[90px]" : "md:ml-[260px]"}
      `}
      >

        {/* TOPBAR */}
        <Topbar onMenuClick={() => setMobileOpen(true)} />

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-8">
          <PageTransition>
            {children}
          </PageTransition>
        </div>

      </div>

    </div>
  );
}