import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://subprocess-hub.com",
  output: "static",
  integrations: [
    react(),
    tailwind(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
