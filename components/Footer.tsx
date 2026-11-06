"use client";

import React, { useState } from "react";

export default function Footer() {
  const WEB3FORMS_KEY =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "cd29e663-f247-43a8-9213-58dd39d0449f";

  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot field
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !senderEmail.trim() || !name.trim()) return;

    // Honeypot silently discards automated spam
    if (website.trim()) {
      setStatus("sent");
      setName("");
      setSenderEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: name.trim(),
          email: senderEmail.trim(),
          subject: subject.trim() || `Portfolio Inquiry from ${name.trim()}`,
          message: message.trim(),
          from_name: name.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("sent");
        setName("");
        setSenderEmail("");
        setSubject("");
        setMessage("");
        setWebsite("");
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error: Could not reach the server. Please try again.");
    }
  };

  return (
    <footer id="contact" className="pt-20 pb-10 px-6 border-t border-black/10 dark:border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
          Let&apos;s <span className="text-orange-600 dark:text-orange">Connect</span>
        </h2>
        <p className="text-slate-700 dark:text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Whether you need a pragmatic systems engineer for your next enterprise deployment or want to talk about hardware and IoT integrations, send me a message directly below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mb-16 text-left bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg p-6 md:p-8 rounded-xl space-y-4"
        >
          {/* Honeypot field to trap automated bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
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
                className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
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
                className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Systems Engineering / Project Inquiry"
              className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
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
              className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-colors text-sm resize-y"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <span className="text-sm font-medium text-orange-700 dark:text-orange">
                ✓ Message sent! I&apos;ll get back to you soon.
              </span>
            )}

            {status === "error" && (
              <span className="text-sm font-medium text-red-500 dark:text-red-400">
                {errorMessage}
              </span>
            )}
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-mono text-slate-600 dark:text-slate-400">
          <a
            href="mailto:lorenzdiscutido@gmail.com"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ✉ lorenzdiscutido@gmail.com
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="tel:+639693399434"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ☎ +63 969 339 9434
          </a>
          <span className="hidden sm:inline">•</span>
          <span>📍 Manila, Philippines</span>
        </div>

        <div className="flex justify-center gap-8 mb-12">
          <a
            href="https://github.com/lorenzdiscutido"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/discutido-lorenzo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium tracking-wide"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} Jose Lorenzo Discutido. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
