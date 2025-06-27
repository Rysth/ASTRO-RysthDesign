import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rysthdesign.com",
  integrations: [react(), sitemap()], // Remove tailwind() from here
  vite: {
    ssr: {
      noExternal: ["react-icons"],
    },
  },
});
