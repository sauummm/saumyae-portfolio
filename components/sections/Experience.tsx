import { Section } from '@/components/ui/Section';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { experience } from '@/content/experience';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Track Record" title="Where I’ve delivered" tint="sunset">
      <div>
        {experience.map((entry, index) => (
          <TimelineItem
            key={`${entry.company}-${entry.role}`}
            entry={entry}
            isLast={index === experience.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
