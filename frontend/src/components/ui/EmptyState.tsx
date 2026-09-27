"use client";

import { useRouter } from "next/navigation";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * EmptyState — Shown when a page has no data to display.
 *
 * Usage:
 *   <EmptyState
 *     icon={<FileText size={48} className="text-gray-600" />}
 *     title="No resumes yet"
 *     description="Upload your first resume to get started."
 *     actionLabel="Upload Resume"
 *     actionHref="/dashboard"
 *   />
 */

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {

  const router = useRouter();

  return (
    <div
      className="
      flex flex-col items-center justify-center
      py-20
      border border-white/5
      rounded-3xl
      bg-surface
    "
    >

      <div className="mb-4 opacity-50">
        {icon}
      </div>

      <p className="text-gray-400 text-lg font-medium">
        {title}
      </p>

      <p className="text-gray-600 text-sm mt-1 max-w-xs text-center">
        {description}
      </p>

      {actionLabel && actionHref && (
        <button
          onClick={() => router.push(actionHref)}
          className="
          mt-6 px-5 py-2.5
          rounded-xl
          bg-gradient-to-r from-blue-600 to-purple-600
          text-white text-sm font-semibold
          hover:scale-105
          transition-all duration-300
          shadow-[0_0_20px_rgba(59,130,246,0.15)]
        "
        >
          {actionLabel}
        </button>
      )}

    </div>
  );
}
