'use client';

import { motion } from 'motion/react';
import type { ExperienceEntry } from '@/types';
import { Badge } from './Badge';

interface TimelineItemProps {
  entry: ExperienceEntry;
  isLast?: boolean;
}

/**
 * A single role in an Experience timeline: dot + connecting line, dates,
 * bullets, stack. Lives under `ui/` (not `sections/`) since Experience is
 * the only current consumer but the shape is a generic primitive.
 */
export function TimelineItem({ entry, isLast }: TimelineItemProps) {
  // Convention from content/experience.ts: equal start/end renders as one value.
  const dateLabel =
    entry.startDate === entry.endDate ? entry.startDate : `${entry.startDate} – ${entry.endDate}`;

  return (
    <motion.div
      className="relative flex gap-6 pb-10 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex flex-col items-center">
        <motion.span
          className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-linear-to-br from-accent to-accent-2 ring-4 ring-accent/20"
          aria-hidden="true"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.35, delay: 0.15, type: 'spring', stiffness: 300 }}
        />
        {!isLast && (
          <motion.span
            className="mt-2 w-px flex-1 bg-linear-to-b from-accent/50 to-border"
            aria-hidden="true"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          />
        )}
      </div>

      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-semibold text-foreground">
            {entry.role} <span className="font-normal text-muted-foreground">· {entry.company}</span>
          </h3>
          <p className="shrink-0 text-sm text-muted-foreground">{dateLabel}</p>
        </div>
        <p className="text-sm text-muted-foreground">{entry.location}</p>

        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground marker:text-accent">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="pl-1 leading-relaxed">
              {bullet}
            </li>
          ))}
        </ul>

        {entry.stack && entry.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
