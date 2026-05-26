"use client";

import { UploadCloud } from "lucide-react";

export default function ResumeUpload() {
  return (
    <div
      className="
      bg-[#050505]
      border border-white/5
      rounded-3xl
      p-8
    "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Upload Resume
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Upload resumes for AI-powered ATS analysis
          </p>
        </div>

        <div
          className="
          w-14 h-14
          rounded-2xl
          bg-gradient-to-r
          from-blue-500/10
          to-purple-500/10
          border border-blue-500/20
          flex items-center justify-center
        "
        >
          <UploadCloud
            size={28}
            className="text-[#6EA8FF]"
          />
        </div>
      </div>

      {/* DROP AREA */}
      <div
        className="
        border-2 border-dashed border-white/10
        rounded-2xl
        p-12
        text-center
        bg-black
        hover:border-purple-500/30
        transition-all duration-300
        cursor-pointer
      "
      >
        <div className="flex justify-center mb-4">
          <div
            className="
            w-16 h-16
            rounded-full
            bg-gradient-to-r
            from-blue-500/10
            to-purple-500/10
            border border-blue-500/20
            flex items-center justify-center
          "
          >
            <UploadCloud
              size={30}
              className="text-[#6EA8FF]"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-500 text-sm mb-5">
          Upload PDF or DOCX files
        </p>

        <button
          className="
          px-6 py-3
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          via-blue-500
          to-purple-600
          text-white
          font-semibold
          hover:scale-105
          transition-all duration-300
        "
        >
          Choose File
        </button>
      </div>
    </div>
  );
}