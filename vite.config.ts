import path from "path"

import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-note/",
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
