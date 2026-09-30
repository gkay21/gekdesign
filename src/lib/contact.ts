// Contact form -> mailer Lambda (POST /send). The mailer only accepts
// name / email / phone / message, so the rest of the project brief is
// composed into a labelled plain-text message.

const DEFAULT_MAILER_URL = 'https://mailer.gekdesign.com.au/send';

export const MAILER_URL: string = import.meta.env.VITE_MAILER_URL || DEFAULT_MAILER_URL;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// Australian mobile (04xx) or landline (02/03/07/08), with 0 or +61 prefix.
// Mirrors the mailer's auPhonePattern / maxPhoneLength.
const AU_PHONE_REGEX = /^(?:\+?61|0)[2-478]\d{8}$/;
const PHONE_SEPARATORS_REGEX = /[\s().-]/g;
const MAX_PHONE_LENGTH = 20;

const GENERIC_ERROR_MESSAGE =
  'Sorry, something went wrong sending your brief. Please try again, or email george@gekdesign.com.au directly.';

export interface ContactBrief {
  name: string;
  email: string;
  phone?: string;
  company: string;
  website: string;
  message: string;
  services: readonly string[];
  budget: string;
  timeline: string;
}

export interface MailerPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type ContactField = 'name' | 'email' | 'phone';
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

interface MailerErrorResponse {
  errors?: { message?: string; detail?: string; title?: string }[];
}

export const isValidAuPhone = (phone: string): boolean => {
  const trimmed = phone.trim();
  return (
    trimmed.length <= MAX_PHONE_LENGTH &&
    AU_PHONE_REGEX.test(trimmed.replace(PHONE_SEPARATORS_REGEX, ''))
  );
};

export function validateContactBrief(brief: ContactBrief): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const email = brief.email.trim();
  const phone = brief.phone?.trim() ?? '';

  if (!brief.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address, e.g. jane@company.com.';
  }
  if (phone && !isValidAuPhone(phone)) {
    errors.phone = 'Please enter a valid Australian phone number, e.g. 0412 345 678 or +61 2 9825 8822.';
  }
  return errors;
}

export function composeBriefMessage(brief: ContactBrief): string {
  const lines = [
    ['Services', brief.services.join(', ')],
    ['Budget', brief.budget],
    ['Timeline', brief.timeline],
    ['Company', brief.company],
    ['Website', brief.website],
  ]
    .map(([label, value]) => [label, value.trim()])
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  const details = brief.message.trim();
  return [lines.join('\n'), details && `Project details:\n${details}`]
    .filter(Boolean)
    .join('\n\n');
}

export function buildMailerPayload(brief: ContactBrief): MailerPayload {
  const phone = brief.phone?.trim();
  return {
    name: brief.name.trim(),
    email: brief.email.trim(),
    ...(phone ? { phone } : {}),
    message: composeBriefMessage(brief),
  };
}

function getMailerErrorMessage(data: MailerErrorResponse): string {
  const messages = (data.errors ?? [])
    .map((err) => err.message || err.detail || err.title)
    .filter((msg): msg is string => Boolean(msg));
  return messages.join(', ') || GENERIC_ERROR_MESSAGE;
}

/** Sends the payload to the mailer. Resolves on 2xx, throws an Error with a user-facing message otherwise. */
export async function sendToMailer(payload: MailerPayload): Promise<void> {
  let response: Response;
  try {
    response = await fetch(MAILER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  if (response.ok) return;

  const data: MailerErrorResponse = await response.json().catch(() => ({}));
  throw new Error(getMailerErrorMessage(data));
}
