const fs = require('fs')
const path = require('path')

const requiredRoutes = ['/', '/letters']
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

const prerenderManifest = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf8'))
const pagesManifest = JSON.parse(fs.readFileSync(pagesManifestPath, 'utf8'))
const prerenderedRoutes = Object.keys(prerenderManifest.routes || {})

for (const route of requiredRoutes) {
  if (!prerenderedRoutes.includes(route)) {
    const matchingRoutes = prerenderedRoutes.filter((r) =>
      r === '/' || r.includes('letters')
    )

    fail(
      `expected prerendered route "${route}" was not found. ` +
        `Found related routes: ${matchingRoutes.length ? matchingRoutes.join(', ') : '(none)'}`
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

if (!homepagePosts.some((post) => post.slug === 'letters')) {
  fail('homepage posts do not include the expected `letters` post')
}

if (!pagesManifest['/'] || !pagesManifest['/[...slug]']) {
  fail('expected Next page entries for "/" and "/[...slug]" were not found')
}

console.log(
  `Build output check passed: found required routes ${requiredRoutes.join(
    ', '
  )} and ${homepagePosts.length} homepage posts`
)
