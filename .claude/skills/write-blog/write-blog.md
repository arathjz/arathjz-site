---
name: write-blog
description: Create a new blog post with frontmatter and markdown template. Use when the user wants to write a new blog post.
---

# Write Blog Post

Create a new markdown blog post in the `content/blog/` directory.

## Steps

1. **Ask for the title.** Ask the user: "What's the title of your blog post?"

2. **Propose a slug.** Derive a slug from the title: lowercase, replace spaces with hyphens, remove special characters, trim to ~60 chars. Present it to the user: "Proposed slug: `{slug}` — want to use this or change it?"

3. **Ask for a description.** Ask: "Give me a one-sentence description (used in the blog listing and SEO)."

4. **Ask for tags (optional).** First, read existing posts in `content/blog/` to find all tags currently in use. Present them to the user: "Existing tags: `#tag1`, `#tag2`, ... — pick any of these or add new ones (comma-separated). Or skip."

5. **Create the file.** Write `content/blog/{slug}.md` with this template:

```markdown
---
title: "{title}"
slug: {slug}
date: {YYYY-MM-DD of today}
tags: [{comma-separated tags}]
description: "{description}"
---

Start writing here...
```

6. **Confirm.** Tell the user the file was created at `content/blog/{slug}.md` and that they can start writing. The dev server will hot-reload to show the post.
