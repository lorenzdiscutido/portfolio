import { render, screen, fireEvent } from "@testing-library/react";
import LiquidBackground from "@/components/LiquidBackground";
import MagneticButton from "@/components/MagneticButton";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import CommandPalette from "@/components/CommandPalette";
import MagneticTechNodes from "@/components/MagneticTechNodes";
import LiveTelemetryDot from "@/components/LiveTelemetryDot";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: jest.fn(),
  }),
}));

describe("Fluid UI, Spotlight Bento, Command Palette & Magnetic Nodes Suite", () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it("renders LiquidBackground canvas and responds to synthetic mousemove and bullet-time events", () => {
    render(<LiquidBackground />);
    const canvas = screen.getByTestId("liquid-canvas");
    expect(canvas).toBeInTheDocument();

    expect(() => {
      for (let i = 0; i < 15; i++) {
        fireEvent.mouseMove(window, { clientX: i * 40, clientY: i * 25 });
      }
      window.dispatchEvent(
        new CustomEvent("liquid-bullet-time", {
          detail: { active: true, timeScale: 0.15 },
        })
      );
      window.dispatchEvent(
        new CustomEvent("liquid-bullet-time", {
          detail: { active: false, timeScale: 1 },
        })
      );
    }).not.toThrow();
  });

  it("renders Spotlight Bento Grid and updates spotlight coordinates on mouseMove", () => {
    render(<Projects />);
    const grid = screen.getByTestId("bento-grid");
    expect(grid).toBeInTheDocument();

    const firstCard = screen.getByTestId("bento-card-0");
    fireEvent.mouseMove(firstCard, { clientX: 180, clientY: 120 });
    expect(screen.getByTestId("bento-spotlight-0")).toBeInTheDocument();
  });

  it("opens Frosted Command Palette on Ctrl+K, focuses input, and dispatches bullet-time signal", () => {
    const dispatchSpy = jest.spyOn(window, "dispatchEvent");
    render(<CommandPalette />);

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });

    const dialog = screen.getByTestId("command-palette");
    expect(dialog).toBeInTheDocument();

    const input = screen.getByTestId("command-palette-input");
    expect(input).toHaveFocus();

    // Verify bullet-time event was emitted
    const bulletEvents = dispatchSpy.mock.calls.filter(
      (call) => call[0] instanceof CustomEvent && call[0].type === "liquid-bullet-time"
    );
    expect(bulletEvents.length).toBeGreaterThan(0);

    // Navigate with ArrowDown and press Escape
    fireEvent.keyDown(window, { key: "ArrowDown" });
    expect(screen.getByTestId("cmd-item-case-vonotec")).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(window, { key: "Escape" });

    // Verify bullet-time deactivation event was emitted on close
    const closeBulletEvent = dispatchSpy.mock.calls.find(
      (call) =>
        call[0] instanceof CustomEvent &&
        call[0].type === "liquid-bullet-time" &&
        call[0].detail?.active === false
    );
    expect(closeBulletEvent).toBeDefined();

    dispatchSpy.mockRestore();
  });

  it("snaps 3D MagneticTechNodes when pointer moves within 100px radius", () => {
    render(<MagneticTechNodes />);
    const node = screen.getByTestId("magnetic-node-python-next");
    expect(node).toBeInTheDocument();

    // Mock bounding box at (100, 100) with size 120x40 -> center (160, 120)
    node.getBoundingClientRect = jest.fn(() => ({
      left: 100,
      top: 100,
      width: 120,
      height: 40,
      right: 220,
      bottom: 140,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));

    // Move pointer within 100px of center (160, 120) -> e.g. (190, 140) distance = 36px
    fireEvent.mouseMove(window, { clientX: 190, clientY: 140 });
    expect(node).toHaveAttribute("data-snapped", "true");

    // Move pointer far outside 100px -> e.g. (500, 500)
    fireEvent.mouseMove(window, { clientX: 500, clientY: 500 });
    expect(node).toHaveAttribute("data-snapped", "false");
  });

  it("renders LiveTelemetryDot and MagneticButton cleanly", () => {
    render(
      <div>
        <LiveTelemetryDot />
        <MagneticButton>
          <button type="button">Magnetic Action</button>
        </MagneticButton>
        <CustomCursor />
        <NavBar />
      </div>
    );

    expect(screen.getByRole("button", { name: "Magnetic Action" })).toBeInTheDocument();
  });
});
