const fs = require('fs')
const path = require('path')

// These routes are content smoke tests, not just framework smoke tests.
// If a future change only prerenders one canary page and pushes the rest of
// the blog to runtime fallback generation, these checks should fail the build.
const requiredPrerenderedRoutes = [
  '/',
  '/letters',
  '/homelab-summer-2026',
  '/blog-2023',
  '/con'
]
const requiredHomepageSlugs = ['letters', 'homelab-summer-2026']
const minimumPrerenderedRouteCount = 60

const nextDir = path.join(process.cwd(), '.next')
const homepageDataPath = path.join(nextDir, 'server', 'pages', 'index.json')
const prerenderManifestPath = path.join(nextDir, 'prerender-manifest.json')
const pagesManifestPath = path.join(nextDir, 'server', 'pages-manifest.json')

function fail(message) {
  console.error(`\nBuild output check failed: ${message}`)
  process.exit(1)
}

if (!fs.existsSync(nextDir)) {
  fail('missing .next directory; run `next build` first')
}

if (!fs.existsSync(prerenderManifestPath)) {
  fail('missing .next/prerender-manifest.json')
}

if (!fs.existsSync(pagesManifestPath)) {
  fail('missing .next/server/pages-manifest.json')
}

const prerenderManifest = JSON.parse(
  fs.readFileSync(prerenderManifestPath, 'utf8')
)
const pagesManifest = JSON.parse(fs.readFileSync(pagesManifestPath, 'utf8'))
const prerenderedRoutes = Object.keys(prerenderManifest.routes || {})

if (prerenderedRoutes.length < minimumPrerenderedRouteCount) {
  fail(
    `expected at least ${minimumPrerenderedRouteCount} prerendered routes, ` +
      `but found ${prerenderedRoutes.length}. This usually means post pages ` +
      `were accidentally moved from build-time generation to runtime fallback.`
  )
}

for (const route of requiredPrerenderedRoutes) {
  if (!prerenderedRoutes.includes(route)) {
    const relatedRoutes = prerenderedRoutes.filter(
      (r) =>
        r === '/' ||
        requiredPrerenderedRoutes.some((required) =>
          r.includes(required.slice(1))
        )
    )

    fail(
      `expected prerendered route "${route}" was not found. ` +
        `Found related routes: ${relatedRoutes.length ? relatedRoutes.join(', ') : '(none)'}`
    )
  }
}

if (!fs.existsSync(homepageDataPath)) {
  fail('missing prerendered homepage data at .next/server/pages/index.json')
}

const homepageData = JSON.parse(fs.readFileSync(homepageDataPath, 'utf8'))
const homepagePosts = homepageData.pageProps?.postsToShow || []

if (!homepagePosts.length) {
  fail('homepage prerendered successfully but contains zero posts')
}

for (const slug of requiredHomepageSlugs) {
  if (!homepagePosts.some((post) => post.slug === slug)) {
    fail(`homepage posts do not include the expected \`${slug}\` post`)
  }
}

if (!pagesManifest['/'] || !pagesManifest['/[...slug]']) {
  fail('expected Next page entries for "/" and "/[...slug]" were not found')
}

console.log(
  `Build output check passed: found ${prerenderedRoutes.length} prerendered routes, ` +
    `required routes ${requiredPrerenderedRoutes.join(', ')}, and ` +
    `${homepagePosts.length} homepage posts`
)
