import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Reveal } from '@/components/motion/Reveal';

export type SectionTint = 'none' | 'soft' | 'ocean' | 'violet' | 'sunset' | 'forest' | 'brand';

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  containerClassName?: string;
  /** Full-bleed background wash — applied to the outer <section>, not Container, so color reaches the viewport edge. */
  tint?: SectionTint;
  children: ReactNode;
}

// Each tint (other than none/soft) leans on a genuinely different hue family
// rather than the same --accent/-2/-3 gradient at varying opacity, so
// scrolling the page visibly shifts color section to section.
const tintStyles: Record<SectionTint, string> = {
  none: '',
  soft: 'bg-muted/40',
  ocean: 'bg-linear-to-br from-palette-blue/12 via-accent-3/8 to-transparent',
  violet: 'bg-linear-to-br from-accent/12 via-accent-2/8 to-transparent',
  sunset: 'bg-linear-to-br from-palette-amber/14 via-palette-rose/8 to-transparent',
  forest: 'bg-linear-to-br from-palette-emerald/14 via-accent-3/6 to-transparent',
  brand: 'bg-linear-to-br from-accent/20 via-accent-2/15 to-accent-3/20 border-y border-accent/10',
};

/**
 * `scroll-mt-24` offsets anchor-jump targets so the sticky Navbar doesn't
 * cover the section heading when nav links / URL hashes scroll here.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  tint = 'none',
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-16 sm:py-24', tintStyles[tint], className)}
      {...props}
    >
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <Reveal className="mb-10 max-w-2xl" scale={0.94}>
            {eyebrow && (
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gradient-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-linear-to-br from-accent to-accent-2" aria-hidden="true" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {description && <p className="mt-3 text-muted-foreground">{description}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
