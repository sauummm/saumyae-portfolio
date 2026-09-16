'use client';

import { useRef } from 'react';
import { ArrowRight, FileText, Mail } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { Button, LinkButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// Pulled verbatim from real results in content/projects.ts — no invented numbers.
const stats = [
  { value: '92% mAP', label: 'Real-time detection accuracy' },
  { value: '~30% faster', label: 'Query response after optimization' },
  { value: '100% offline', label: 'Zero-data-egress RAG pipeline' },
  { value: 'Live in prod', label: 'Enterprise tool in active use' },
];

/**
 * Full-bleed intro, not a `Section` — it's the page's top, not an anchored
 * nav destination, so it skips Section's id/scroll-mt/eyebrow shape.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Scoped to the hero's own scroll range (not the whole page), so the
  // parallax/fade/scale settles by the time the hero scrolls out of view.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={heroRef} className="relative overflow-hidden border-b border-border py-20 sm:py-28">
      {/* Slow-drifting gradient blobs — decorative only, so aria-hidden and
          pointer-events-none. MotionConfig's reducedMotion="user" freezes
          these under prefers-reduced-motion instead of looping forever. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
          animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-palette-rose/20 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-palette-amber/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent-3/20 blur-3xl"
          animate={{ x: [0, -45, 0], y: [0, -55, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container>
        <motion.div
          className="flex flex-col items-start gap-6"
          initial="hidden"
          animate="visible"
          variants={container}
          style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity, scale: contentScale }}
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 self-start rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-foreground"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-palette-emerald"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Available for new projects
          </motion.div>
          <motion.p variants={item} className="text-sm font-semibold uppercase tracking-wide text-gradient-brand">
            {site.role}
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {site.name}
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {site.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-3">
            <LinkButton href="#projects" size="lg">
              View projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="#contact" variant="outline" size="lg">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </LinkButton>

            {/* Honesty rule: no src yet means no dead download link — a visibly
                disabled affordance instead, same pattern as CaseStudy's links. */}
            {site.resume.status === 'ready' && site.resume.src ? (
              <LinkButton href={site.resume.src} external variant="ghost" size="lg">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Résumé
              </LinkButton>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                disabled
                aria-disabled="true"
                title={site.resume.note ?? 'Résumé coming soon'}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Résumé
              </Button>
            )}
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.value}>
                <dt className="text-xl font-bold text-gradient-brand sm:text-2xl">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </section>
  );
}
