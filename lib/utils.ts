import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names, then dedupe conflicting Tailwind utility
 * classes so the last one wins (e.g. `cn('px-2', condition && 'px-4')`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
