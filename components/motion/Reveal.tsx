'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds — pass `index * 0.08` when revealing a list. */
  delay?: number;
  /** Starting offset in px; negative slides in from the left instead of below. */
  y?: number;
  x?: number;
}

/**
 * Scroll-triggered fade + slide-in, used to wrap section headers, grid items,
 * and list rows throughout the site. `viewport={{ once: true }}` means it
 * never replays on scroll-back — a first-impression effect, not a distraction.
 * MotionConfig in app/providers.tsx makes this a no-op under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 20, x = 0 }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
