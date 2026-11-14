import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

let buildOutputDirectory

const githubPagesFallback = {
  name: 'github-pages-fallback',
  apply: 'build',
  configResolved(config) {
    buildOutputDirectory = config.build.outDir
  },
  async closeBundle() {
    await copyFile(
      resolve(buildOutputDirectory, 'index.html'),
      resolve(buildOutputDirectory, '404.html'),
    )
  },
}

export default defineConfig({
  plugins: [react(), githubPagesFallback],
  base: process.env.GITHUB_ACTIONS === 'true' ? '/portfolio/' : '/',
})
