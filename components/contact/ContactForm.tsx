'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { sendContactMessage, type ContactFormState } from '@/lib/actions';

const initialState: ContactFormState = { status: 'idle', message: '' };

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const inputClasses =
  'mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Submission goes through the native `<form action={formAction}>` from
 * `useActionState` (progressive-enhancement-friendly, works pre-hydration).
 * react-hook-form's `register` is used only for onBlur validation UX — its
 * uncontrolled ref/name registration doesn't intercept native submission, so
 * it coexists with `action={formAction}` without `handleSubmit`. Zod in the
 * Server Action (lib/actions.ts) is the actual validation boundary.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot — hidden from sighted and screen-reader users; real visitors
          never see or fill it, so a non-empty submission means a bot. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          {...register('name', { required: 'Name is required', minLength: 2 })}
          aria-invalid={Boolean(errors.name || state.fieldErrors?.name)}
          className={cn(inputClasses)}
        />
        {(errors.name || state.fieldErrors?.name) && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.name?.message || state.fieldErrors?.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register('email', { required: 'Email is required' })}
          aria-invalid={Boolean(errors.email || state.fieldErrors?.email)}
          className={cn(inputClasses)}
        />
        {(errors.email || state.fieldErrors?.email) && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.email?.message || state.fieldErrors?.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="What are you looking to build?"
          {...register('message', { required: 'Message is required', minLength: 10 })}
          aria-invalid={Boolean(errors.message || state.fieldErrors?.message)}
          className={cn(inputClasses, 'resize-none')}
        />
        {(errors.message || state.fieldErrors?.message) && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errors.message?.message || state.fieldErrors?.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="self-start">
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {isPending ? 'Sending…' : 'Send message'}
      </Button>

      {state.status !== 'idle' && (
        <p
          role="status"
          className={cn(
            'text-sm',
            state.status === 'success'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'
          )}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
