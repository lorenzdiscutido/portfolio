export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Collapse CR/LF so user input can never add extra email headers. */
export function toSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function validateContact(body: unknown): ContactValidation {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const name = clean(input.name);
  const email = clean(input.email);
  const subject = clean(input.subject);
  const message = clean(input.message);

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const tooLong = (Object.keys(CONTACT_LIMITS) as (keyof typeof CONTACT_LIMITS)[]).find(
    (field) => ({ name, email, subject, message })[field].length > CONTACT_LIMITS[field]
  );
  if (tooLong) {
    return {
      ok: false,
      error: `The ${tooLong} field is too long (max ${CONTACT_LIMITS[tooLong]} characters).`,
    };
  }

  return {
    ok: true,
    data: {
      name: toSingleLine(name),
      email: toSingleLine(email),
      subject: toSingleLine(subject),
      message,
    },
  };
}
