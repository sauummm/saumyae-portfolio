'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PALETTE_GLOW, PALETTE_TEXT } from '@/lib/accentColors';
import { cn } from '@/lib/utils';
import type { ConfidentialLevel, Project } from '@/types';

const MotionLink = motion.create(Link);

// Cap the stack row so a long list can't blow out the card; the rest collapses to "+N".
const MAX_STACK = 4;

// Non-public postures earn a visible pill; `public` shows none.
const disclosureLabel: Record<ConfidentialLevel, string | null> = {
  public: null,
  sanitized: 'Sanitized demo',
  confidential: 'Confidential',
};

// No images anywhere on this card — a fixed height (rather than one driven
// by a thumbnail's aspect ratio) is what keeps every card uniform regardless
// of how long a given project's copy runs. It also has to be shared by both
// flip faces, since they're stacked via `absolute inset-0`.
const CARD_HEIGHT = 'h-72';

export function ProjectCard({ project }: { project: Project }) {
  const shownStack = project.stack.slice(0, MAX_STACK);
  const overflow = project.stack.length - shownStack.length;
  const disclosure = disclosureLabel[project.confidential];
  const hasBadges = project.status === 'placeholder' || disclosure !== null;
  const accent = PALETTE_GLOW[project.accentColor];
  const ctaAccent = PALETTE_TEXT[project.accentColor];

  return (
    <MotionLink
      href={`/projects/${project.slug}`}
      className={cn(
        'group block [perspective:1000px] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        CARD_HEIGHT
      )}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* The flipper: rotates on hover *and* on keyboard focus (focus-within
          fires on the group itself when the surrounding Link is focused) so
          the back face isn't hover-only. Touch has no hover state at all —
          a tap just navigates straight through, which is fine: the front
          face alone carries enough to act on. */}
      <div
        className={cn(
          'relative [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]',
          CARD_HEIGHT
        )}
      >
        {/* Front face */}
        <div className={cn('absolute inset-0 flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 [backface-visibility:hidden]', accent)}>
          {hasBadges && (
            <div className="flex flex-wrap gap-2">
              {project.status === 'placeholder' && (
                <Badge variant="warning">Case study in progress</Badge>
              )}
              {disclosure && (
                // Lock icon distinguishes this amber pill from the "in progress" one
                // when a project carries both (e.g. the confidential internal tool).
                <Badge variant="warning" className="gap-1">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  {disclosure}
                </Badge>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold leading-snug text-foreground">
              {project.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {shownStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
            {overflow > 0 && (
              <Badge variant="outline" aria-label={`${overflow} more technologies`}>
                +{overflow}
              </Badge>
            )}
          </div>
        </div>

        {/* Back face — the fuller description, revealed by the flip, plus a
            click-through cue. Pre-rotated 180° so it lands right-side-up once
            the flipper itself rotates into view. */}
        <div className={cn('absolute inset-0 flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 [backface-visibility:hidden] [transform:rotateY(180deg)]', accent)}>
          <h3 className="text-lg font-semibold leading-snug text-foreground">
            {project.title}
          </h3>
          <p className="line-clamp-5 text-sm text-muted-foreground">{project.summary}</p>
          <div className={cn('mt-auto flex items-center gap-1.5 text-sm font-medium', ctaAccent)}>
            View case study
            <ArrowRight className={cn('h-4 w-4', ctaAccent)} aria-hidden="true" />
          </div>
        </div>
      </div>
    </MotionLink>
  );
}
