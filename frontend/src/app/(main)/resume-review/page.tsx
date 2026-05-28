"use client";

import { useEffect, useState } from "react";

import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

export default function ResumeReviewPage() {

  const [reviewData, setReviewData] =
    useState<any>(null);

  useEffect(() => {

    const storedData =
      localStorage.getItem(
        "resumeReviewData"
      );

    if (storedData) {

      setReviewData(
        JSON.parse(storedData)
      );

    }

  }, []);

  // =========================
  // EMPTY STATE
  // =========================

  if (!reviewData) {

    return (

      <div
        className="
        flex items-center justify-center
        min-h-[70vh]
      "
      >

        <div className="text-center">

          <h1
            className="
            text-4xl
            font-bold
            text-white
          "
          >
            No Resume Review Found
          </h1>

          <p
            className="
            text-gray-500
            mt-3
            text-lg
          "
          >
            Upload a resume from dashboard first.
          </p>

        </div>

      </div>

    );
  }

  return (

    <div className="space-y-6">

      {/* ========================= */}
      {/* HERO SUMMARY */}
      {/* ========================= */}

      <div
        className="
        relative overflow-hidden
        rounded-[28px]
        border border-white/5
        bg-[#050505]
        p-8
      "
      >

        {/* Glow */}

        <div
          className="
          absolute
          top-0 right-0
          w-[260px]
          h-[260px]
          bg-purple-600/10
          blur-3xl
          rounded-full
        "
        />

        <div
          className="
          flex items-start gap-5
          relative z-10
        "
        >

          <div
            className="
            w-16 h-16
            rounded-2xl
            bg-gradient-to-br
            from-blue-500/20
            to-purple-500/20
            border border-blue-500/20
            flex items-center justify-center
            shrink-0
          "
          >

            <Sparkles
              size={30}
              className="text-[#6EA8FF]"
            />

          </div>

          <div className="flex-1">

            <p
              className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-purple-400
              mb-3
            "
            >
              AI Resume Analysis
            </p>

            <h1
              className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-white
              via-blue-300
              to-purple-400
              bg-clip-text
              text-transparent
            "
            >
              Professional Resume Review
            </h1>

            <p
              className="
              text-gray-300
              leading-8
              mt-5
              max-w-4xl
            "
            >
              {reviewData.summary}
            </p>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* STRENGTHS + IMPROVEMENTS */}
      {/* ========================= */}

      <div
        className="
        grid grid-cols-1
        xl:grid-cols-2
        gap-6
      "
      >

        {/* STRENGTHS */}

        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-[28px]
          p-6
        "
        >

          <div className="flex items-center gap-4 mb-6">

            <div
              className="
              w-14 h-14
              rounded-2xl
              border border-green-500/20
              bg-green-500/10
              flex items-center justify-center
            "
            >

              <ShieldCheck
                size={26}
                className="text-green-400"
              />

            </div>

            <div>

              <h2
                className="
                text-2xl
                font-bold
                text-white
              "
              >
                Strengths
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Strong points identified by AI
              </p>

            </div>

          </div>

          <div className="space-y-3">

            {reviewData.strengths?.map(
              (
                item: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                  flex items-start gap-3
                  rounded-2xl
                  border border-white/5
                  bg-black
                  p-4
                "
                >

                  <CheckCircle2
                    size={20}
                    className="
                    text-green-400
                    mt-1
                    shrink-0
                  "
                  />

                  <p
                    className="
                    text-gray-300
                    leading-7
                    text-sm
                  "
                  >
                    {item}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

        {/* IMPROVEMENTS */}

        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-[28px]
          p-6
        "
        >

          <div className="flex items-center gap-4 mb-6">

            <div
              className="
              w-14 h-14
              rounded-2xl
              border border-red-500/20
              bg-red-500/10
              flex items-center justify-center
            "
            >

              <AlertTriangle
                size={26}
                className="text-red-400"
              />

            </div>

            <div>

              <h2
                className="
                text-2xl
                font-bold
                text-white
              "
              >
                Improvements
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Areas needing improvement
              </p>

            </div>

          </div>

          <div className="space-y-3">

            {reviewData.weaknesses?.map(
              (
                item: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                  flex items-start gap-3
                  rounded-2xl
                  border border-white/5
                  bg-black
                  p-4
                "
                >

                  <AlertTriangle
                    size={20}
                    className="
                    text-red-400
                    mt-1
                    shrink-0
                  "
                  />

                  <p
                    className="
                    text-gray-300
                    leading-7
                    text-sm
                  "
                  >
                    {item}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* RECOMMENDATIONS */}
      {/* ========================= */}

      <div
        className="
        bg-[#050505]
        border border-white/5
        rounded-[28px]
        p-6
      "
      >

        <div className="flex items-center gap-4 mb-6">

          <div
            className="
            w-14 h-14
            rounded-2xl
            border border-yellow-500/20
            bg-yellow-500/10
            flex items-center justify-center
          "
          >

            <Lightbulb
              size={26}
              className="text-yellow-300"
            />

          </div>

          <div>

            <h2
              className="
              text-2xl
              font-bold
              text-white
            "
            >
              AI Recommendations
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Smart suggestions to improve resume quality
            </p>

          </div>

        </div>

        <div className="space-y-3">

          {reviewData.recommendations?.map(
            (
              item: string,
              index: number
            ) => (

              <div
                key={index}
                className="
                rounded-2xl
                border border-white/5
                bg-black
                p-4
              "
              >

                <p
                  className="
                  text-gray-300
                  leading-7
                  text-sm
                "
                >
                  💡 {item}
                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* ========================= */}
      {/* CAREER FIT */}
      {/* ========================= */}

      <div
        className="
        bg-[#050505]
        border border-white/5
        rounded-[28px]
        p-6
      "
      >

        <div className="flex items-center gap-4 mb-6">

          <div
            className="
            w-14 h-14
            rounded-2xl
            border border-blue-500/20
            bg-gradient-to-br
            from-blue-500/10
            to-purple-500/10
            flex items-center justify-center
          "
          >

            <Briefcase
              size={26}
              className="text-[#6EA8FF]"
            />

          </div>

          <div>

            <h2
              className="
              text-2xl
              font-bold
              text-white
            "
            >
              Best Career Fit
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Suggested career opportunities
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          {reviewData.career_fit?.map(
            (
              role: string,
              index: number
            ) => (

              <div
                key={index}
                className="
                px-5 py-2.5
                rounded-xl
                bg-gradient-to-r
                from-blue-500/10
                to-purple-500/10
                border border-blue-500/20
                text-[#8BB8FF]
                text-sm
                font-medium
              "
              >
                {role}
              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}