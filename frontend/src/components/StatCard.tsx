"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
      bg-surface
      border border-white/5
      rounded-3xl
      p-5
      flex items-center justify-between
      hover:border-primary-border
      transition-colors duration-300
    "
    >

      <div>
        <p className="text-gray-400 text-sm mb-2">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-white">
          {value}
        </h2>
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
        text-accent
      "
      >
        {icon}
      </div>

    </motion.div>
  );
}