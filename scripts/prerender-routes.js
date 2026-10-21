// Runs after `react-scripts build`.
//
// GitHub Pages has no SPA fallback: every url except / used to answer
// 404 (404.html then bounced the visitor to the app), so search engines
// never indexed the inner pages and link previews were empty.
//
// This writes one copy of build/index.html per page, each with its own
// <title>, description and link-preview (Open Graph) tags, plus
// sitemap.xml. GitHub Pages serves /projects/halo-2021 from
// projects/halo-2021.html with a 200.
//
// Pages not known at build time (e.g. a project added in Contentful after
// the last deploy) still open through 404.html, as before.

const fs = require('fs')
const path = require('path')


const SITE = 'https://smarta.tech'
const BUILD = path.join(__dirname, '..', 'build')

// Same public, read-only Delivery API key as src/utils/contentful.tsx
const CONTENTFUL = 'https://cdn.contentful.com/spaces/3io89r4zv5gb/environments/master/entries'
  + '?access_token=vsp7sk6k8BIZqElpUm2agm3cN6a4H44OmRKGDSbCdX4&limit=1000&include=5'

const AUTHOR = 'Marta Shilova'
const SITE_NAME = 'Smarta'
const SITE_DESCRIPTION = "Marta Shilova, artiste de nouveaux médias et chercheuse à l'INREV "
  + '(Université Paris 8). Paysages visuels pour installations et performances, '
  + 'intégrant son, capteurs et interaction.'


// --- helpers -------------------------------------------------------------

const escapeHtml = text =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Same as src/utils/slugify.ts
const slugify = text =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Rich text document -> plain text (inline runs joined, blocks on new lines)
const INLINE_PARENTS = /^(paragraph|heading-\d|hyperlink|entry-hyperlink|asset-hyperlink)$/
const plainText = node => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.nodeType === 'text') return node.value || ''
  return (node.content || [])
    .map(plainText)
    .join(INLINE_PARENTS.test(node.nodeType) ? '' : '\n')
}

const oneLine = text => text.replace(/\s+/g, ' ').trim()

// Description text on one line. Line breaks often end a heading-like line
// with no punctuation ("… la voix\nBasé sur …"): they become sentence breaks.
const collapse = text =>
  oneLine(text.trim().replace(/([^\s.!?:;,…])[ \t]*\n\s*/g, '$1. '))

const truncate = (text, max = 160) => {
  if (text.length <= max) return text
  const cut = text.slice(0, text.lastIndexOf(' ', max - 1))
  return cut.replace(/[\s,;:.–-]+$/, '') + '…'
}

// 1200×630 crop, the size link previews expect
const previewImage = asset => {
  const url = asset?.fields?.file?.url
  return url && `https:${url}?w=1200&h=630&fit=fill&fm=jpg&q=80`
}

const yearOf = title => {
  const match = title.match(/\b(19|20)\d{2}\b/)
  return match ? parseInt(match[0], 10) : 0
}


// --- content -------------------------------------------------------------

const loadProjects = async () => {
  const response = await fetch(CONTENTFUL)
  if (!response.ok)
    throw new Error(`Contentful answered ${response.status}`)
  const data = await response.json()

  const byId = new Map([
    ...data.items,
    ...(data.includes?.Entry ?? []),
    ...(data.includes?.Asset ?? []),
  ].map(item => [item.sys.id, item]))
  const resolve = link => link?.sys?.id ? byId.get(link.sys.id) : undefined

  // Same set and order as the Projets page: projects of the sectionV2s
  const projects = data.items
    .filter(item => item.sys.contentType?.sys.id === 'sectionV2')
    .flatMap(section => (section.fields.projects ?? []).map(resolve))
    .filter(Boolean)

  return projects.map(project => {
    const fields = project.fields
    const title = oneLine(typeof fields.title === 'string' ? fields.title : plainText(fields.title))
    const blocks = (fields.blocks ?? []).map(resolve).filter(Boolean)

    const text = collapse(plainText(fields.description))
      || blocks.map(block => collapse(plainText(block.fields.text))).find(Boolean)
      || ''

    // Cover: first media asset, else the first image of any block
    const cover = resolve(fields.media?.[0])
      || blocks.map(block => resolve(block.fields.images?.[0])).find(Boolean)

    return {
      title,
      slug: (title && slugify(title)) || project.sys.id,
      description: truncate(text) || `${title} — projet de ${AUTHOR}.`,
      image: previewImage(cover),
      updatedAt: project.sys.updatedAt,
      year: yearOf(title),
    }
  })
}


// --- html ----------------------------------------------------------------

