import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildMailerPayload,
  composeBriefMessage,
  isHoneypotFilled,
  isValidAuPhone,
  MAILER_URL,
  sendToMailer,
  validateContactBrief,
  type ContactBrief,
} from './contact';

const brief = (overrides: Partial<ContactBrief> = {}): ContactBrief => ({
  name: 'Jane Doe',
  email: 'jane@example.com',
  company: 'Example Pty Ltd',
  website: 'https://example.com',
  message: 'We need a new website.',
  services: ['Web Design & Art Direction', 'Full-Stack Web Development'],
  budget: '$15,000 – $25,000',
  timeline: '2 – 4 Weeks',
  ...overrides,
});

describe('isValidAuPhone', () => {
  it.each(['0412 345 678', '(02) 9825 8822', '+61 412 345 678', '0298258822', '07-1234-5678'])(
    'accepts %s',
    (phone) => expect(isValidAuPhone(phone)).toBe(true)
  );

  it.each(['12345', '0512 345 678', '+1 415 555 0100', '0412 345 678 999 999 99'])('rejects %s', (phone) =>
    expect(isValidAuPhone(phone)).toBe(false)
  );
});

describe('isHoneypotFilled', () => {
  it('is false when the hidden field is empty or whitespace', () => {
    expect(isHoneypotFilled('')).toBe(false);
    expect(isHoneypotFilled('   ')).toBe(false);
  });

  it('is true when a bot has filled in the hidden field', () => {
    expect(isHoneypotFilled('https://spam.example')).toBe(true);
  });
});

describe('validateContactBrief', () => {
  it('returns no errors for a complete brief', () => {
    expect(validateContactBrief(brief())).toEqual({});
  });

  it('requires a name and an email', () => {
    const errors = validateContactBrief(brief({ name: '  ', email: '' }));
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it('rejects a malformed email', () => {
    expect(validateContactBrief(brief({ email: 'not-an-email' })).email).toMatch(/valid email/);
  });

  it('only validates the phone when one is given', () => {
    expect(validateContactBrief(brief({ phone: '' })).phone).toBeUndefined();
    expect(validateContactBrief(brief({ phone: '123' })).phone).toMatch(/Australian phone/);
  });
});

describe('composeBriefMessage', () => {
  it('labels every filled field and appends the project details', () => {
    expect(composeBriefMessage(brief())).toBe(
      [
        'Services: Web Design & Art Direction, Full-Stack Web Development',
        'Budget: $15,000 – $25,000',
        'Timeline: 2 – 4 Weeks',
        'Company: Example Pty Ltd',
        'Website: https://example.com',
        '',
        'Project details:',
        'We need a new website.',
      ].join('\n')
    );
  });

  it('omits empty fields and the details block when there is no message', () => {
    expect(composeBriefMessage(brief({ company: ' ', website: '', message: '' }))).toBe(
      'Services: Web Design & Art Direction, Full-Stack Web Development\nBudget: $15,000 – $25,000\nTimeline: 2 – 4 Weeks'
    );
  });
});

describe('buildMailerPayload', () => {
  it('trims name and email and only includes phone when present', () => {
    const payload = buildMailerPayload(brief({ name: ' Jane ', email: ' jane@example.com ' }));
    expect(payload).toEqual({ name: 'Jane', email: 'jane@example.com', message: expect.any(String) });
    expect(buildMailerPayload(brief({ phone: ' 0412 345 678 ' })).phone).toBe('0412 345 678');
  });
});

describe('sendToMailer', () => {
  afterEach(() => vi.unstubAllGlobals());

  const payload = { name: 'Jane', email: 'jane@example.com', message: 'Hi' };

  it('posts JSON to the mailer and resolves on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(sendToMailer(payload)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(MAILER_URL, expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }));
  });

  it('surfaces the mailer error detail', async () => {
    const body = JSON.stringify({ errors: [{ status: 400, title: 'Bad Request', detail: 'invalid email' }] });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(body, { status: 400 })));

    await expect(sendToMailer(payload)).rejects.toThrow('invalid email');
  });

  it('falls back to a generic message on network or non-JSON errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(sendToMailer(payload)).rejects.toThrow(/something went wrong/);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>', { status: 500 })));
    await expect(sendToMailer(payload)).rejects.toThrow(/something went wrong/);
  });
});
