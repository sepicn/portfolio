import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: '/', // << ovo je ključno
  plugins: [react()],
})
