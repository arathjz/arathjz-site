import { getAllPosts } from "~/lib/posts.server";

export async function loader() {
  const posts = await getAllPosts();
  const baseUrl = "https://arathjz.com";

  const urls = [
    { loc: baseUrl, priority: "1.0" },
    { loc: `${baseUrl}/about`, priority: "0.8" },
    { loc: `${baseUrl}/blog`, priority: "0.8" },
    ...posts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.date,
      priority: "0.7",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""}
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
