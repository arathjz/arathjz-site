import { readdir, readFile, mkdir, writeFile } from 'fs/promises'
import { join, resolve } from 'path'
import fm from 'front-matter'

const DIST = resolve('dist')
const CONTENT_DIR = resolve('content/blog')

async function getBlogPosts() {
  const files = await readdir(CONTENT_DIR)
  const posts = []
  for (const file of files) {
    if (!file.endsWith('.md')) continue
    const raw = await readFile(join(CONTENT_DIR, file), 'utf-8')
    const { attributes } = fm(raw)
    posts.push(attributes)
  }
  return posts
}

function injectMeta(html, { title, description }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
}

async function prerender() {
  const baseHtml = await readFile(join(DIST, 'index.html'), 'utf-8')
  const posts = await getBlogPosts()

  const routes = [
    {
      path: '/blog',
      title: 'Blog — Arath Jimenez',
      description: 'Posts on software engineering, AI, and more.',
    },
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      title: `${p.title} — Arath Jimenez`,
      description: p.description,
    })),
  ]

  console.log(`Prerendering ${routes.length} routes...`)

  for (const route of routes) {
    const html = injectMeta(baseHtml, route)
    const dir = join(DIST, ...route.path.split('/').filter(Boolean))
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), html)
    console.log(`  ✓ ${route.path}`)
  }

  console.log('Done!')
}

prerender()
