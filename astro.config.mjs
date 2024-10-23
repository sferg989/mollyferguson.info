import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://mollyferguson.info',
  integrations: [mdx(), sitemap()],
  image: {
    remotePatterns: [{ protocol: 'https' }]
  }
})
