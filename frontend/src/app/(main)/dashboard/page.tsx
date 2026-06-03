"use client";

import { useEffect, useState } from "react";

import StatCard from "@/components/StatCard";
import ResumeUpload from "@/components/ResumeUpload";

import {
  FileText,
  Target,
  Brain,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {

  const [atsData, setAtsData] =
    useState<any>(null);

  // =========================
  // LOAD SAVED DATA
  // =========================
  useEffect(() => {

    const storedData =
      localStorage.getItem(
        "atsData"
      );

    if (storedData) {

      setAtsData(
        JSON.parse(storedData)
      );

    }

  }, []);

  // ==================
  // SAVE DATA
  // ==================
  const handleSetAtsData = (
    data: any
  ) => {

    setAtsData(data);

    localStorage.setItem(
      "atsData",
      JSON.stringify(data)
    );

    // =========================
    // SAVE REVIEW DATA
    // =========================
    localStorage.setItem(
      "resumeReviewData",
      JSON.stringify({

        summary:
          data.summary || "",

        strengths:
          data.strengths || [],

        weaknesses:
          data.weaknesses || [],

        recommendations:
          data.recommendations || [],

        career_fit:
          data.career_fit || [],
      })
    );
  };

  return (

    <div>

      {/* UPLOAD */}

      <ResumeUpload
        setAtsData={handleSetAtsData}
      />

      {/* STATS */}

      <div
        className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mt-8
      "
      >

        <StatCard
          title="Total Resumes"
          value={atsData ? "1" : "0"}
          icon={<FileText size={26} />}
        />

        <StatCard
          title="ATS Score"
          value={
            atsData?.ats_score
              ? `${atsData.ats_score}%`
              : "--"
          }
          icon={<Target size={26} />}
        />

        <StatCard
          title="Skills Found"
          value={
            atsData?.skills_found?.length || 0
          }
          icon={<Brain size={26} />}
        />

        <StatCard
          title="Missing Skills"
          value={
            atsData?.missing_skills?.length || 0
          }
          icon={<AlertTriangle size={26} />}
        />

      </div>

      {/* ATS ANALYTICS */}

      {atsData && (

        <div
          className="
          grid grid-cols-1
          xl:grid-cols-3
          gap-6
          mt-8
        "
        >

          {/* ATS SCORE */}

          <div
            className="
            bg-[#050505]
            border border-white/5
            rounded-3xl
            p-8
            flex flex-col
            items-center
            justify-center
            relative
            overflow-hidden
          "
          >

            <div
              className="
              absolute
              w-[250px]
              h-[250px]
              bg-blue-500/10
              blur-3xl
              rounded-full
            "
            />

            <div
              className="
              relative
              w-48 h-48
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              p-[10px]
              flex items-center justify-center
            "
            >

              <div
                className="
                w-full h-full
                rounded-full
                bg-black
                flex flex-col
                items-center justify-center
              "
              >

                <p
                  className="
                  text-5xl
                  font-bold
                  bg-gradient-to-r
                  from-white
                  to-purple-400
                  bg-clip-text
                  text-transparent
                "
                >
                  {atsData.ats_score}%
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  ATS SCORE
                </p>

              </div>

            </div>

            <div
              className="
              mt-6
              flex items-center gap-2
              text-[#6EA8FF]
              text-sm
            "
            >

              <TrendingUp size={16} />

              Strong AI Resume Match

            </div>

          </div>

          {/* SKILLS FOUND */}

          <div
            className="
            xl:col-span-2
            bg-[#050505]
            border border-white/5
            rounded-3xl
            p-6
          "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-white
              mb-6
            "
            >
              Skills Found
            </h2>

            <div className="flex flex-wrap gap-3">

              {atsData.skills_found?.map(
                (
                  skill: string,
                  index: number
                ) => (

                  <span
                    key={index}
                    className="
                    px-4 py-2
                    rounded-xl
                    bg-blue-500/10
                    border border-blue-500/20
                    text-[#6EA8FF]
                    text-sm
                    hover:bg-blue-500/20
                    transition-all duration-300
                  "
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}