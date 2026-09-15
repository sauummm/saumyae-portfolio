import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'outline' | 'accent' | 'warning';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground hover:text-foreground',
  outline: 'border border-border text-foreground hover:border-accent/50 hover:text-accent hover:bg-accent/5',
  accent: 'bg-linear-to-r from-accent to-accent-2 text-accent-foreground',
  // Used for "Case study in progress" / "Confidential" disclosure badges.
  warning: 'bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-300',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
