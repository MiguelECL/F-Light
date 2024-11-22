import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Define port that the app will use on preview
  
  server:{
    host: true, // host: true exposes the project in public address
    port: 8000
  },
  preview:{
    host: true,
    port: 8000,
  },
  define:{
    "import.meta.vitest": "undefined"
  },
  plugins: [react()],
  test:{
    globals: true,
    environment: "jsdom",
    coverage:{
      reporter:["text", "html"]
    }
  }
})
