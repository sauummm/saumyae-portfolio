'use client';

import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Light-first, no system-preference override (deliberate — matches the
 * site's chosen light-first visual style rather than deferring to the OS).
 * next-themes injects its own blocking inline script to avoid a flash of
 * the wrong theme on load; pair with `<html suppressHydrationWarning>`.
 *
 * `MotionConfig reducedMotion="user"` makes every motion.* component in the
 * tree honor prefers-reduced-motion automatically (animations still run
 * their end-state instantly, just skip the transition) — one global switch
 * instead of checking `useReducedMotion()` in each animated component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
