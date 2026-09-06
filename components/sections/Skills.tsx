import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { skills } from '@/content/skills';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      description="Languages, frameworks, and tools I use day to day — plus a few I keep sharp outside of work."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <Card key={group.category}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {group.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
