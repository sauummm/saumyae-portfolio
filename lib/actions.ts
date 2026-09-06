'use server';

import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations';

export interface ContactFormState {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>;
}

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Server Action backing ContactForm's `<form action={...}>`. Signature is
 * fixed by `useActionState`: `(prevState, formData) => Promise<State>`.
 */
export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    company: formData.get('company'),
  });

  if (!parsed.success) {
    // Honeypot tripped: report fake success and send nothing, so a bot never
    // learns it was caught. This intentionally swallows any other field
    // errors too — a filled honeypot means the whole submission is bot traffic.
    const honeypotTripped = parsed.error.issues.some((issue) => issue.path[0] === 'company');
    if (honeypotTripped) {
      return { status: 'success', message: "Thanks — I'll get back to you soon." };
    }

    const fieldErrors: ContactFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === 'name' || field === 'email' || field === 'message') {
        fieldErrors[field] = issue.message;
      }
    }
    return { status: 'error', message: 'Please fix the errors below.', fieldErrors };
  }

  const { name, email, message } = parsed.data;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!toEmail || !fromEmail || !process.env.RESEND_API_KEY) {
    console.error(
      'Contact form is missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL — see .env.example'
    );
    return {
      status: 'error',
      message: 'Something went wrong on my end — please email me directly instead.',
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p>${escapeHtml(
        message
      ).replace(/\n/g, '<br />')}</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        status: 'error',
        message: 'Something went wrong sending your message — please try again or email me directly.',
      };
    }

    return { status: 'success', message: "Thanks for reaching out — I'll get back to you soon." };
  } catch (err) {
    console.error('Contact form send failed:', err);
    return {
      status: 'error',
      message: 'Something went wrong sending your message — please try again or email me directly.',
    };
  }
}
