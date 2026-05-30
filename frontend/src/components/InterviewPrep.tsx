"use client";

import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

import {
  Brain,
  Briefcase,
  User,
  Target,
  Loader2,
  Download,
  Sparkles,
} from "lucide-react";

export default function InterviewPrep() {
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

  const handleGenerate =
    async () => {
      try {
        setLoading(true);

        const response =
          await axios.post(
            "http://127.0.0.1:8000/resume/interview-prep",
            {
              target_role:
                targetRole,

              experience_level:
                experienceLevel,
            }
          );

        setResult(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const downloadPDF = () => {
    if (!result) return;

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFontSize(18);

    pdf.text(
      "AI Interview Preparation",
      15,
      y
    );

    y += 15;

    pdf.setFontSize(12);

    pdf.text(
      `Role: ${targetRole}`,
      15,
      y
    );

    y += 8;

    pdf.text(
      `Experience: ${experienceLevel}`,
      15,
      y
    );

    y += 15;

    const addSection = (
      title: string,
      items: string[]
    ) => {
      pdf.setFontSize(14);

      pdf.text(
        title,
        15,
        y
      );

      y += 8;

      pdf.setFontSize(11);

      items.forEach(
        (item, index) => {
          pdf.text(
            `${index + 1}. ${item}`,
            20,
            y
          );

          y += 7;

          if (y > 270) {
            pdf.addPage();
            y = 20;
          }
        }
      );

      y += 5;
    };

    addSection(
      "Technical Questions",
      result.technical_questions ||
        []
    );

    addSection(
      "Resume Questions",
      result.resume_questions ||
        []
    );

    addSection(
      "HR Questions",
      result.hr_questions ||
        []
    );

    addSection(
      "Focus Areas",
      result.focus_areas ||
        []
    );

    pdf.save(
      "Interview_Preparation.pdf"
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}

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
            <Brain
              size={28}
              className="text-[#6EA8FF]"
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
              AI Interview Prep
            </h2>

            <p className="text-gray-400 mt-1">
              Personalized interview
              questions from your
              resume
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
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

              {roles.map(
                (role) => (
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Experience
            </label>

            <select
              value={
                experienceLevel
              }
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
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <button
          onClick={
            handleGenerate
          }
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
        "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Generating...
            </div>
          ) : (
            "Generate Questions"
          )}
        </button>
      </div>

      {!result && (
        <div
          className="
          bg-[#050505]
          border border-white/5
          rounded-[28px]
          p-10
          text-center
        "
        >
          <Sparkles
            size={40}
            className="
            mx-auto
            text-[#6EA8FF]
            mb-4
          "
          />

          <h3 className="text-2xl text-white font-bold">
            Ready For Interview Prep
          </h3>

          <p className="text-gray-500 mt-3">
            Generate personalized
            interview questions based
            on your resume.
          </p>
        </div>
      )}

      {result && (
        <>
          <div className="flex justify-end">
            <button
              onClick={
                downloadPDF
              }
              className="
              flex items-center
              gap-2
              px-5 py-3
              rounded-xl
              bg-blue-500/10
              border border-blue-500/20
              text-[#8BB8FF]
            "
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <QuestionCard
              title="Technical Questions"
              icon={<Brain size={20} />}
              items={
                result.technical_questions
              }
            />

            <QuestionCard
              title="Resume Questions"
              icon={
                <Briefcase
                  size={20}
                />
              }
              items={
                result.resume_questions
              }
            />

            <QuestionCard
              title="HR Questions"
              icon={<User size={20} />}
              items={
                result.hr_questions
              }
            />
          </div>

          <div
            className="
            bg-[#050505]
            border border-white/5
            rounded-[28px]
            p-6
          "
          >
            <div className="flex items-center gap-3 mb-5">
              <Target className="text-[#6EA8FF]" />

              <h3 className="text-2xl font-bold text-white">
                Focus Areas
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {result.focus_areas?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="
                    px-4 py-2
                    rounded-xl
                    bg-blue-500/10
                    border border-blue-500/20
                    text-[#8BB8FF]
                  "
                  >
                    {item}
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

function QuestionCard({
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
      <div className="flex items-center gap-3 mb-5 text-white">
        {icon}

        <h3 className="text-xl font-bold">
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
              text-sm
              leading-6
            "
            >
              {index + 1}. {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}
