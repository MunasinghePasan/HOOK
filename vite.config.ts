import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api":
        "http://127.0.0.1:" +
        (process.env.HOOK_DEV_API_PORT || process.env.PORT || "3001"),
    },
  },
});
