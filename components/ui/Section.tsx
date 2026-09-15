import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Reveal } from '@/components/motion/Reveal';

export type SectionTint = 'none' | 'soft' | 'brand' | 'brandStrong';

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

const tintStyles: Record<SectionTint, string> = {
  none: '',
  soft: 'bg-muted/40',
  brand: 'bg-linear-to-br from-accent/10 via-accent-2/5 to-accent-3/10',
  brandStrong: 'bg-linear-to-br from-accent/20 via-accent-2/15 to-accent-3/20 border-y border-accent/10',
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
          <Reveal className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gradient-brand">
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
