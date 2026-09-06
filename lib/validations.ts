import { z } from 'zod';

/**
 * Server-side source of truth for contact-form validation (also driven
 * client-side by react-hook-form for onBlur UX — see ContactForm).
 *
 * `.email()` as a string-chain method is `@deprecated` in zod v4 in favor of
 * the top-level `z.email()`, but it's still fully functional and composes
 * more simply with `.trim()` here — kept deliberately (verified against the
 * installed v4.5.4 type declarations, not assumed).
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
  // Honeypot: real visitors never see or fill this field (visually hidden in
  // ContactForm), so any non-empty value here means a bot filled every field
  // it found. max(0) permits "" or absent, rejects anything actually typed.
  company: z.string().max(0, 'Spam check failed').optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
