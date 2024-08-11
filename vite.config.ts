import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    eslint(),
    viteTsconfigPaths(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
});
