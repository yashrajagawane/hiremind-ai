"use client";

import { useState } from "react";

import StatCard from "@/components/StatCard";
import ResumeUpload from "@/components/ResumeUpload";

import {
  FileText,
  Target,
  Brain,
  AlertTriangle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {

  const [atsData, setAtsData] =
    useState<any>(null);

  return (

    <div>
      
      {/* UPLOAD */}
      <ResumeUpload
        setAtsData={setAtsData}
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
          value="1"
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

            {/* Glow */}
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



      {/* MISSING SKILLS */}
      {atsData && (

        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-3xl
          p-6
          mt-6
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
            Missing Skills
          </h2>



          <div className="flex flex-wrap gap-3">

            {atsData.missing_skills?.map(
              (
                skill: string,
                index: number
              ) => (

                <span
                  key={index}
                  className="
                  px-4 py-2
                  rounded-xl
                  bg-red-500/10
                  border border-red-500/20
                  text-red-400
                  text-sm
                  hover:bg-red-500/20
                  transition-all duration-300
                "
                >
                  {skill}
                </span>

              )
            )}

          </div>

        </div>

      )}



      {/* AI SUGGESTIONS */}
      {atsData && (

        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-3xl
          p-6
          mt-6
        "
        >

          <div className="flex items-center gap-3 mb-6">

            <div
              className="
              w-12 h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500/10
              to-purple-500/10
              border border-blue-500/20
              flex items-center justify-center
            "
            >

              <Sparkles
                size={22}
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
                AI Suggestions
              </h2>

              <p className="text-gray-500 text-sm">
                Smart recommendations to improve ATS score
              </p>

            </div>

          </div>



          <div className="space-y-4">

            {atsData.suggestions?.map(
              (
                item: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                  relative
                  overflow-hidden
                  bg-black
                  border border-white/5
                  rounded-2xl
                  p-5
                  hover:border-purple-500/20
                  transition-all duration-300
                "
                >

                  {/* Glow Line */}
                  <div
                    className="
                    absolute
                    left-0 top-0
                    h-full
                    w-[4px]
                    bg-gradient-to-b
                    from-blue-500
                    to-purple-500
                  "
                  />



                  <div className="flex items-start gap-4">

                    <div
                      className="
                      min-w-[42px]
                      h-[42px]
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-500/10
                      to-purple-500/10
                      border border-blue-500/20
                      flex items-center justify-center
                    "
                    >

                      <Sparkles
                        size={18}
                        className="text-[#6EA8FF]"
                      />

                    </div>



                    <div>

                      <p
                        className="
                        text-gray-200
                        leading-relaxed
                      "
                      >
                        {item}
                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>
  );
}