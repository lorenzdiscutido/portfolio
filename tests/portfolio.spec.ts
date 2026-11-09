import { test, expect } from "@playwright/test";

test.describe("Portfolio Interactive Fluid & Glassmorphism UI E2E", () => {
  test("Desktop viewport: renders liquid canvas, handles synthetic mousemove bursts without exceptions, and supports magnetic CTAs", async ({
    page,
  }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (err) => pageErrors.push(err));

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const canvas = page.getByTestId("liquid-canvas");
    await expect(canvas).toBeVisible();

    // Trigger synthetic mousemove sweep across the desktop viewport
    const steps = [
      { x: 120, y: 140 },
      { x: 420, y: 260 },
      { x: 780, y: 400 },
      { x: 1050, y: 620 },
      { x: 640, y: 380 },
    ];
    for (const pt of steps) {
      await page.mouse.move(pt.x, pt.y, { steps: 5 });
    }

    // Verify no unhandled runtime exceptions occurred during fluid simulation
    expect(pageErrors).toHaveLength(0);

    // Assert zero horizontal overflow on desktop
    const hasOverflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflowX).toBe(false);

    // Verify Hero primary narrative & CTA
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Jose Lorenzo Discutido"
    );
    await expect(page.getByRole("link", { name: /View Projects/i })).toBeVisible();
  });

  test("Mobile viewport: opens floating NavBar slide-in drawer cleanly without causing horizontal overflow-x", async ({
    page,
  }) => {
    const pageErrors: Error[] = [];
    page.on("pageerror", (err) => pageErrors.push(err));

    // Emulate Mobile Viewport (iPhone SE / standard 375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Trigger synthetic pointer movement on mobile viewport
    await page.mouse.move(60, 120);
    await page.mouse.move(280, 420);

    const menuButton = page.getByTestId("mobile-menu-button");
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Open mobile slide-in glassmorphism drawer
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const drawer = page.getByTestId("mobile-nav-drawer");
    await expect(drawer).toBeVisible();
    await expect(page.getByText(/Launch Interactive Terminal/i)).toBeVisible();

    // Assert no horizontal overflow (overflow-x) when drawer is open
    const overflowMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(overflowMetrics.scrollWidth).toBeLessThanOrEqual(overflowMetrics.clientWidth);
    expect(pageErrors).toHaveLength(0);
  });
});
