'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Light-first, no system-preference override (deliberate — matches the
 * site's chosen light-first visual style rather than deferring to the OS).
 * next-themes injects its own blocking inline script to avoid a flash of
 * the wrong theme on load; pair with `<html suppressHydrationWarning>`.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
