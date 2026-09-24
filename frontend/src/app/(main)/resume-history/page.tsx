"use client";

import { useEffect, useState } from "react";
import { getResumeHistory } from "@/services/resumeService";
import { FileText, Clock, TrendingUp, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

interface HistoryEntry {
  id: number;
  filename: string;
  upload_date: string;
  ats_score: number;
  career_domain: string;
  resume_text: string;
}

export default function ResumeHistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getResumeHistory();
        setHistory(data.history || []);
      } catch (err: any) {
        setError(err?.response?.data?.detail || "Failed to load resume history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading your resume history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Resume History</h1>
        <p className="text-gray-400">All your past resume analyses — track your progress over time.</p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border border-white/5 rounded-3xl bg-[#050505]">
          <FileText size={48} className="text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg font-medium">No resumes uploaded yet</p>
          <p className="text-gray-600 text-sm mt-1">Upload your first resume to see your history here.</p>
        </div>
      )}

      {/* HISTORY LIST */}
      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="border border-white/5 rounded-3xl bg-[#050505] overflow-hidden hover:border-white/10 transition-all duration-300"
          >
            {/* SUMMARY ROW */}
            <div
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <FileText size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{entry.filename}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      {new Date(entry.upload_date).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      {entry.career_domain}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* ATS SCORE */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getScoreBg(entry.ats_score)}`}>
                  <TrendingUp size={14} className={getScoreColor(entry.ats_score)} />
                  <span className={`text-sm font-bold ${getScoreColor(entry.ats_score)}`}>
                    {entry.ats_score}% ATS
                  </span>
                </div>
                <span className="text-gray-600">
                  {expanded === entry.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </div>
            </div>

            {/* EXPANDED — RESUME TEXT PREVIEW */}
            {expanded === entry.id && (
              <div className="border-t border-white/5 p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Resume Text Preview</p>
                <div className="bg-black/40 rounded-2xl p-4 border border-white/5 max-h-64 overflow-y-auto">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {entry.resume_text.slice(0, 1500)}
                    {entry.resume_text.length > 1500 && (
                      <span className="text-gray-600">... (truncated)</span>
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
