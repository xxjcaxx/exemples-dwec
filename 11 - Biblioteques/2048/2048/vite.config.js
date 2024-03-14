// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),
      name: '2048',
      // the proper extensions will be added
      fileName: (format) => `2048.${format}.js`,
    },
    minify: false,
   
  },
})