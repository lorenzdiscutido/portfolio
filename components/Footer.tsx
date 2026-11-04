"use client";

import React, { useState } from "react";

export default function Footer() {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const recipientEmail = "lorenzdiscutido@gmail.com";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !senderEmail.trim()) return;

    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name || "Portfolio Visitor",
          email: senderEmail,
          _subject: subject || `Portfolio Inquiry from ${name || senderEmail}`,
          message,
        }),
      });

      if (response.ok) {
        setStatus("sent");
        setName("");
        setSenderEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error("Form submission fallback");
      }
    } catch {
      const mailtoSubject = encodeURIComponent(
        subject || `Portfolio Inquiry from ${name || senderEmail}`
      );
      const mailtoBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`
      );
      window.location.href = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setStatus("sent");
    }
  };

  return (
    <footer id="contact" className="bg-surface pt-20 pb-10 px-6 border-t border-[#2d313a]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Let&apos;s <span className="text-orange">Connect</span>
        </h2>
        <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
          Whether you need a pragmatic systems engineer for your next enterprise deployment or want to talk about hardware and IoT integrations, my inbox is always open.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-16 text-left bg-base p-6 md:p-8 rounded-xl border border-[#2d313a] space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-[#2d313a] focus:border-blue text-primary placeholder:text-muted/60 outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-[#2d313a] focus:border-blue text-primary placeholder:text-muted/60 outline-none transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Systems Engineering / Project Inquiry"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-[#2d313a] focus:border-blue text-primary placeholder:text-muted/60 outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg bg-surface border border-[#2d313a] focus:border-blue text-primary placeholder:text-muted/60 outline-none transition-colors text-sm resize-y"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue text-primary font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Email"}
            </button>

            {status === "sent" && (
              <span className="text-sm font-medium text-orange">
                ✓ Message sent! I&apos;ll get back to you soon.
              </span>
            )}
          </div>
        </form>

        <div className="flex justify-center gap-8 mb-12">
          <a
            href="https://github.com/lorenzdiscutido"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-blue transition-colors font-medium tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/discutido-lorenzo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-blue transition-colors font-medium tracking-wide"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-muted text-sm">
          © {new Date().getFullYear()} Jose Lorenzo Discutido. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
