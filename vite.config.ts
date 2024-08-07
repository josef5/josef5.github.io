import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/josef5.github.io/josef5.github.io/",
  plugins: [react()],
});
