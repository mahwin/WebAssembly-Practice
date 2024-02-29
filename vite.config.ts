import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { comlink } from "vite-plugin-comlink";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [react(), comlink(), wasm(), topLevelAwait()],
  worker: {
    plugins: () => [comlink()],
  },
  resolve: {
    alias: {
      "@wasm": "/src/wasm",
    },
  },
});
