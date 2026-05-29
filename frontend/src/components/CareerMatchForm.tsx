"use client";

import { useState } from "react";
import axios from "axios";

import {
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function CareerMatchForm() {
  const [targetRole, setTargetRole] =
    useState("");

  const [experienceLevel, setExperienceLevel] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  const roles = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Software Developer",
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Python Developer",
    "Data Analyst",
    "Cloud Engineer",
    "DevOps Engineer",
  ];

  const experienceOptions = [
    "Fresher",
    "0-1 Years",
    "1-3 Years",
    "3-5 Years",
    "5+ Years",
  ];

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/resume/career-match",
        {
          target_role: targetRole,
          experience_level: experienceLevel,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Preferences */}

      <div
        className="
        bg-[#050505]
        border border-white/5
        rounded-[28px]
        p-8
      "
      >
        <div className="flex items-center gap-4 mb-8">
          <div
            className="
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-blue-500/10
            to-purple-500/10
            border border-blue-500/20
            flex items-center justify-center
          "
          >
            <Target
              className="text-[#6EA8FF]"
              size={26}
            />
          </div>

          <div>
            <h2
              className="
              text-3xl
              font-bold
              text-white
            "
            >
              Find Your Best Career Match
            </h2>

            <p className="text-gray-400 mt-1">
              Analyze your resume against your
              target role
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label
              className="
              text-sm
              text-gray-400
              mb-2
              block
            "
            >
              Target Role
            </label>

            <select
              value={targetRole}
              onChange={(e) =>
                setTargetRole(
                  e.target.value
                )
              }
              className="
              w-full
              bg-black
              border border-white/10
              rounded-xl
              px-4 py-3
              text-white
            "
            >
              <option value="">
                Select Role
              </option>

              {roles.map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="
              text-sm
              text-gray-400
              mb-2
              block
            "
            >
              Experience Level
            </label>

            <select
              value={experienceLevel}
              onChange={(e) =>
                setExperienceLevel(
                  e.target.value
                )
              }
              className="
              w-full
              bg-black
              border border-white/10
              rounded-xl
              px-4 py-3
              text-white
            "
            >
              <option value="">
                Select Experience
              </option>

              {experienceOptions.map(
                (exp) => (
                  <option
                    key={exp}
                    value={exp}
                  >
                    {exp}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={
            !targetRole ||
            !experienceLevel ||
            loading
          }
          className="
          mt-6
          w-full
          rounded-xl
          py-4
          font-semibold
          text-white
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          hover:opacity-90
          disabled:opacity-50
        "
        >
          {loading ? (
            <div
              className="
              flex items-center
              justify-center gap-2
            "
            >
              <Loader2
                size={18}
                className="animate-spin"
              />
              Analyzing...
            </div>
          ) : (
            "Analyze Match"
          )}
        </button>
      </div>

      {/* Results */}

      {result && (
        <>
          {/* Score */}

          <div
            className="
            bg-[#050505]
            border border-white/5
            rounded-[28px]
            p-10
            text-center
          "
          >
            <p
              className="
              text-7xl
              font-black
              bg-gradient-to-r
              from-blue-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
            >
              {result.match_score}%
            </p>

            <p
              className="
              text-xl
              text-gray-300
              mt-2
            "
            >
              Match Score
            </p>

            <div
              className="
              mt-4
              inline-flex
              items-center gap-2
              px-4 py-2
              rounded-full
              bg-green-500/10
              border border-green-500/20
            "
            >
              <TrendingUp
                size={18}
                className="text-green-400"
              />

              <span className="text-green-300">
                {result.hiring_probability}
                {" "}
                Hiring Probability
              </span>
            </div>
          </div>

          {/* Skills */}

          <div
            className="
            grid md:grid-cols-2
            gap-6
          "
          >
            {/* Matched */}

            <div
              className="
              bg-[#050505]
              border border-white/5
              rounded-[28px]
              p-6
            "
            >
              <h3
                className="
                text-2xl
                font-bold
                text-white
                mb-5
              "
              >
                Matched Skills
              </h3>

              <div className="space-y-3">
                {result.matched_skills?.map(
                  (
                    skill: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                      flex items-center
                      gap-3
                    "
                    >
                      <CheckCircle2
                        size={18}
                        className="
                        text-green-400
                      "
                      />

                      <span className="text-gray-300">
                        {skill}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Missing */}

            <div
              className="
              bg-[#050505]
              border border-white/5
              rounded-[28px]
              p-6
            "
            >
              <h3
                className="
                text-2xl
                font-bold
                text-white
                mb-5
              "
              >
                Missing Skills
              </h3>

              <div className="space-y-3">
                {result.missing_skills?.map(
                  (
                    skill: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                      flex items-center
                      gap-3
                    "
                    >
                      <AlertTriangle
                        size={18}
                        className="
                        text-red-400
                      "
                      />

                      <span className="text-gray-300">
                        {skill}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Alternative Roles */}

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
              flex items-center
              gap-3
              mb-5
            "
            >
              <Briefcase
                className="
                text-[#6EA8FF]
              "
              />

              <h3
                className="
                text-2xl
                font-bold
                text-white
              "
              >
                Alternative Roles
              </h3>
            </div>

            <div
              className="
              flex flex-wrap
              gap-3
            "
            >
              {result.alternative_roles?.map(
                (
                  role: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="
                    px-4 py-2
                    rounded-xl
                    border border-blue-500/20
                    bg-blue-500/10
                    text-[#8BB8FF]
                  "
                  >
                    {role}
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}