import { ArrowRight, FileText, Mail } from 'lucide-react';
import { Button, LinkButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';

/**
 * Full-bleed intro, not a `Section` — it's the page's top, not an anchored
 * nav destination, so it skips Section's id/scroll-mt/eyebrow shape.
 */
export function Hero() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container className="flex flex-col items-start gap-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{site.role}</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {site.name}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {site.tagline}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
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
        </div>
      </Container>
    </section>
  );
}
