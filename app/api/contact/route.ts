import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailSubject = subject?.trim() || `Portfolio Inquiry from ${name}`;
    const emailBody = `New portfolio contact submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`;

    // Option 1: Resend (Recommended Vercel Integration)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "lorenzdiscutido@gmail.com",
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

    // Fallback: Log directly to server logs without triggering external mail apps
    console.log("=== [NEW PORTFOLIO INQUIRY] ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Message:\n${message}`);
    console.log("================================");

    return NextResponse.json({
      success: true,
      method: "server-log",
      note: "Submission received cleanly on server.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
