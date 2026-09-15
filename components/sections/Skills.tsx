import { Layers, BrainCircuit, Cloud, Camera } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { services } from '@/content/services';
import { skills } from '@/content/skills';
import type { Service } from '@/types';

const iconMap: Record<Service['icon'], typeof Layers> = {
  layers: Layers,
  'brain-circuit': BrainCircuit,
  cloud: Cloud,
  camera: Camera,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Services"
      title="What I can build for you"
      description="End-to-end delivery across the stack — from the data layer to the UI, with AI integration when the problem calls for it."
      tint="brand"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <Reveal key={service.title} delay={index * 0.08}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-2 text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
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
