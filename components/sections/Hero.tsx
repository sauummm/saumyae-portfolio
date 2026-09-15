'use client';

import { ArrowRight, FileText, Mail } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
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

/**
 * Full-bleed intro, not a `Section` — it's the page's top, not an anchored
 * nav destination, so it skips Section's id/scroll-mt/eyebrow shape.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 sm:py-28">
      {/* Slow-drifting gradient blobs — decorative only, so aria-hidden and
          pointer-events-none. MotionConfig's reducedMotion="user" freezes
          these under prefers-reduced-motion instead of looping forever. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-accent-2/25 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-accent-3/20 blur-3xl"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container>
        <motion.div
          className="flex flex-col items-start gap-6"
          initial="hidden"
          animate="visible"
          variants={container}
        >
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
        </motion.div>
      </Container>
    </section>
  );
}
