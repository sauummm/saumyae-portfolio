import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import type { ConfidentialLevel, Project } from '@/types';

// Cap the stack row so a long list can't blow out the card; the rest collapses to "+N".
const MAX_STACK = 4;

// Non-public postures earn a visible pill; `public` shows none.
const disclosureLabel: Record<ConfidentialLevel, string | null> = {
  public: null,
  sanitized: 'Sanitized demo',
  confidential: 'Confidential',
};

export function ProjectCard({ project }: { project: Project }) {
  const shownStack = project.stack.slice(0, MAX_STACK);
  const overflow = project.stack.length - shownStack.length;
  const disclosure = disclosureLabel[project.confidential];
  const hasBadges = project.status === 'placeholder' || disclosure !== null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Card hover className="flex h-full flex-col gap-4">
        <PlaceholderImage
          asset={project.thumbnail}
          className="aspect-video w-full"
          imageClassName="transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {hasBadges && (
          <div className="flex flex-wrap gap-2">
            {project.status === 'placeholder' && (
              <Badge variant="warning">Case study in progress</Badge>
            )}
            {disclosure && (
              // Lock icon distinguishes this amber pill from the "in progress" one
              // when a project carries both (e.g. the confidential internal tool).
              <Badge variant="warning" className="gap-1">
                <Lock className="h-3 w-3" aria-hidden="true" />
                {disclosure}
              </Badge>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">{project.tagline}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {shownStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {overflow > 0 && (
            <Badge variant="outline" aria-label={`${overflow} more technologies`}>
              +{overflow}
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}
