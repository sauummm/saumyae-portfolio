import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CaseStudy } from '@/components/projects/CaseStudy';
import { projects } from '@/content/projects';

// One statically-generated route per project. generateStaticParams keeps its
// classic contract in Next 16 — plain objects in and out, not Promises.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// params is a Promise in Next 16 — await it before touching .slug.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  const description = project.summary;

  return {
    title: project.title,
    description,
    // The og:image tags come from the sibling opengraph-image.tsx via the file
    // convention — don't set openGraph.images here or they'd double up.
    openGraph: {
      title: project.title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // notFound() returns `never`, so `project` is narrowed to Project below.
  if (!project) {
    notFound();
  }

  return (
    <div>
      <Container className="pt-8">
        <LinkButton href="/#projects" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </LinkButton>
      </Container>
      <CaseStudy project={project} />
    </div>
  );
}
