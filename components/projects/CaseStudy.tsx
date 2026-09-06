import type { ReactNode } from 'react';
import { AlertTriangle, Code, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button, LinkButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import type { Project } from '@/types';

// overview / problem / approach / results are all the same titled-prose shape.
function ProseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const showDisclosure = project.confidential !== 'public';
  const isConfidential = project.confidential === 'confidential';
  const github = project.links?.github;
  const demo = project.links?.demo;

  return (
    <article className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <header className="max-w-3xl">
          {(project.status === 'placeholder' || showDisclosure) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {project.status === 'placeholder' && (
                <Badge variant="warning">Case study in progress</Badge>
              )}
              {showDisclosure && (
                <Badge variant="warning">
                  {isConfidential ? 'Confidential' : 'Sanitized demo'}
                </Badge>
              )}
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>

          <dl className="mt-6 flex flex-col gap-4 text-sm sm:flex-row sm:gap-10">
            <div>
              <dt className="font-semibold text-foreground">Role</dt>
              <dd className="mt-0.5 max-w-md text-muted-foreground">{project.role}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Timeframe</dt>
              <dd className="mt-0.5 text-muted-foreground">{project.timeframe}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </header>

        {/* Disclosure banner — shown whenever the posture isn't public. Mirrors the
            amber "warning" palette from Badge so the whole site reads one caution color. */}
        {showDisclosure && project.disclosureNote && (
          <aside
            role="note"
            className="mt-8 flex max-w-3xl gap-3 rounded-lg border border-amber-200 bg-amber-100 p-4 text-sm text-amber-900 dark:border-amber-500/25 dark:bg-amber-500/15 dark:text-amber-200"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">
                {isConfidential ? 'Confidential — internal tool' : 'Disclosure notice'}
              </p>
              <p className="mt-1 leading-relaxed">{project.disclosureNote}</p>
            </div>
          </aside>
        )}

        {/* Body */}
        <div className="mt-10 flex max-w-3xl flex-col gap-8">
          <ProseSection title="Overview">{project.overview}</ProseSection>
          <ProseSection title="The problem">{project.problem}</ProseSection>
          <ProseSection title="Approach">{project.approach}</ProseSection>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Architecture
            </h2>
            <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-muted-foreground marker:font-semibold marker:text-accent">
              {project.architectureSteps.map((step) => (
                <li key={step} className="pl-1 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <ProseSection title="Results">{project.results}</ProseSection>
        </div>

        {/* Gallery — each Asset routes through PlaceholderImage, so a not-yet-ready
            (or deliberately never-published) asset renders a labeled box, never a gap. */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Gallery</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.gallery.map((asset) => (
              <PlaceholderImage
                key={asset.alt}
                asset={asset}
                className="aspect-video w-full"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </section>

        {/* Links — honesty rule: a real external link, or a visibly disabled affordance.
            Never a dead href. Copy differs for confidential work (nothing is "coming"). */}
        <section className="mt-12">
          <h2 className="sr-only">Project links</h2>
          <div className="flex flex-wrap gap-3">
            {github ? (
              <LinkButton href={github} external variant="outline">
                <Code className="h-4 w-4" aria-hidden="true" />
                View source
              </LinkButton>
            ) : (
              <Button
                type="button"
                variant="outline"
                disabled
                aria-disabled="true"
                title={isConfidential ? 'Source is not published' : 'Source link coming soon'}
              >
                <Code className="h-4 w-4" aria-hidden="true" />
                {isConfidential ? 'Source not published' : 'Source coming soon'}
              </Button>
            )}
            {demo ? (
              <LinkButton href={demo} external variant="primary">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live demo
              </LinkButton>
            ) : (
              <Button
                type="button"
                variant="outline"
                disabled
                aria-disabled="true"
                title={isConfidential ? 'No public demo available' : 'Demo coming soon'}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {isConfidential ? 'No public demo' : 'Demo coming soon'}
              </Button>
            )}
          </div>
        </section>
      </Container>
    </article>
  );
}
