import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "https://multiple-increase-output-august.trycloudflare.com",
      "reaching-southwest-speakers-partial.trycloudflare.com",
    ], // testing Cloudflare tunnel host here
  },
});
