import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Reveal } from '@/components/motion/Reveal';
import { projects } from '@/content/projects';

// Featured first. Array.prototype.sort is stable (ES2019+), so within each group
// the authored order from content/projects.ts is preserved untouched.
const orderedProjects = [...projects].sort(
  (a, b) => Number(b.featured) - Number(a.featured),
);

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Selected projects"
      description="A mix of enterprise, full-stack, and applied-AI work — some public, some sanitized or kept generic where the work isn't mine to show."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orderedProjects.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 3) * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
