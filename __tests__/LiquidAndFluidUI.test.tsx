import { render, screen, fireEvent } from "@testing-library/react";
import LiquidBackground from "@/components/LiquidBackground";
import MagneticButton from "@/components/MagneticButton";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: jest.fn(),
  }),
}));

describe("Fluid UI, Magnetic Physics & Custom Cursor Suite", () => {
  it("renders LiquidBackground canvas and handles synthetic mousemove bursts without errors", () => {
    render(<LiquidBackground />);
    const canvas = screen.getByTestId("liquid-canvas");
    expect(canvas).toBeInTheDocument();

    expect(() => {
      for (let i = 0; i < 20; i++) {
        fireEvent.mouseMove(window, { clientX: i * 35, clientY: i * 20 });
      }
      fireEvent.mouseMove(canvas, { clientX: 300, clientY: 240 });
    }).not.toThrow();
  });

  it("renders MagneticButton and handles hover physics events", () => {
    render(
      <MagneticButton>
        <button type="button">Magnetic Action</button>
      </MagneticButton>
    );

    const btn = screen.getByRole("button", { name: "Magnetic Action" });
    expect(btn).toBeInTheDocument();

    fireEvent.mouseMove(btn, { clientX: 120, clientY: 80 });
    fireEvent.mouseLeave(btn);
  });

  it("activates CustomCursor on fine-pointer desktop viewports and responds to interactive hover", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("pointer: fine"),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <div>
        <CustomCursor />
        <button type="button">Target CTA</button>
      </div>
    );

    expect(screen.getByTestId("custom-cursor")).toBeInTheDocument();
    const targetBtn = screen.getByRole("button", { name: "Target CTA" });
    fireEvent.mouseMove(targetBtn, { clientX: 200, clientY: 150 });

    window.matchMedia = originalMatchMedia;
  });

  it("opens the floating NavBar mobile slide-in drawer cleanly", () => {
    render(<NavBar />);
    const menuBtn = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuBtn);

    expect(screen.getByTestId("mobile-nav-drawer")).toBeInTheDocument();
    expect(screen.getByText(/Navigation Console/i)).toBeInTheDocument();
  });
});
