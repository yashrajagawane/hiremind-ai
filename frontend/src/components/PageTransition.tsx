"use client";

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition — Wraps page content with a subtle fade-in + slide-up animation.
 *
 * Usage (inside any page.tsx):
 *   <PageTransition>
 *     <div>Your page content</div>
 *   </PageTransition>
 */

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
