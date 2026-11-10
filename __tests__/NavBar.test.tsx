import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "@/components/NavBar";

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: jest.fn(),
  }),
}));

describe("NavBar Component", () => {
  it("renders the brand logo and navigation links", () => {
    render(<NavBar />);

    expect(screen.getByRole("link", { name: /Lorenz/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/#experience");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });

  it("dispatches open-terminal custom event when the terminal trigger is clicked", () => {
    const dispatchSpy = jest.spyOn(window, "dispatchEvent");
    render(<NavBar />);

    // Click terminal button
    const terminalButtons = screen.getAllByRole("button", { name: /Open Interactive Terminal/i });
    fireEvent.click(terminalButtons[0]);

    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(CustomEvent));
    expect(dispatchSpy.mock.calls[0][0].type).toBe("open-terminal");

    dispatchSpy.mockRestore();
  });

  it("toggles the mobile drawer when the hamburger menu button is clicked", () => {
    render(<NavBar />);

    const menuToggle = screen.getByRole("button", { name: /Open navigation menu/i });
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /Close navigation menu/i })).toBeInTheDocument();
    expect(screen.getByText(/Launch Interactive Terminal/i)).toBeInTheDocument();

    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute("aria-expanded", "false");
  });
});
