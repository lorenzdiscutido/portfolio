import { render, screen, fireEvent, act } from "@testing-library/react";
import Terminal from "@/components/Terminal";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Terminal Component", () => {
  beforeEach(() => {
    mockPush.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("opens when the floating trigger button is clicked and displays the welcome banner", () => {
    render(<Terminal />);
    const triggerBtn = screen.getByRole("button", { name: /Open Interactive Terminal/i });
    fireEvent.click(triggerBtn);

    expect(screen.getByText(/jld-sys telemetry console initialized/i)).toBeInTheDocument();
  });

  it("executes 'whoami' and 'help' commands", () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const input = screen.getByRole("textbox", { name: /Terminal command input/i });
    fireEvent.change(input, { target: { value: "whoami" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText(/Engr\. Jose Lorenzo Miguel Discutido/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText(/Available commands:/i)).toBeInTheDocument();
  });

  it("supports ArrowUp command history and Tab autocompletion", () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const input = screen.getByRole("textbox", { name: /Terminal command input/i }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "skills" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Press ArrowUp to recall "skills"
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input.value).toBe("skills");

    // Tab autocomplete "who" -> "whoami"
    fireEvent.change(input, { target: { value: "who" } });
    fireEvent.keyDown(input, { key: "Tab" });
    expect(input.value).toBe("whoami");
  });

  it("navigates via 'cd' command after 500ms delay", () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const input = screen.getByRole("textbox", { name: /Terminal command input/i });
    fireEvent.change(input, { target: { value: "cd iskiosk" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText(/Navigating to \/projects\/iskiosk-terminal/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockPush).toHaveBeenCalledWith("/projects/iskiosk-terminal");
  });

  it("navigates via hidden secret alias command after 500ms delay", () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const input = screen.getByRole("textbox", { name: /Terminal command input/i });
    const secretCmd = `cd ${String.fromCharCode(101, 108, 114, 111, 99, 101, 101)}`;
    fireEvent.change(input, { target: { value: secretCmd } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText(/Navigating to \/projects\/komunikonek/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockPush).toHaveBeenCalledWith("/projects/komunikonek");
  });

  it("executes Quick Command touch buttons without requiring manual keyboard typing", () => {
    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const projectsBtn = screen.getByRole("button", { name: /View Projects/i });
    fireEvent.click(projectsBtn);

    expect(screen.getByText(/Navigating to \/#projects/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockPush).toHaveBeenCalledWith("/#projects");
  });

  it("executes ping with prefers-reduced-motion: reduce instantly without timers", () => {
    // Mock matchMedia for prefers-reduced-motion: reduce
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const input = screen.getByRole("textbox", { name: /Terminal command input/i });
    fireEvent.change(input, { target: { value: "ping 100.64.0.1" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // With prefers-reduced-motion, all lines are rendered instantly without timer advancement
    expect(screen.getByText(/PING 100\.64\.0\.1 \(100\.64\.0\.1\) 56\(84\) bytes of data\./i)).toBeInTheDocument();
    expect(screen.getByText(/3 packets transmitted, 3 received, 0% packet loss/i)).toBeInTheDocument();
  });

  it("executes ping sequentially with timers when motion is not reduced", () => {
    // Mock matchMedia for no reduced motion
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<Terminal />);
    fireEvent.click(screen.getByRole("button", { name: /Open Interactive Terminal/i }));

    const input = screen.getByRole("textbox", { name: /Terminal command input/i });
    fireEvent.change(input, { target: { value: "ping 100.64.0.1" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Initial header rendered
    expect(screen.getByText(/PING 100\.64\.0\.1 \(100\.64\.0\.1\) 56\(84\) bytes of data\./i)).toBeInTheDocument();

    // Stats should not be visible yet
    expect(screen.queryByText(/3 packets transmitted, 3 received, 0% packet loss/i)).not.toBeInTheDocument();

    // Advance timers past completion (2500ms)
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(screen.getByText(/3 packets transmitted, 3 received, 0% packet loss/i)).toBeInTheDocument();
  });
});
