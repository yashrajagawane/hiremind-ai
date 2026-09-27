"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  UploadCloud,
  FileText,
  Loader2,
} from "lucide-react";

interface ResumeUploadProps {
  setAtsData: (data: any) => void;
}

export default function ResumeUpload({
  setAtsData,
}: ResumeUploadProps) {

  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");


  // =========================
  // HANDLE FILE UPLOAD
  // =========================

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setUploadedFileName(file.name);

    try {

      setLoading(true);
      
      // Reset the file input so the same file can be selected again if needed
      e.target.value = '';

      const formData = new FormData();
      formData.append("file", file);

      // =========================
      // API CALL
      // =========================

      const response = await axios.post(
        "https://hiremind-ai-3j1y.onrender.com/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        }
      );

      // =========================
      // SET ATS DATA
      // =========================

      setAtsData(response.data);

      // =========================
      // SUCCESS TOAST
      // =========================
      toast.success(response.data.message || "Resume uploaded and analyzed!");

    } catch (error: any) {

      console.error(error);
      toast.error(error?.response?.data?.message || "Upload failed... Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      bg-surface
      border border-white/5
      rounded-3xl
      p-6
      shadow-[0_0_40px_rgba(59,130,246,0.04)]
    "
    >

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">

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
          hidden md:flex
          w-12 h-12
          rounded-2xl
          bg-gradient-to-r
          from-blue-500/10
          to-purple-500/10
          border border-blue-500/20
          items-center justify-center
        "
        >
          <UploadCloud
            size={24}
            className="text-accent"
          />
        </div>
      </div>

      {/* DROP AREA */}
      <div
        className="
        border-2 border-dashed border-purple-500/20
        rounded-3xl
        py-10 px-8
        text-center
        bg-black
        hover:border-purple-500/40
        transition-all duration-300
      "
      >

        {/* ICON */}
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

            {loading ? (
              <Loader2
                size={30}
                className="
                text-accent
                animate-spin
              "
              />
            ) : (
              <UploadCloud
                size={30}
                className="text-accent"
              />
            )}

          </div>
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-bold text-white mb-2">
          Upload Your Resume
        </h3>

        <p className="text-gray-500 text-sm mb-6">
          PDF and DOCX files supported
        </p>

        {/* CHOOSE FILE BUTTON */}
        <div className="flex justify-center">

          <label
            className={`
            px-5 py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            via-blue-500
            to-purple-600
            text-white
            font-semibold
            text-sm
            shadow-[0_0_20px_rgba(59,130,246,0.18)]
            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 cursor-pointer transition-all duration-300'}
          `}
          >

            {loading ? "Analyzing Document..." : "Choose Resume"}

            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              disabled={loading}
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* FILE NAME */}
        {uploadedFileName && (
          <div
            className="
            flex items-center justify-center gap-2
            mt-5
            text-accent-lavender
          "
          >
            <FileText size={16} />

            <span className="text-sm">
              {uploadedFileName}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}