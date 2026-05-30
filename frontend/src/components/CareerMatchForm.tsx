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
            rounded-2xl
            py-4
            font-semibold
            text-white
            bg-gradient-to-r
            from-blue-600
            via-blue-500
            to-purple-600
            hover:scale-[1.01]
            transition-all
            duration-300
            disabled:opacity-50
            disabled:hover:scale-100
            shadow-[0_0_25px_rgba(59,130,246,0.20)]
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
        grid
        md:grid-cols-2
        gap-6
        mb-6
        "
        >

        {/* Match Score */}

        <div
            className="
            bg-[#050505]
            border border-white/5
            rounded-[28px]
            p-8
        "
        >
            <p
            className="
            text-7xl
            font-black
            text-[#6EA8FF]
            "
            >
            {result.match_score}%
            </p>

            <p
            className="
            text-2xl
            font-semibold
            text-white
            mt-3
            "
            >
            Match Score
            </p>

            <p
            className="
            text-gray-400
            mt-1
            "
            >
            Resume Compatibility
            </p>
        </div>

        {/* Hiring Probability */}

        <div
            className="
            bg-[#050505]
            border border-white/5
            rounded-[28px]
            p-8
        "
        >
            <TrendingUp
            size={30}
            className="
            text-[#6EA8FF]
            mb-4
            "
            />

            <h3
            className="
            text-4xl
            font-bold
            text-white
            "
            >
            {result.hiring_probability}
            </h3>

            <p
            className="
            text-gray-500
            mt-2
            "
            >
            Hiring Probability
            </p>
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
            mb-6
        "
        >
            <div
            className="
            w-12 h-12
            rounded-xl
            bg-gradient-to-br
            from-blue-500/10
            to-purple-500/10
            border border-blue-500/20
            flex items-center
            justify-center
            "
            >
            <Briefcase
                size={22}
                className="text-[#6EA8FF]"
            />
            </div>

            <div>
            <h3
                className="
                text-2xl
                font-bold
                text-white
            "
            >
                Alternative Roles
            </h3>

            <p
                className="
                text-gray-500
                text-sm
                mt-1
            "
            >
                Roles that align well with your
                current skill profile
            </p>
            </div>
        </div>

        <div
            className="
            grid
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
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
                rounded-2xl
                border border-white/5
                bg-gradient-to-br
                from-blue-500/10
                to-purple-500/10
                p-5
                hover:border-blue-500/30
                hover:scale-[1.02]
                transition-all
                duration-300
                cursor-default
                "
                >
                <Briefcase
                    size={18}
                    className="
                    text-[#6EA8FF]
                    mb-3
                "
                />

                <p
                    className="
                    text-white
                    font-medium
                    leading-6
                "
                >
                    {role}
                </p>
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
