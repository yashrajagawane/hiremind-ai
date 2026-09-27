/**
 * Skeleton — Animated placeholder for loading states.
 *
 * Usage:
 *   <Skeleton className="h-24 w-full rounded-3xl" />
 *   <Skeleton className="h-4 w-48" />
 */

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/[0.06] ${className}`}
    />
  );
}
