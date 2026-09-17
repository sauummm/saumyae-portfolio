import type { SVGProps } from 'react';
import { Mail, Phone, MessageCircle, MapPin, FileText } from 'lucide-react';
import type { SocialLink } from '@/types';

/**
 * The installed lucide-react version ships no brand marks (no `Github`, no
 * `Linkedin`) — verified directly against the package, not assumed. Rather
 * than add a whole icon-brand dependency for two glyphs, these are small
 * hand-drawn outline marks, used only as "open my profile" link affordances.
 */
function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.35-3.88-1.35-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.7.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

const lucideIconMap = {
  mail: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  'map-pin': MapPin,
  'file-text': FileText,
} as const;

/**
 * Resolves a `SocialLink.icon` name to its glyph — lucide-react for the
 * generic ones, the hand-drawn marks above for the two brands lucide
 * doesn't ship. Keeping this mapping in one place means every consumer
 * (Footer, Contact, ...) stays correct if the icon set ever changes.
 */
export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink['icon'];
  className?: string;
}) {
  if (icon === 'github') return <GithubIcon className={className} />;
  if (icon === 'linkedin') return <LinkedinIcon className={className} />;

  const LucideIcon = lucideIconMap[icon];
  return <LucideIcon className={className} aria-hidden="true" />;
}
