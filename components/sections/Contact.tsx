'use client';

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Section } from '@/components/ui/Section';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/content/site';

// No form, on purpose: a mailto link opens the visitor's own mail client
// with a message already addressed to `site.email` — nothing to submit,
// nothing to fail server-side. `external` (not next/link) because this
// isn't an app route; see LinkButton's own doc comment.
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Start a Project"
      title="Have a project in mind?"
      description="Tell me what you're building — I read every message and reply personally."
      tint="brand"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg sm:p-10">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <motion.div
              className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl"
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-palette-blue/20 blur-3xl"
              animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-foreground">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-palette-emerald"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              Available for new projects
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <LinkButton href={`mailto:${site.email}`} external variant="primary" size="lg">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </LinkButton>
              <LinkButton
                href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
                external
                variant="outline"
                size="lg"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </LinkButton>
              <LinkButton href={`tel:${site.phone}`} external variant="outline" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </LinkButton>
            </div>
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.location}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
