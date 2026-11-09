import { chromium } from "playwright";
import path from "path";

async function capture() {
  const artifactDir = "C:\\Users\\Vonotec\\.gemini\\antigravity\\brain\\c08e57e4-8cc9-41a6-9450-b37b1ba6b211";
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("Navigating to https://my-portfolio-ten-zeta-56.vercel.app...");
  await page.goto("https://my-portfolio-ten-zeta-56.vercel.app", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Trigger fluid ripples
  for (let i = 0; i < 8; i++) {
    await page.mouse.move(300 + i * 80, 200 + i * 50);
    await page.waitForTimeout(60);
  }

  // 1. Full-page screenshot (Dark Mode)
  console.log("Capturing full page (Dark)...");
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-full.png"),
    fullPage: true,
  });

  // 2. Hero viewport (Dark Mode)
  console.log("Capturing Hero section (Dark)...");
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 3. Bento Grid (Dark Mode)
  console.log("Capturing Bento Grid (Dark)...");
  const bento = page.getByTestId("bento-grid");
  await bento.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await bento.screenshot({
    path: path.join(artifactDir, "production-stealth-bento.png"),
  });

  // 4. Command Palette (Dark Mode)
  console.log("Capturing Command Palette (Dark)...");
  await page.keyboard.press("Control+k");
  const palette = page.getByTestId("command-palette");
  await palette.waitFor({ state: "visible" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-cmdk.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.keyboard.press("Escape");

  // 5. Open Terminal (Dark Mode)
  console.log("Capturing Open Terminal (Dark)...");
  await page.keyboard.press("Control+`");
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-terminal.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  // 6. TOGGLE THEME TO LIGHT MODE
  console.log("Toggling theme to Light Mode...");
  const themeToggle = page.locator('button[aria-label="Toggle Dark/Light Theme"]').first();
  await themeToggle.click();
  await page.waitForTimeout(800);

  // Trigger fluid ripples in Light Mode
  for (let i = 0; i < 8; i++) {
    await page.mouse.move(200 + i * 90, 300 + i * 40);
    await page.waitForTimeout(60);
  }

  // 7. Hero Viewport (Light Mode)
  console.log("Capturing Hero section (Light Mode)...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(artifactDir, "production-light-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 8. Bento Grid (Light Mode)
  console.log("Capturing Bento Grid (Light Mode)...");
  await bento.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await bento.screenshot({
    path: path.join(artifactDir, "production-light-bento.png"),
  });

  // 9. Command Palette (Light Mode)
  console.log("Capturing Command Palette (Light Mode)...");
  await page.keyboard.press("Control+k");
  await palette.waitFor({ state: "visible" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(artifactDir, "production-light-cmdk.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.keyboard.press("Escape");

  await browser.close();
  console.log("All snapshots (Dark & Light Mode) captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