const headTags = page => [
  `<title>${escapeHtml(page.title)}</title>`,
  `<meta name="description" content="${escapeHtml(page.description)}"/>`,
  `<link rel="canonical" href="${SITE}${page.path}"/>`,
  `<meta property="og:type" content="${page.type || 'website'}"/>`,
  `<meta property="og:site_name" content="${SITE_NAME}"/>`,
  `<meta property="og:locale" content="fr_FR"/>`,
  `<meta property="og:url" content="${SITE}${page.path}"/>`,
  `<meta property="og:title" content="${escapeHtml(page.title)}"/>`,
  `<meta property="og:description" content="${escapeHtml(page.description)}"/>`,
  page.image && `<meta property="og:image" content="${escapeHtml(page.image)}"/>`,
  page.image && page.imageSize && `<meta property="og:image:width" content="${page.imageSize[0]}"/>`,
  page.image && page.imageSize && `<meta property="og:image:height" content="${page.imageSize[1]}"/>`,
  `<meta name="twitter:card" content="${page.image ? 'summary_large_image' : 'summary'}"/>`,
].filter(Boolean).join('')

// The template's own title/description (and tags from an earlier run, since
// index.html is itself rewritten) are replaced by the page's tags
const renderPage = (template, page) =>
  template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta name="(description|twitter:[^"]*)"[^>]*>/gi, '')
    .replace(/<meta property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<link rel="canonical"[^>]*>/gi, '')
    // function form: page text must not be read as `$&`-style patterns
    .replace('</head>', () => headTags(page) + '</head>')

const writeFile = (relativePath, content) => {
  const file = path.join(BUILD, relativePath)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}


// --- main ----------------------------------------------------------------

const main = async () => {
  const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8')
  const projects = await loadProjects()

  const newest = [...projects].sort((a, b) => b.year - a.year)[0]
  const portraitFile = fs.readdirSync(path.join(BUILD, 'static', 'media'))
    .find(name => /^contact\.[0-9a-f]+\.jpg$/.test(name))
  const portrait = portraitFile && `${SITE}/static/media/${portraitFile}`

  const projectImage = { image: newest?.image, imageSize: [1200, 630] }
  const portraitImage = { image: portrait }

  // `files`: where GitHub Pages looks for each url. /projects also gets
  // projects/index.html in case Pages prefers the projects/ folder.
  const pages = [
    {
      path: '/',
      files: ['index.html'],
      title: `${SITE_NAME} — ${AUTHOR}, artiste de nouveaux médias`,
      description: SITE_DESCRIPTION,
      ...projectImage,
    },
    {
      path: '/projects',
      files: ['projects.html', 'projects/index.html'],
      title: `Projets — ${AUTHOR}`,
      description: `Projets de ${AUTHOR} : performances, installations et design.`,
      ...projectImage,
    },
    {
      path: '/publications-talks',
      files: ['publications-talks.html'],
      title: `Recherche — ${AUTHOR}`,
      description: `Publications, conférences et activités académiques de ${AUTHOR}, `
        + "chercheuse à l'INREV (Université Paris 8).",
      ...portraitImage,
    },
    {
      path: '/about-contact',
      files: ['about-contact.html'],
      title: `Info — ${AUTHOR}`,
      description: `${AUTHOR} est artiste de nouveaux médias et chercheuse à l'INREV `
        + "(équipe Image Numérique et Réalité Virtuelle de l'Université Paris 8). Contact et réseaux.",
      ...portraitImage,
    },
    ...projects.map(project => ({
      path: `/projects/${project.slug}`,
      files: [`projects/${project.slug}.html`],
      title: `${project.title} — ${AUTHOR}`,
      description: project.description,
      type: 'article',
      image: project.image,
      imageSize: project.image && [1200, 630],
      updatedAt: project.updatedAt,
    })),
  ]

  const seen = new Set()
  pages.forEach(page => {
    if (seen.has(page.path))
      console.warn(`  ! two projects share the url ${page.path}`)
    seen.add(page.path)
    page.files.forEach(file => writeFile(file, renderPage(template, page)))
  })

  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + pages.map(page =>
      `  <url><loc>${SITE}${page.path}</loc>`
      + (page.updatedAt ? `<lastmod>${page.updatedAt.slice(0, 10)}</lastmod>` : '')
      + '</url>\n').join('')
    + '</urlset>\n'
  writeFile('sitemap.xml', sitemap)

  console.log(`Wrote ${pages.length} pages + sitemap.xml:`)
  pages.forEach(page => console.log(`  ${page.path}  →  ${page.files.join(', ')}`))
}


main().catch(error => {
  console.error('prerender-routes failed:', error.message)
  process.exit(1)
})
