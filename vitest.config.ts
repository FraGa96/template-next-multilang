import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Transforms *.svg imports into a minimal React component stub so jsdom
// doesn't receive a data URI where a React component is expected.
const svgMockPlugin = {
  name: 'svg-mock',
  enforce: 'pre' as const,
  transform(_code: string, id: string) {
    if (!id.endsWith('.svg')) return null
    return `import React from 'react';
const SvgMock = (props) => React.createElement('svg', { 'data-testid': 'svg-icon', ...props });
export default SvgMock;`
  },
}

export default defineConfig({
  plugins: [svgMockPlugin, react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
