import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const _dirname = dirname(fileURLToPath(import.meta.url));


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.join(_dirname, "/src") }],
  },
  plugins: [react()],
})
