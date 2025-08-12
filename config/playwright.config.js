import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "../tests",
  timeout: 90000,
  retries: 0,
  reporter: [
    ["html", { outputFolder: "../reports/playwright-report", open: "never" }],
    ["junit", { outputFile: "../reports/playwright-report/test-results.xml" }],
  ],
  outputDir: "../reports/test-results",
  use: {
    headless: true,
    viewport: { width: 1366, height: 768 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  },
});
