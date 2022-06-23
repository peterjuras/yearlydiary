import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "http://localhost:9234",
  },
  webServer: {
    command: "yarn setup-e2e-tests",
    url: "http://localhost:9234/",
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
