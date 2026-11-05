/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";

const mockSend = jest.fn();
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({ emails: { send: mockSend } })),
}));

const env = process.env as Record<string, string | undefined>;
const originalEnv = { ...process.env };
const originalFetch = global.fetch;

const validBody = {
  name: "Jane Doe",
  email: "jane@company.com",
  subject: "Project inquiry",
  message: "Hello there",
};

function post(body: unknown, rawBody?: string) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rawBody ?? JSON.stringify(body),
    })
  );
}

beforeEach(() => {
  mockSend.mockReset();
  delete env.RESEND_API_KEY;
  delete env.WEB3FORMS_ACCESS_KEY;
  env.NODE_ENV = "test";
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  global.fetch = originalFetch;
  for (const key of Object.keys(process.env)) delete env[key];
  Object.assign(process.env, originalEnv);
});

describe("POST /api/contact - validation", () => {
  it("returns 400 for malformed JSON", async () => {
    const res = await post(null, "{not json");
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid request body." });
  });

  it("returns 400 and sends nothing when validation fails", async () => {
    env.RESEND_API_KEY = "re_test";
    const res = await post({ ...validBody, email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Please enter a valid email address." });
    expect(mockSend).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact - Resend", () => {
  beforeEach(() => {
    env.RESEND_API_KEY = "re_test";
  });

  it("sends the email with reply-to set to the visitor", async () => {
    mockSend.mockResolvedValue({ data: { id: "email_1" }, error: null });

    const res = await post(validBody);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, method: "resend" });
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: "jane@company.com",
        subject: "Project inquiry",
      })
    );
  });

  it("prevents header injection through the subject", async () => {
    mockSend.mockResolvedValue({ data: { id: "email_1" }, error: null });

    await post({ ...validBody, subject: "Hello\r\nBcc: attacker@example.com" });

    const payload = mockSend.mock.calls[0][0];
    expect(payload.subject).not.toMatch(/[\r\n]/);
    expect(payload.subject).toBe("Hello Bcc: attacker@example.com");
  });

  it("falls back to a default subject", async () => {
    mockSend.mockResolvedValue({ data: { id: "email_1" }, error: null });

    await post({ ...validBody, subject: "" });

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ subject: "Portfolio Inquiry from Jane Doe" })
    );
  });

  it("returns 500 when Resend reports an error", async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: "rejected" } });

    const res = await post(validBody);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Failed to dispatch email via Resend." });
  });

  it("returns 500 when Resend throws", async () => {
    mockSend.mockRejectedValue(new Error("network down"));

    const res = await post(validBody);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      error: "An unexpected error occurred while processing your message.",
    });
  });
});

describe("POST /api/contact - Web3Forms fallback", () => {
  beforeEach(() => {
    env.WEB3FORMS_ACCESS_KEY = "w3f_test";
  });

  it("submits to Web3Forms when Resend is not configured", async () => {
    const mockFetch = jest.fn().mockResolvedValue({ json: async () => ({ success: true }) });
    global.fetch = mockFetch as unknown as typeof fetch;

    const res = await post(validBody);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, method: "web3forms" });
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("returns 500 with the provider message when Web3Forms fails", async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValue({ json: async () => ({ success: false, message: "bad key" }) });
    global.fetch = mockFetch as unknown as typeof fetch;

    const res = await post(validBody);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "bad key" });
  });
});

describe("POST /api/contact - no provider configured", () => {
  it("fails visibly in production instead of silently dropping the message", async () => {
    env.NODE_ENV = "production";

    const res = await post(validBody);

    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({
      error: "The contact form is temporarily unavailable. Please try again later.",
    });
  });

  it("logs to the console outside production", async () => {
    const res = await post(validBody);

    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true, method: "server-log" });
    expect(console.log).toHaveBeenCalled();
  });
});
