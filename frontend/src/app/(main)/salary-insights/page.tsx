"use client";

import { useState } from "react";
import { runSalaryInsights } from "@/services/resumeService";
import { DollarSign, TrendingUp, Building2, Lightbulb, Zap, Loader2, AlertCircle, Search } from "lucide-react";

interface SalaryData {
  estimated_salary_range: { low: string; median: string; high: string };
  market_demand: string;
  top_hiring_industries: string[];
  negotiation_tips: string[];
  key_skills_for_premium_pay: string[];
}

export default function SalaryInsightsPage() {
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  const [location, setLocation] = useState("Global");
  const [result, setResult] = useState<SalaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const levels = ["Intern", "Junior", "Mid-Level", "Senior", "Lead", "Staff", "Principal"];
  const locations = ["Global", "India", "United States", "Europe", "Canada", "Australia", "Remote"];

  const handleSubmit = async () => {
    if (!targetRole.trim()) {
      setError("Please enter a target role.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await runSalaryInsights(targetRole, experienceLevel, location);
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to fetch salary insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Salary Intelligence</h1>
        <p className="text-gray-400">Get real market salary data, demand trends, and negotiation tips for any role.</p>
      </div>

      {/* FORM */}
      <div className="border border-white/5 rounded-3xl bg-[#050505] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* ROLE */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Target Role</label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40 transition-all"
            />
          </div>

          {/* EXPERIENCE LEVEL */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all appearance-none"
            >
              {levels.map((l) => <option key={l} value={l} className="bg-[#111]">{l}</option>)}
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Market / Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all appearance-none"
            >
              {locations.map((l) => <option key={l} value={l} className="bg-[#111]">{l}</option>)}
            </select>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-4">
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-semibold text-sm bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" />Fetching Salary Data...</>
          ) : (
            <><Search size={16} />Get Salary Insights</>
          )}
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 border border-white/5 rounded-3xl bg-[#050505]">
          <Loader2 size={36} className="text-emerald-400 animate-spin mb-4" />
          <p className="text-gray-400 text-sm">Analysing market data for <span className="text-white font-medium">{targetRole}</span>...</p>
        </div>
      )}

      {/* RESULTS */}
      {result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* SALARY RANGE */}
          <div className="md:col-span-2 border border-emerald-500/20 rounded-3xl bg-emerald-500/5 p-6">
            <div className="flex items-center gap-2 mb-5">
              <DollarSign size={18} className="text-emerald-400" />
              <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Estimated Salary Range</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Entry / Low", value: result.estimated_salary_range.low, color: "text-yellow-400" },
                { label: "Median", value: result.estimated_salary_range.median, color: "text-emerald-400" },
                { label: "High / Senior", value: result.estimated_salary_range.high, color: "text-blue-400" },
              ].map((s) => (
                <div key={s.label} className="bg-black/40 rounded-2xl p-4 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4 pt-4 border-t border-white/5">
              <span className="text-white font-medium">Market Demand: </span>
              {result.market_demand}
            </p>
          </div>

          {/* TOP HIRING INDUSTRIES */}
          <div className="border border-white/5 rounded-3xl bg-[#050505] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={16} className="text-blue-400" />
              <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Top Hiring Industries</h2>
            </div>
            <div className="space-y-2">
              {result.top_hiring_industries.map((industry, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs text-blue-400 font-bold shrink-0">{i + 1}</span>
                  <span className="text-gray-300 text-sm">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS FOR PREMIUM PAY */}
          <div className="border border-white/5 rounded-3xl bg-[#050505] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-yellow-400" />
              <h2 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">Skills for Premium Pay</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.key_skills_for_premium_pay.map((skill, i) => (
                <span key={i} className="text-xs text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-xl">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* NEGOTIATION TIPS */}
          <div className="md:col-span-2 border border-purple-500/20 rounded-3xl bg-purple-500/5 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} className="text-purple-400" />
              <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Negotiation Tips</h2>
            </div>
            <ul className="space-y-3">
              {result.negotiation_tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs text-purple-400 font-bold shrink-0">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
