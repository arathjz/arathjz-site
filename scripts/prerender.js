import { readdir, readFile, mkdir, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import { createServer } from 'http'
import { readFileSync } from 'fs'
import puppeteer from 'puppeteer'

const DIST = resolve('dist')
const CONTENT_DIR = resolve('content/blog')

async function getBlogSlugs() {
  const files = await readdir(CONTENT_DIR)
  const slugs = []
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const raw = await readFile(join(CONTENT_DIR, file), 'utf-8')
    const match = raw.match(/^slug:\s*(.+)$/m)
    if (match) slugs.push(match[1].trim())
  }
  return slugs
}

function serveStatic(dir, port) {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let filePath = join(dir, req.url === '/' ? 'index.html' : req.url)
      try {
        const data = readFileSync(filePath)
        const ext = filePath.split('.').pop()
        const types = { html: 'text/html', js: 'application/javascript', css: 'text/css', png: 'image/png', svg: 'image/svg+xml', json: 'application/json' }
        res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
        res.end(data)
      } catch {
        const html = readFileSync(join(dir, 'index.html'))
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
      }
    })
    server.listen(port, () => resolvePromise(server))
  })
}

async function prerender() {
  const port = 4173
  const server = await serveStatic(DIST, port)

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  const slugs = await getBlogSlugs()
  const routes = ['/', ...slugs.map(s => `/blog/${s}`)]

  console.log(`Prerendering ${routes.length} routes...`)

  for (const route of routes) {
    await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' })

    const html = await page.content()

    const dir = route === '/' ? DIST : join(DIST, ...route.split('/').filter(Boolean))
    await mkdir(dir, { recursive: true })
    const outFile = route === '/' ? join(DIST, 'index.html') : join(dir, 'index.html')
    await writeFile(outFile, html)
    console.log(`  ✓ ${route}`)
  }

  await browser.close()
  server.close()
  console.log('Done!')
}

prerender()
