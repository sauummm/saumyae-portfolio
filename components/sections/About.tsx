import { MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { site } from '@/content/site';
import type { Asset } from '@/types';

// Not sourced from content/site.ts — this is the one photo on the site,
// scoped separately from the "no photos" rule that governs project cards
// and case studies (see content/projects.ts) since a personal headshot in
// an About section isn't a project screenshot.
const headshot: Asset = {
  src: '/images/saumyae-headshot.jpg',
  alt: `Photo of ${site.name}`,
  status: 'ready',
};

export function About() {
  return (
    // Heading is rendered inside the grid below (not passed as Section's
    // own eyebrow/title) so the photo column starts flush with it, instead
    // of only alongside the paragraphs — Section would otherwise place the
    // heading full-width above the whole grid, starting the photo a row too low.
    <Section id="about">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-start">
        <div className="flex flex-col gap-4 text-muted-foreground">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A bit about me
            </h2>
          </div>
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

        {/* aspect-[4/5] matches the source photo's own crop (976x1220) —
            keeping the container's ratio equal to the image's means
            object-cover does zero additional cropping on top of it. A
            mismatched ratio here (e.g. aspect-square) is what was slicing
            into the top of the head before. */}
        <PlaceholderImage
          asset={headshot}
          className="aspect-[4/5] w-full sm:w-60"
          sizes="(min-width: 640px) 240px, 100vw"
        />
      </div>
    </Section>
  );
}
