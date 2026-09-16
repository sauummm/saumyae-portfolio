import { ArrowRight } from 'lucide-react';
import { SocialIcon } from '@/components/ui/icons';
import { Container } from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import { site } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-start gap-4 border-b border-border py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-foreground">Got an idea worth building? Let&apos;s talk.</p>
        <LinkButton href="#contact" size="lg">
          Start a project
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LinkButton>
      </Container>

      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.role}</p>
        </div>

        <div className="flex items-center gap-4">
          {site.social.map((link) => {
            const external = link.href.startsWith('http');
            return (
              <a
                key={link.label}
                href={link.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
                className="text-muted-foreground transition-[color,transform] duration-200 hover:scale-110 hover:text-accent"
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          © {year} {site.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
