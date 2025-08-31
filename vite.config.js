import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["https://cv.vlad-yurev-06.workers.dev/", "vladika.net"], // testing Cloudflare tunnel host here
  },
});
