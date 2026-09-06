import { Mail, MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { LinkButton } from '@/components/ui/Button';
import { site } from '@/content/site';

// Deliberately no phone number here — see content/site.ts: it's never
// rendered publicly (spam-magnet concern).
//
// No form, on purpose: a mailto link opens the visitor's own mail client
// with a message already addressed to `site.email` — nothing to submit,
// nothing to fail server-side. `external` (not next/link) because this
// isn't an app route; see LinkButton's own doc comment.
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      description="Have a project in mind, or just want to say hi? I read every message."
    >
      <div className="flex flex-col items-start gap-4">
        <LinkButton href={`mailto:${site.email}`} external variant="primary" size="lg">
          <Mail className="h-4 w-4" aria-hidden="true" />
          {site.email}
        </LinkButton>
        <p className="flex items-center gap-3 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
          {site.location}
        </p>
      </div>
    </Section>
  );
}
