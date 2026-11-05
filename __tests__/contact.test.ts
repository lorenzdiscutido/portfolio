import { CONTACT_LIMITS, toSingleLine, validateContact } from "@/lib/contact";

const valid = {
  name: "Jane Doe",
  email: "jane@company.com",
  subject: "Project inquiry",
  message: "Hello there",
};

describe("validateContact", () => {
  it("accepts a valid submission and trims values", () => {
    const result = validateContact({
      name: "  Jane Doe ",
      email: " jane@company.com ",
      subject: " Project inquiry ",
      message: "  Hello there  ",
    });

    expect(result).toEqual({ ok: true, data: valid });
  });

  it("allows an empty subject", () => {
    const result = validateContact({ ...valid, subject: "" });
    expect(result).toEqual({ ok: true, data: { ...valid, subject: "" } });
  });

  it.each([null, undefined, "text", 42])("rejects a non-object body (%p)", (body) => {
    expect(validateContact(body)).toEqual({ ok: false, error: "Invalid request body." });
  });

  it.each(["name", "email", "message"] as const)("requires %s", (field) => {
    expect(validateContact({ ...valid, [field]: "   " })).toEqual({
      ok: false,
      error: "Name, email, and message are required.",
    });
  });

  it("treats non-string fields as missing", () => {
    expect(validateContact({ ...valid, message: 123 })).toEqual({
      ok: false,
      error: "Name, email, and message are required.",
    });
  });

  it.each(["jane", "jane@", "@company.com", "jane@company", "jane @company.com"])(
    "rejects the malformed email %p",
    (email) => {
      expect(validateContact({ ...valid, email })).toEqual({
        ok: false,
        error: "Please enter a valid email address.",
      });
    }
  );

  it("rejects values over the length limits", () => {
    const tooLong = {
      name: "a".repeat(CONTACT_LIMITS.name + 1),
      email: "a".repeat(CONTACT_LIMITS.email - 4) + "@b.co",
      subject: "a".repeat(CONTACT_LIMITS.subject + 1),
      message: "a".repeat(CONTACT_LIMITS.message + 1),
    } as const;

    for (const field of Object.keys(tooLong) as (keyof typeof tooLong)[]) {
      const result = validateContact({ ...valid, [field]: tooLong[field] });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toContain(`The ${field} field is too long`);
      }
    }
  });

  it("accepts values exactly at the limit", () => {
    const result = validateContact({
      ...valid,
      message: "a".repeat(CONTACT_LIMITS.message),
    });
    expect(result.ok).toBe(true);
  });

  it("strips line breaks from single-line fields but keeps them in the message", () => {
    const result = validateContact({
      ...valid,
      name: "Jane\nDoe",
      subject: "Hello\r\nBcc: someone@example.com",
      message: "line one\nline two",
    });

    expect(result).toEqual({
      ok: true,
      data: {
        ...valid,
        name: "Jane Doe",
        subject: "Hello Bcc: someone@example.com",
        message: "line one\nline two",
      },
    });
  });
});

describe("toSingleLine", () => {
  it("replaces CR/LF runs with a single space", () => {
    expect(toSingleLine("a\r\n\nb")).toBe("a b");
  });
});
