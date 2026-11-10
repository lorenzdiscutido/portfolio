import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer Component & Contact Form Fallback", () => {
  const originalFetch = global.fetch;
  const originalEnv = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-web3forms-key";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = originalEnv;
    jest.restoreAllMocks();
  });

  it("submits successfully to /api/contact under standard conditions", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    } as Response);

    render(<Footer />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Hello world" } });

    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message sent! I'll get back to you soon\./i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
      method: "POST",
    }));
  });

  it("falls back to Web3Forms when /api/contact returns 429 Too Many Requests", async () => {
    const fetchMock = jest.fn()
      // First call to /api/contact fails with 429
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: "Too many requests. Please wait." }),
      } as Response)
      // Second call to https://api.web3forms.com/submit succeeds
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      } as Response);

    global.fetch = fetchMock;

    render(<Footer />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: "Rate Limited User" } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: "ratelimited@example.com" } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Testing fallback" } });

    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message sent! I'll get back to you soon\./i)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/contact", expect.anything());
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.web3forms.com/submit",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("test-web3forms-key"),
      })
    );
  });

  it("falls back to Web3Forms when /api/contact returns 500 Internal Server Error", async () => {
    const fetchMock = jest.fn()
      // First call to /api/contact fails with 500
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal Server Error" }),
      } as Response)
      // Second call to https://api.web3forms.com/submit succeeds
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      } as Response);

    global.fetch = fetchMock;

    render(<Footer />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: "Server Error User" } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: "servererror@example.com" } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Testing 500 fallback" } });

    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message sent! I'll get back to you soon\./i)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(2, "https://api.web3forms.com/submit", expect.anything());
  });
});
