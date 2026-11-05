import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipRequestLog = new Map<string, number[]>();

export function resetContactRateLimit(): void {
  ipRequestLog.clear();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestLog.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipRequestLog.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp?.trim();

    // Enforce IP rate limiting when client IP is present (or in production)
    if (clientIp || process.env.NODE_ENV === "production") {
      const ipKey = clientIp || "unknown-ip";
      if (isRateLimited(ipKey)) {
        return NextResponse.json(
          { error: "Too many messages sent. Please wait a few minutes before trying again." },
          { status: 429 }
        );
      }
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const result = validateContact(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { name, email, message } = result.data;
    const emailSubject = result.data.subject || `Portfolio Inquiry from ${name}`;
    const emailBody = `New portfolio contact submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`;

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
    const toAddress =
      process.env.CONTACT_RECIPIENT_EMAIL || "lorenzdiscutido@gmail.com";

    // Option 1: Resend (Recommended Vercel Integration)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: toAddress,
        replyTo: email,
        subject: emailSubject,
        text: emailBody,
      });

      if (error) {
        console.error("Resend delivery error:", error);
        return NextResponse.json(
          { error: "Failed to dispatch email via Resend." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, method: "resend" });
    }

    // Option 2: Web3Forms fallback if key provided
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: emailSubject,
          message,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        return NextResponse.json(
          { error: data.message || "Web3Forms submission failed." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, method: "web3forms" });
    }

    // No delivery provider configured.
    // In production, fail visibly: reporting success here would silently drop the message.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "Contact form: no delivery provider configured (set RESEND_API_KEY or WEB3FORMS_ACCESS_KEY)."
      );
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Development: log to the server console so the form can be tried without API keys.
    console.log("=== [NEW PORTFOLIO INQUIRY] ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Message:\n${message}`);
    console.log("================================");

    return NextResponse.json({
      success: true,
      method: "server-log",
      note: "Development mode: submission logged to the server console only.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
