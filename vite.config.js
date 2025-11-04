import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 7006,
  },
  optimizeDeps: {
    include: ["@dnd-kit/core", "react-resizable"], // Explicitly include problematic dependencies
  },
});
