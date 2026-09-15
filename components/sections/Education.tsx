import { GraduationCap, Award } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { education } from '@/content/education';
import { achievements } from '@/content/certifications';

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & achievements">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {education.map((entry, index) => (
            <Reveal key={entry.institution} delay={index * 0.08}>
              <Card>
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">{entry.degree}</h3>
                    <p className="text-sm text-muted-foreground">{entry.institution}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {entry.startDate} – {entry.endDate}
                      {entry.gpa && ` · GPA ${entry.gpa}`}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Achievements
          </h3>
          {achievements.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <Card>
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-foreground underline-offset-2 hover:underline"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                    )}
                    {item.issuer && <p className="text-sm text-muted-foreground">{item.issuer}</p>}
                    {item.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
