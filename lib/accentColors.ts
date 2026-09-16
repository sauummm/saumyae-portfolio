import type { PaletteColor } from '@/types';

// Literal strings (not interpolated) so Tailwind's JIT can find them — shared
// by ProjectCard and ServiceCard so each item's flip/hover accent stays in
// one place instead of duplicated per component.
export const PALETTE_GLOW: Record<PaletteColor, string> = {
  blue: 'group-hover:border-palette-blue/40 group-hover:shadow-xl group-hover:shadow-palette-blue/20',
  emerald: 'group-hover:border-palette-emerald/40 group-hover:shadow-xl group-hover:shadow-palette-emerald/20',
  amber: 'group-hover:border-palette-amber/40 group-hover:shadow-xl group-hover:shadow-palette-amber/20',
  rose: 'group-hover:border-palette-rose/40 group-hover:shadow-xl group-hover:shadow-palette-rose/20',
};

export const PALETTE_TEXT: Record<PaletteColor, string> = {
  blue: 'text-palette-blue',
  emerald: 'text-palette-emerald',
  amber: 'text-palette-amber',
  rose: 'text-palette-rose',
};

export const PALETTE_SOLID_BG: Record<PaletteColor, string> = {
  blue: 'bg-palette-blue',
  emerald: 'bg-palette-emerald',
  amber: 'bg-palette-amber',
  rose: 'bg-palette-rose',
};
