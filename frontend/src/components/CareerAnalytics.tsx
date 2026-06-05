"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Loader2,
  TrendingUp,
  IndianRupee,
  Target,
  BookOpen,
  Briefcase,
} from "lucide-react";

export default function CareerAnalytics() {
  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState<any>(null);

  const fetchAnalytics =
    async () => {
      try {
        const response =
          await axios.get(
            "https://hiremind-ai-3j1y.onrender.com/resume/career-analytics"
          );

        setData(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-[70vh]
      "
      >
        <Loader2
          size={40}
          className="
          animate-spin
          text-[#6EA8FF]
        "
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="
        text-center
        text-gray-400
        py-20
      "
      >
        No analytics found.
        Upload resume first.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Score + Salary */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
      "
      >
        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-[28px]
          p-8
        "
        >
          <div className="flex items-center gap-3">
            <TrendingUp
              className="text-[#6EA8FF]"
            />

            <h3
              className="
              text-xl
              font-bold
              text-white
            "
            >
              Career Readiness
            </h3>
          </div>

          <h1
            className="
            text-6xl
            font-bold
            text-white
            mt-6
          "
          >
            {
              data.career_readiness_score
            }
          </h1>

          <p
            className="
            text-[#6EA8FF]
            mt-3
            text-lg
          "
          >
            {data.level}
          </p>
        </div>

        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-[28px]
          p-8
        "
        >
          <div className="flex items-center gap-3">
            <IndianRupee
              className="text-[#6EA8FF]"
            />

            <h3
              className="
              text-xl
              font-bold
              text-white
            "
            >
              Expected Salary
            </h3>
          </div>

          <h1
            className="
            text-4xl
            font-bold
            text-white
            mt-6
          "
          >
            {data.salary_range}
          </h1>
        </div>
      </div>

      {/* Strengths */}

      <AnalyticsSection
        title="Current Strengths"
        icon={<Target size={20} />}
        items={
          data.current_strengths
        }
      />

      {/* Skill Gaps */}

      <AnalyticsSection
        title="Skill Gaps"
        icon={<BookOpen size={20} />}
        items={data.skill_gaps}
      />

      {/* Roadmap */}

      <AnalyticsSection
        title="Learning Roadmap"
        icon={<BookOpen size={20} />}
        items={
          data.learning_roadmap
        }
      />

      {/* Career Path */}

      <AnalyticsSection
        title="Career Path"
        icon={<Briefcase size={20} />}
        items={
          data.career_path
        }
      />
    </div>
  );
}

function AnalyticsSection({
  title,
  items,
  icon,
}: any) {
  return (
    <div
      className="
      bg-[#050505]
      border border-white/5
      rounded-[28px]
      p-6
    "
    >
      <div
        className="
        flex
        items-center
        gap-3
        mb-5
        text-white
      "
      >
        {icon}

        <h3
          className="
          text-2xl
          font-bold
          "
        >
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {items?.map(
          (
            item: string,
            index: number
          ) => (
            <div
              key={index}
              className="
              bg-black
              border border-white/5
              rounded-xl
              p-4
              text-gray-300
            "
            >
              {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}