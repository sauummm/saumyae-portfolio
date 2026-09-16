import { MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Reveal } from '@/components/motion/Reveal';
import { JourneyTimeline } from '@/components/about/JourneyTimeline';
import { site } from '@/content/site';
import { journey } from '@/content/journey';
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
    <Section id="about" tint="ocean">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-start">
        <Reveal x={-24} y={0} className="flex flex-col gap-4 text-muted-foreground">
          <div className="max-w-2xl">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gradient-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-linear-to-br from-accent to-accent-2" aria-hidden="true" />
              My Story
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why I build end to end
            </h2>
          </div>
          <p className="leading-relaxed">
            I never wanted to own just one layer of a product. In college I kept gravitating
            toward the pieces that connected everything — the API, the data model, the UI on
            top — so when it was time to specialize, I didn&apos;t. Today I&apos;m a full-stack
            engineer building enterprise systems at EPAM Systems: ASP.NET Core APIs, Angular
            frontends, SQL Server underneath, shipped on Azure.
          </p>
          <p className="leading-relaxed">
            Outside day-to-day enterprise work, I follow the problems that stretch me — a
            computer-vision safety system for railway platforms, an offline RAG chatbot built
            solo for a hackathon judged by a clinical-data nonprofit. Same habit every time:
            understand the whole pipeline before trusting any one layer of it.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            Based in {site.location}
          </p>
        </Reveal>

        {/* aspect-[4/5] matches the source photo's own crop (976x1220) —
            keeping the container's ratio equal to the image's means
            object-cover does zero additional cropping on top of it. A
            mismatched ratio here (e.g. aspect-square) is what was slicing
            into the top of the head before. */}
        <Reveal x={24} y={0} delay={0.15} className="w-full sm:w-60">
          <PlaceholderImage
            asset={headshot}
            className="aspect-[4/5] w-full sm:w-60"
            sizes="(min-width: 640px) 240px, 100vw"
          />
        </Reveal>
      </div>

      {/* The journey — a compact, real chronology (dates mirror
          content/education.ts / content/experience.ts exactly) rendered as
          a connected strip rather than the vertical TimelineItem used
          further down the page, so it reads as a distinct "how I got here"
          beat rather than a duplicate of the Track Record section. */}
      <JourneyTimeline journey={journey} />
    </Section>
  );
}
