import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.route("**/api/inquiry/status", (route) =>
    route.fulfill({ json: { available: true } }),
  );
  // Replace only Google's remote script in this isolated browser test.
  await page.route("https://www.google.com/recaptcha/api.js**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
    window.grecaptcha={render(el,options){const input=document.createElement('input');input.type='checkbox';input.setAttribute('aria-label','Test verification');input.onchange=()=>options.callback('test-token');el.append(input);return 1;},reset(){document.querySelector('[aria-label="Test verification"]').checked=false;}};
    document.currentScript.addEventListener("load", () => setTimeout(() => window.onloadcallback(), 0));`,
    }),
  );
});
for (const width of [320, 768, 1100, 1440])
  test("navigation and footer at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const menu = page.getByRole("button", { name: "Open menu" });
    if (await menu.isVisible()) await menu.click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Inquiry", exact: true })
      .click();
    await expect(page).toHaveURL(/#inquiry$/);
    await expect(page.getByLabel("Full Name")).toBeVisible();
    expect(
      await page.evaluate(
        () =>
          document.querySelector("#inquiry").getBoundingClientRect().top >=
          document.querySelector("header").getBoundingClientRect().bottom - 2,
      ),
    ).toBeTruthy();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBeTruthy();
    await expect(page.locator('footer a[href="#inquiry"]')).toHaveText(
      "Contact",
    );
    await expect(
      page.getByRole("link", { name: /HOOK on Instagram/ }),
    ).toHaveAttribute(
      "href",
      "https://www.instagram.com/hook_by_semicolon?evlk=aDd0ZXNjaWE2NzVr",
    );
    await expect(
      page.locator(".social-links [aria-disabled=true]"),
    ).toHaveCount(3);
    const linkedin = page.getByRole("link", { name: /HOOK on LinkedIn/ });
    await expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/hookbysemicolon/",
    );
    await expect(linkedin).toHaveAttribute("target", "_blank");
    await expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links.every((link) => document.getElementById(link.hash.slice(1))),
        ),
    ).toBeTruthy();
  });
test("validation, challenge requirement, failure retention, loading, duplicate prevention and accurate receipts", async ({
  page,
}) => {
  await page.goto("/#inquiry");
  const submit = page.getByRole("button", { name: "Submit Inquiry" });
  await expect(submit).toBeDisabled();
  await page.getByLabel("Test verification").check();
  await submit.click();
  await expect(
    page.getByText("This field is required.", { exact: true }),
  ).toHaveCount(4);
  await page.getByLabel("Full Name").fill("Alex");
  await page.getByLabel("Email Address").fill("broken");
  await page.getByLabel("Contact Number").fill("abc");
  await page.getByLabel("Inquiry Description").fill("Please explain CATS.");
  await submit.click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText(/Enter 7 to 15 digits/)).toBeVisible();
  await page.getByLabel("Email Address").fill("alex@example.org");
  await page.getByLabel("Contact Number").fill("+94 77 1234567");
  await expect(submit).toBeEnabled();
  let calls = 0,
    release;
  const pending = new Promise((resolve) => {
    release = resolve;
  });
  await page.route("**/api/inquiry", async (route) => {
    calls++;
    if (calls === 1) {
      await pending;
      await route.fulfill({ status: 503, json: { code: "submission_failed" } });
    } else
      await route.fulfill({
        json: { received: true, acknowledged: calls === 3 },
      });
  });
  await page.getByLabel("Test verification").check();
  await submit.click();
  await expect(
    page.getByRole("button", { name: "Sending inquiry…" }),
  ).toBeDisabled();
  await page.locator(".inquiry-form").evaluate((form) => form.requestSubmit());
  release();
  await expect(page.getByRole("status")).toContainText("couldn't submit");
  expect(calls).toBe(1);
  await expect(page.getByLabel("Inquiry Description")).toHaveValue(
    "Please explain CATS.",
  );
  await page.getByRole("button", { name: "Verify again" }).click();
  await page.getByLabel("Test verification").check();
  await submit.click();
  await expect(page.getByRole("status")).toContainText(
    "couldn't send your confirmation",
  );
  await expect(page.getByLabel("Full Name")).toHaveValue("");
  await page.getByLabel("Full Name").fill("Alex");
  await page.getByLabel("Email Address").fill("alex@example.org");
  await page.getByLabel("Contact Number").fill("0771234567");
  await page.getByLabel("Inquiry Description").fill("Another question");
  await page.getByLabel("Test verification").check();
  await submit.click();
  await expect(page.getByRole("status")).toContainText(
    "A confirmation email has been sent",
  );
});

test("unavailable backend keeps submission disabled", async ({ page }) => {
  await page.route("**/api/inquiry/status", (route) =>
    route.fulfill({ json: { available: false } }),
  );
  await page.goto("/#inquiry");
  await expect(
    page.getByText(/Online inquiries are currently unavailable/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Submit Inquiry" }),
  ).toBeDisabled();
});
