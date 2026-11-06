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
          from_name: "Lorenz Portfolio Contact Form",
          botcheck: website.trim(),
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

        <div className="flex justify-center items-center gap-6 sm:gap-10 mb-12">
          <a
            href="https://github.com/lorenzdiscutido"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:border-orange dark:group-hover:border-orange text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-200 shadow-md">
              <span className="sr-only">GitHub</span>
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              GitHub
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/discutido-lorenzo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.04] dark:bg-white/5 border border-black/10 dark:border-white/10 group-hover:border-orange dark:group-hover:border-orange text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-200 shadow-md">
              <span className="sr-only">LinkedIn</span>
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.32a1.62 1.62 0 0 0-1.62 1.62c0 .9.72 1.63 1.62 1.63s1.62-.73 1.62-1.63c0-.9-.72-1.62-1.62-1.62Z" />
              </svg>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              LinkedIn
            </span>
          </a>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} Jose Lorenzo Discutido. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
