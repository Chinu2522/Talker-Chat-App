import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

      //esliient-disable-next-line no undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
