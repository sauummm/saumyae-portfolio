import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { services } from '@/content/services';
import { skills } from '@/content/skills';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Services"
      title="What I can build for you"
      description="End-to-end delivery across the stack — from the data layer to the UI, with AI integration when the problem calls for it."
      tint="violet"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.08} scale={0.94}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <Reveal>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Tools &amp; technologies
          </h3>
        </Reveal>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.06}>
              <Card>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.category}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
