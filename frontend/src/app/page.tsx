import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen text-white">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
          HireMind AI
        </h1>

        <p className="text-[#C4B5FD] text-xl max-w-3xl leading-relaxed mb-10">
          AI-Powered Resume Screening & Interview Intelligence Platform
        </p>

        <Link href="/auth">
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-[0_0_15px_rgba(79,70,229,0.25)]">
            Get Started
          </button>
        </Link>

      </section>

    </main>
  );
}