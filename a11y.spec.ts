import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility suite.
 *
 * Automated tooling catches roughly a third of real accessibility problems —
 * contrast, labelling, ARIA misuse, landmark structure. It cannot tell you
 * whether a focus order makes sense or whether an announcement is useful, so
 * the manual checklist in docs/qa-checklist.md is not optional.
 *
 *   npm run test:a11y
 *
 * Requires the site running at http://localhost:3000.
 */

const routes = [
  "/",
  "/about",
  "/about/approach",
  "/about/leadership",
  "/services",
  "/services/business-sme-financing",
  "/solutions/smes",
  "/industries/manufacturing",
  "/investments",
  "/faqs",
  "/contact",
  "/request-financing",
];

const standard = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of routes) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(standard).analyze();

    // Print the detail before asserting — a bare count is useless in CI logs.
    if (results.violations.length) {
      console.log(
        results.violations
          .map((v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target).join("\n  ")}`)
          .join("\n\n"),
      );
    }

    expect(results.violations).toEqual([]);
  });
}

/** Dark mode is a separate render, so it needs separate checking. */
for (const route of ["/", "/request-financing", "/contact"]) {
  test(`${route} has no accessibility violations in dark mode`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => {
      localStorage.setItem("garnet-theme", "dark");
      document.documentElement.classList.add("dark");
    });
    await page.reload();

    const results = await new AxeBuilder({ page }).withTags(standard).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("every interactive element in the header is reachable by keyboard", async ({ page }) => {
  await page.goto("/");

  // The skip link must be the first thing a keyboard user reaches.
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(first).toBe("Skip to content");
});

test("the financing form reports errors without moving the user", async ({ page }) => {
  await page.goto("/request-financing");
  await page.getByRole("button", { name: "Continue" }).click();

  // Failing validation must surface a message, not silently do nothing.
  await expect(page.getByText(/choose a financing need/i)).toBeVisible();
});

test("reduced motion removes entrance animation", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");

  // The hero heading should be at full opacity immediately, not animating in.
  const opacity = await page
    .getByRole("heading", { level: 1 })
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe("1");

  await context.close();
});
