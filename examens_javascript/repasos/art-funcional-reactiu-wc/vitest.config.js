import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['src/__tests__/*.test.js'],
    environment: 'jsdom',
  },
})
