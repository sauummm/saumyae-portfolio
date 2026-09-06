import { SocialIcon } from '@/components/ui/icons';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
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
                className="text-muted-foreground transition-colors hover:text-foreground"
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
