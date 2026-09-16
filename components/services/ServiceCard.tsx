'use client';

import { useState, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { RotateCw, Layers, BrainCircuit, Cloud, Camera, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PALETTE_GLOW, PALETTE_SOLID_BG } from '@/lib/accentColors';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

// Shared with ProjectCard's own CARD_HEIGHT — same fixed height convention,
// required since both flip faces stack via `absolute inset-0`.
const CARD_HEIGHT = 'h-72';

// Resolved here (not passed in from Skills.tsx, a Server Component) because
// a lucide-react icon is a function reference — not serializable across the
// server/client boundary as a prop.
const ICON_MAP: Record<Service['icon'], LucideIcon> = {
  layers: Layers,
  'brain-circuit': BrainCircuit,
  cloud: Cloud,
  camera: Camera,
};

interface ServiceCardProps {
  service: Service;
}

/**
 * Unlike ProjectCard, this tile is a `<Link>` to nowhere — a tap on a touch
 * device has no navigation fallback, so CSS-only `:hover`/`:focus-within`
 * would leave the back face permanently unreachable there. `flipped` is a
 * pinned toggle (click / Enter / Space) layered on top of the same CSS flip;
 * applied as an inline style so it always wins over the hover/focus classes
 * without fighting them for specificity.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const [flipped, setFlipped] = useState(false);
  const Icon = ICON_MAP[service.icon];
  const accent = PALETTE_GLOW[service.accentColor];
  const badge = PALETTE_SOLID_BG[service.accentColor];

  const toggle = () => setFlipped((prev) => !prev);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        'group block [perspective:1000px] cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        CARD_HEIGHT
      )}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div
        className={cn(
          'relative [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]',
          CARD_HEIGHT
        )}
        style={flipped ? { transform: 'rotateY(180deg)' } : undefined}
      >
        {/* Front face — name only, plus a hint that there's more on hover/tap. */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-shadow duration-500 [backface-visibility:hidden]',
            accent
          )}
        >
          <span className={cn('flex h-12 w-12 items-center justify-center rounded-full text-white', badge)}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RotateCw className="h-3 w-3" aria-hidden="true" />
            Tap or hover for details
          </p>
        </div>

        {/* Back face — pre-rotated 180° so it lands right-side-up once the flipper rotates into view. */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 [backface-visibility:hidden] [transform:rotateY(180deg)]',
            accent
          )}
        >
          <h3 className="text-base font-semibold leading-snug text-foreground">{service.title}</h3>
          <p className="line-clamp-5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
