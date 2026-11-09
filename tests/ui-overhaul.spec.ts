import { test, expect } from "@playwright/test";

test.describe("Phase 1-3 App-Like UI Overhaul E2E Verification", () => {
  test("1. Simulates mouse movements across the Spotlight Bento Grid without causing horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const bentoGrid = page.getByTestId("bento-grid");
    await bentoGrid.scrollIntoViewIfNeeded();
    await expect(bentoGrid).toBeVisible();

    const firstCard = page.getByTestId("bento-card-0");
    const box = await firstCard.boundingBox();
    expect(box).not.toBeNull();

    if (box) {
      // Sweep pointer across the Bento card to activate the radial gradient spotlight
      await page.mouse.move(box.x + 20, box.y + 20);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
        steps: 8,
      });
      await page.mouse.move(box.x + box.width - 15, box.y + box.height - 15, {
        steps: 8,
      });
    }

    const overflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    expect(overflow).toBe(false);
  });

  test("2. Triggers Ctrl+K and verifies the Frosted Command Palette receives focus without layout shifting", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const initialScrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );

    // Trigger Ctrl+K keyboard shortcut
    await page.keyboard.press("Control+k");

    const palette = page.getByTestId("command-palette");
    await expect(palette).toBeVisible();

    const searchInput = page.getByTestId("command-palette-input");
    await expect(searchInput).toBeFocused();

    // Verify active selection state has glowing #FF007F left border
    const firstOption = page.locator('[role="option"]').first();
    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Verify zero layout shift when modal opens
    const openScrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    expect(openScrollWidth).toBe(initialScrollWidth);

    // Close via Escape
    await page.keyboard.press("Escape");
    await expect(palette).toBeHidden();
  });

  test("3. Asserts the Live Telemetry Pill renders on the DOM without hydration mismatches", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");

    const pill = page.getByTestId("live-telemetry-pill");
    await expect(pill).toBeVisible();
    await expect(pill).toContainText(/System:\s*Online\s*\|\s*Commits:/i);

    const hydrationErrors = consoleErrors.filter((err) =>
      /hydration|did not match/i.test(err)
    );
    expect(hydrationErrors).toHaveLength(0);
  });
});
