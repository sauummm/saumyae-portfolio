import { MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { site } from '@/content/site';
import type { Asset } from '@/types';

// Not sourced from content/site.ts — the headshot decision is still open
// (see plan's deferred-asset tracker), so this stays an honest placeholder
// slot rather than an invented image or a silently missing one.
const headshot: Asset = {
  alt: `Photo of ${site.name}`,
  status: 'placeholder',
  note: 'Photo coming soon',
};

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-start">
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p className="leading-relaxed">
            I&apos;m a full-stack engineer who likes owning the whole surface of a product —
            an ASP.NET Core API and its data model, an Angular or React frontend on top, and
            whatever it takes to get a demo actually shipped. I&apos;m currently building
            internal tooling at EPAM Systems, after a diploma in advanced computing at CDAC
            and a B.Tech in Computer Science.
          </p>
          <p className="leading-relaxed">
            Outside day-to-day enterprise work, I take on problems in adjacent fields when
            they&apos;re interesting enough to justify the context switch — a computer-vision
            safety prototype for railway platforms, an offline document-QA pipeline built solo
            for a hackathon. Different stack, same habit: understand the whole pipeline, not
            just the layer I&apos;m comfortable in.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            Based in {site.location}
          </p>
        </div>

        <PlaceholderImage asset={headshot} className="aspect-square w-full sm:w-60" />
      </div>
    </Section>
  );
}
