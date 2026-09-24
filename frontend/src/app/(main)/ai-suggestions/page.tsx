"use client";

import { useState } from "react";
import { runResumeRewrite } from "@/services/resumeService";
import { Wand2, Copy, Check, AlertCircle, Loader2, Lightbulb } from "lucide-react";

interface RewriteResult {
  original: string;
  suggestions: string[];
  explanation: string;
}

export default function AISuggestionsPage() {
  const [resumeText, setResumeText] = useState("");
  const [section, setSection] = useState("Experience");
  const [textToRewrite, setTextToRewrite] = useState("");
  const [result, setResult] = useState<RewriteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const sections = ["Experience", "Summary", "Skills", "Education", "Projects", "Certifications"];

  const handleRewrite = async () => {
    if (!resumeText.trim() || !textToRewrite.trim()) {
      setError("Please fill in both resume text and the text you want to rewrite.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await runResumeRewrite(resumeText, section, textToRewrite);
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to generate suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Suggestions Panel</h1>
        <p className="text-gray-400">Paste a bullet point or sentence and get 3 AI-powered rewrites.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT PANEL */}
        <div className="space-y-5">
          {/* RESUME TEXT */}
          <div className="border border-white/5 rounded-3xl bg-[#050505] p-5">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-3">
              Your Resume Text
            </label>
            <textarea
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500/40 transition-all min-h-[160px]"
              placeholder="Paste your full resume text here for context..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          {/* SECTION SELECT */}
          <div className="border border-white/5 rounded-3xl bg-[#050505] p-5">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-3">
              Resume Section
            </label>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setSection(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    section === s
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "bg-black/40 border-white/5 text-gray-400 hover:border-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* TEXT TO REWRITE */}
          <div className="border border-white/5 rounded-3xl bg-[#050505] p-5">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-3">
              Text to Rewrite
            </label>
            <textarea
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500/40 transition-all min-h-[100px]"
              placeholder={`Paste the ${section} bullet or sentence you want to improve...`}
              value={textToRewrite}
              onChange={(e) => setTextToRewrite(e.target.value)}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleRewrite}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              <>
                <Wand2 size={16} />
                Generate AI Rewrites
              </>
            )}
          </button>
        </div>

        {/* OUTPUT PANEL */}
        <div className="space-y-5">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-white/5 rounded-3xl bg-[#050505]">
              <Wand2 size={40} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-sm">Your AI-rewritten suggestions will appear here.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-white/5 rounded-3xl bg-[#050505]">
              <Loader2 size={36} className="text-blue-400 animate-spin mb-4" />
              <p className="text-gray-400 text-sm">Generating 3 tailored rewrites...</p>
            </div>
          )}

          {result && (
            <>
              {/* EXPLANATION */}
              <div className="border border-yellow-500/20 rounded-3xl bg-yellow-500/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={15} className="text-yellow-400" />
                  <p className="text-xs text-yellow-400 uppercase tracking-wider font-semibold">Why these changes help</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{result.explanation}</p>
              </div>

              {/* SUGGESTIONS */}
              {result.suggestions.map((suggestion, idx) => (
                <div key={idx} className="border border-white/5 rounded-3xl bg-[#050505] p-5 group hover:border-purple-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Suggestion {idx + 1}
                    </span>
                    <button
                      onClick={() => copyToClipboard(suggestion, idx)}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                    >
                      {copied === idx ? (
                        <><Check size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                      ) : (
                        <><Copy size={12} /><span>Copy</span></>
                      )}
                    </button>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
