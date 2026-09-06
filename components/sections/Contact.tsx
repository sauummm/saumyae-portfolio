import { Mail, MapPin } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/content/site';

// Deliberately no phone number here — see content/site.ts: it's never
// rendered publicly (spam-magnet concern).
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      description="Have a project in mind, or just want to say hi? I read every message."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
            {site.email}
          </a>
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
            {site.location}
          </p>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
