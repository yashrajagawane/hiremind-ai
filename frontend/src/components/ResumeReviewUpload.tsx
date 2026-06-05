"use client";

import { useState } from "react";

import axios from "axios";

import {
  UploadCloud,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";

interface ResumeReviewUploadProps {

  setReviewData: (
    data: any
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;
}

export default function ResumeReviewUpload({

  setReviewData,
  setLoading,

}: ResumeReviewUploadProps) {

  const [uploadedFileName, setUploadedFileName] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");


  // =========================
  // HANDLE FILE UPLOAD
  // =========================
  const handleFileUpload = async (

    e: React.ChangeEvent<HTMLInputElement>

  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setUploadedFileName(
      file.name
    );

    try {

      setLoading(true);

      setSuccessMessage("");

      // =========================
      // UPLOAD RESUME
      // =========================
      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      await axios.post(

        "https://hiremind-ai-3j1y.onrender.com/resume/upload",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      // =========================
      // GET AI REVIEW
      // =========================
      const response = await axios.post(

        "http://127.0.0.1:8000/resume/resume-review"
      );

      // =========================
      // STORE RESPONSE
      // =========================
      setReviewData(
        response.data
      );

      setSuccessMessage(
        "AI Resume Review Generated 🚀"
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  return (

    <div
      className="
      bg-[#050505]
      border border-white/5
      rounded-3xl
      p-6
      shadow-[0_0_40px_rgba(59,130,246,0.04)]
    "
    >

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-white">
            AI Resume Review
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Upload resume for recruiter-level AI analysis
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

          <Sparkles
            size={28}
            className="text-[#6EA8FF]"
          />

        </div>

      </div>


      {/* DROP AREA */}

      <div
        className="
        border-2 border-dashed
        border-purple-500/20
        rounded-3xl
        bg-black
        py-16 px-8
        text-center
        hover:border-purple-500/40
        transition-all duration-300
      "
      >

        {/* ICON */}

        <div className="flex justify-center mb-5">

          <div
            className="
            w-20 h-20
            rounded-full
            bg-gradient-to-r
            from-blue-500/10
            to-purple-500/10
            border border-blue-500/20
            flex items-center justify-center
          "
          >

            <UploadCloud
              size={36}
              className="text-[#6EA8FF]"
            />

          </div>

        </div>


        {/* TITLE */}

        <h3 className="text-3xl font-bold text-white">

          Upload Resume For AI Review

        </h3>

        <p className="text-gray-500 mt-3 mb-7">

          Get professional recruiter insights instantly

        </p>


        {/* BUTTON */}

        <label
          className="
          inline-flex items-center gap-2
          px-6 py-3
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          via-blue-500
          to-purple-600
          text-white
          font-semibold
          cursor-pointer
          hover:scale-105
          transition-all duration-300
          shadow-[0_0_25px_rgba(59,130,246,0.25)]
        "
        >

          <UploadCloud size={18} />

          Upload Resume

          <input
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileUpload}
          />

        </label>


        {/* FILE NAME */}

        {uploadedFileName && (

          <div
            className="
            mt-6
            flex items-center justify-center gap-2
            text-[#C4B5FD]
          "
          >

            <FileText size={17} />

            <span className="text-sm">

              {uploadedFileName}

            </span>

          </div>

        )}


        {/* SUCCESS */}

        {successMessage && (

          <div
            className="
            mt-5
            text-green-400
            text-sm
            font-medium
          "
          >

            {successMessage}

          </div>

        )}

      </div>

    </div>
  );
}