import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Bind to all interfaces so Docker can access the port
    port: 5173, // Default Vite port
    watch: {
      usePolling: true, // Ensure polling is used for file changes
    },
  },
  plugins: [react()],
});
