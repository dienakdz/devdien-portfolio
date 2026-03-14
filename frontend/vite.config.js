import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createStructuredData, getDefaultSeo, resolveSiteUrl } from './scripts/seo.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, __dirname, ''), ...process.env }
  const siteUrl = resolveSiteUrl(env)
  const seo = getDefaultSeo(siteUrl)
  const structuredData = JSON.stringify(createStructuredData(siteUrl))

  return {
    root: __dirname,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-seo-html',
        transformIndexHtml(html) {
          return html
            .replaceAll('__SEO_TITLE__', seo.title)
            .replaceAll('__SEO_DESCRIPTION__', seo.description)
            .replaceAll('__SEO_KEYWORDS__', seo.keywords)
            .replaceAll('__SEO_SITE_URL__', siteUrl)
            .replaceAll('__SEO_IMAGE_URL__', seo.imageUrl)
            .replaceAll('__SEO_SCHEMA__', structuredData)
        },
      },
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
    },
  }
})
