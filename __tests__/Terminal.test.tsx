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
});
