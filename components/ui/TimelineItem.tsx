import type { ExperienceEntry } from '@/types';
import { Badge } from './Badge';

interface TimelineItemProps {
  entry: ExperienceEntry;
  isLast?: boolean;
}

/**
 * A single role in an Experience timeline: dot + connecting line, dates,
 * bullets, stack. Lives under `ui/` (not `sections/`) since Experience is
 * the only current consumer but the shape is a generic primitive.
 */
export function TimelineItem({ entry, isLast }: TimelineItemProps) {
  // Convention from content/experience.ts: equal start/end renders as one value.
  const dateLabel =
    entry.startDate === entry.endDate ? entry.startDate : `${entry.startDate} – ${entry.endDate}`;

  return (
    <div className="relative flex gap-6 pb-10 last:pb-0">
      <div className="flex flex-col items-center">
        <span
          className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-accent ring-4 ring-accent/20"
          aria-hidden="true"
        />
        {!isLast && <span className="mt-2 w-px flex-1 bg-border" aria-hidden="true" />}
      </div>

      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-semibold text-foreground">
            {entry.role} <span className="font-normal text-muted-foreground">· {entry.company}</span>
          </h3>
          <p className="shrink-0 text-sm text-muted-foreground">{dateLabel}</p>
        </div>
        <p className="text-sm text-muted-foreground">{entry.location}</p>

        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground marker:text-accent">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="pl-1 leading-relaxed">
              {bullet}
            </li>
          ))}
        </ul>

        {entry.stack && entry.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
