'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { JourneyMilestone } from '@/types';

interface JourneyTimelineProps {
  journey: JourneyMilestone[];
}

// The line "fills in" and the marker travels across this slice of the
// section's scroll-through, not the full [0,1] range — so both finish while
// the row is still comfortably on screen instead of needing it to scroll
// almost fully past before completing.
const LINE_START = 0.15;
const LINE_END = 0.75;

/**
 * The connecting line draws left-to-right and a glowing marker runs along it
 * as this section scrolls through view — literal point-to-point motion, not
 * just a fade-in. Each dot also pops as the marker passes it. MotionConfig's
 * reducedMotion="user" (app/providers.tsx) only gates animate/whileInView —
 * these are raw scroll-linked `style` transforms, so reduced motion is
 * handled by hand, same pattern as Hero.tsx's parallax.
 */
export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineScaleX = useTransform(scrollYProgress, [LINE_START, LINE_END], [0, 1]);
  const markerLeft = useTransform(scrollYProgress, [LINE_START, LINE_END], ['0%', '100%']);
  const markerOpacity = useTransform(
    scrollYProgress,
    [LINE_START - 0.05, LINE_START, LINE_END, LINE_END + 0.1],
    [0, 1, 1, 0]
  );

  return (
    <div ref={containerRef} className="relative mt-14">
      {/* Track — the full-width, muted "unfilled" path. */}
      <div className="absolute inset-x-0 top-[7px] hidden h-px bg-border sm:block" aria-hidden="true" />
      {/* Fill — draws in from the left as the section scrolls through view. */}
      <motion.div
        className="absolute inset-x-0 top-[7px] hidden h-px bg-linear-to-r from-accent via-accent-2 to-accent-3 sm:block"
        style={prefersReducedMotion ? { scaleX: 1, transformOrigin: 'left' } : { scaleX: lineScaleX, transformOrigin: 'left' }}
        aria-hidden="true"
      />
      {/* Marker — a glowing dot that runs along the fill, in sync with its progress. */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-[7px] z-20 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_var(--accent)] sm:block"
          style={{ left: markerLeft, opacity: markerOpacity }}
          aria-hidden="true"
        />
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        {journey.map((milestone, index) => (
          <JourneyItem
            key={milestone.title}
            milestone={milestone}
            index={index}
            scrollYProgress={scrollYProgress}
            reachProgress={LINE_START + (index / (journey.length - 1)) * (LINE_END - LINE_START)}
            prefersReducedMotion={Boolean(prefersReducedMotion)}
          />
        ))}
      </div>
    </div>
  );
}

interface JourneyItemProps {
  milestone: JourneyMilestone;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  reachProgress: number;
  prefersReducedMotion: boolean;
}

function JourneyItem({ milestone, index, scrollYProgress, reachProgress, prefersReducedMotion }: JourneyItemProps) {
  const dotScale = useTransform(scrollYProgress, [reachProgress - 0.08, reachProgress], [1, 1.4]);
  const dotGlow = useTransform(scrollYProgress, [reachProgress - 0.08, reachProgress], [0, 1]);

  return (
    <motion.div
      className="relative flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 36, scale: 0.82 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.12 }}
    >
      <motion.div
        className="relative z-10 h-3.5 w-3.5"
        style={prefersReducedMotion ? undefined : { scale: dotScale }}
      >
        {!prefersReducedMotion && (
          <motion.span
            className="absolute -inset-1.5 rounded-full bg-accent blur-md"
            style={{ opacity: dotGlow }}
            aria-hidden="true"
          />
        )}
        <span className="absolute inset-0 rounded-full bg-linear-to-br from-accent to-accent-2 ring-4 ring-background" />
      </motion.div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{milestone.date}</p>
      <p className="text-sm font-semibold text-foreground">{milestone.title}</p>
      {milestone.org && <p className="text-xs text-muted-foreground">{milestone.org}</p>}
    </motion.div>
  );
}
