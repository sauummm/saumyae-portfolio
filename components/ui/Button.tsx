'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-r from-accent to-accent-2 text-accent-foreground shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30',
  secondary: 'bg-muted text-foreground hover:bg-border',
  outline: 'border border-border text-foreground hover:border-accent/50 hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(base, variantStyles[variant], sizeStyles[size], className);
}

// Shared press/hover feel for every clickable button and link-button on the
// site — a spring rather than a duration-based tween so the snap-back after
// tap feels physical instead of mechanically timed.
const tapHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
};

const MotionLink = motion.create(Link);

// Motion's own on{Drag,Animation}* handlers have different signatures than the
// native DOM ones, so the native HTML attribute types must exclude them here.
type ConflictingHandlers = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingHandlers> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/** A clickable <button> — form submits and in-page actions. For navigation, use LinkButton. */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={buttonClasses(variant, size, className)}
      disabled={disabled}
      {...(disabled ? {} : tapHover)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, ConflictingHandlers> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  children: ReactNode;
}

/** A <Link>/<a> styled as a button. Internal nav uses next/link; external opens safely in a new tab. */
export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  external,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...tapHover}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...tapHover} {...props}>
      {children}
    </MotionLink>
  );
}
