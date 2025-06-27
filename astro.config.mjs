import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://rysthdesign.com",
  integrations: [ react(), sitemap()], // Remove tailwind() from here
  vite: {
    plugins: [tailwindcss()],
  },
});
