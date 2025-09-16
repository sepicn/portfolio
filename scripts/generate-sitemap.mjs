import { writeFile } from "fs/promises"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const baseUrl = "https://sepic.me/"
const sitemapEntries = [
  {
    path: "/",
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    path: "/CV.pdf",
    changefreq: "yearly",
    priority: "0.8",
  },
]

const today = new Date().toISOString()

const urlset = sitemapEntries
  .map(({ path, changefreq, priority }) => {
    const url = new URL(path, baseUrl).toString()

    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join("\n")

const sitemapContent =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`

const outputPath = resolve(__dirname, "../public/sitemap.xml")

await writeFile(outputPath, sitemapContent, "utf8")

console.log(`Sitemap generated at ${outputPath}`)
