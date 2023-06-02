import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import viteConfig from "./vite.config";

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on("file:preprocessor", vitePreprocessor());
    },
    viteConfig,
  },
});
