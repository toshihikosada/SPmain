import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.jsx', '.js', '.ts', '.tsx', '.json'],
  },
  esbuild: {
    jsxInject: "import React from 'react'",
  },
})
