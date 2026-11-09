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

  // 1. Full-page screenshot
  console.log("Capturing full page...");
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-full.png"),
    fullPage: true,
  });

  // 2. Hero viewport
  console.log("Capturing Hero section...");
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // 3. Bento Grid
  console.log("Capturing Bento Grid...");
  const bento = page.getByTestId("bento-grid");
  await bento.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await bento.screenshot({
    path: path.join(artifactDir, "production-stealth-bento.png"),
  });

  // 4. Command Palette
  console.log("Capturing Command Palette...");
  await page.keyboard.press("Control+k");
  const palette = page.getByTestId("command-palette");
  await palette.waitFor({ state: "visible" });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-cmdk.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  await page.keyboard.press("Escape");

  // 5. Open Terminal
  console.log("Capturing Open Terminal...");
  await page.keyboard.press("Control+`");
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(artifactDir, "production-stealth-terminal.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  await browser.close();
  console.log("All snapshots captured successfully!");
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
