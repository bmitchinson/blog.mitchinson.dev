# AGENTS.md

Guidance for future coding agents working on this repo.

## App context

This is an older Next.js/Nobelium blog that renders content from a public Notion database using `notion-client`, `notion-utils`, and `react-notion-x`.

The app is sensitive to undocumented Notion API response-shape drift. A recent breakage happened because Notion records that the template expected as:

```js
record.value.schema
```

started arriving as:

```js
record.value.value.schema
```

The fix is to normalize Notion record maps before reading them. Do not remove `lib/notion/normalizeRecordMap.js` or its use in:

- `lib/notion/getAllPosts.js`
- `lib/notion/getPostBlocks.js`

`getAllPosts` also uses a small module-level promise cache. Keep it unless replacing it with an equivalent cache. The fallback collection-view fetch adds extra Notion API calls, and without caching every pagination/tag/page static render can refetch the same database data and trigger Notion 429s during Vercel builds. This exact failure was seen on Vercel while prerendering tag pages such as `/tag/python`.

Notion requests are wrapped with `lib/notion/notionRetry.js` to retry transient 429/5xx responses. This is intentionally narrow: it does not change which pages are rendered or defer pages to runtime; it only prevents temporary Notion rate limits from failing otherwise-valid static builds. Do not remove retry/backoff just because a local build passes; Vercel may have different timing/concurrency and can hit 429s that are hard to reproduce locally.

The Notion database schema was not the problem. The internal Notion property id `Ijxl` maps to the plaintext `tags` multi-select property, but internal property ids are unstable and should not be hardcoded. Use dynamic schema lookup by property name/type instead.

## Node version

Use Node 22 when working on this app:

```sh
nvm use 22
```

Vercel is also configured through `package.json` engines for Node 22.x.

## Important build/check behavior

`npm run build` runs:

```sh
next build
```

and then `postbuild` runs:

```sh
next-sitemap --config next-sitemap.config.js && npm run check-build-output
```

The output check lives at:

```txt
scripts/check-build-output.js
```

It intentionally verifies that the build output contains real prerendered content, not merely that Next compiled successfully.

Current checks include:

- required prerendered routes:
  - `/`
  - `/letters`
  - `/homelab-summer-2026`
  - `/blog-2023`
  - `/con`
- minimum prerendered route count: `60`
- homepage data exists
- homepage has posts
- homepage includes expected posts such as `letters` and `homelab-summer-2026`
- Next page manifest includes `/` and `/[...slug]`

These checks exist because a prior change made only `/letters` prerender at build time and pushed the rest of the blog to runtime fallback generation. That made Vercel builds pass, but production post pages failed with `/_next/data/... 500` when runtime Notion fetches failed.

These checks do not protect against every possible Notion 429 by themselves. The build also depends on the `getAllPosts` cache and `notionRetry` wrapper described above. Do not weaken these checks unless replacing them with equivalent or stronger coverage.

## Avoid these mistakes

Do not change `pages/[...slug].js` to prerender only one canary route like this:

```js
paths: posts.filter((row) => row.slug === 'letters')
```

That can make the build pass while breaking most real post pages in production. The app should prerender all known post/page slugs returned by `getAllPosts({ includePages: true })`.

Also do not “simplify” away the cache/retry path after seeing a successful local build. Vercel builds can fail later with Notion 429s on tag or pagination pages if every static render refetches the Notion database independently.

## Before pushing/deploying

Run:

```sh
nvm use 22
npm run build
```

If the build passes, also test a production-mode server when possible:

```sh
npm run start
```

Then manually check at least:

- `/`
- `/letters`
- `/homelab-summer-2026`
- `/blog-2023`

For Vercel, prefer checking the preview deployment before promoting to production.

## Notion API notes

- Avoid hardcoded Notion collection/property ids where possible.
- Normalize record maps before reading nested fields.
- Be careful with changes that increase runtime or repeated build-time Notion calls. Runtime failures are more user-visible than build failures, and repeated build-time calls can cause Vercel 429 failures.
- If adding Notion API calls inside `getStaticProps` / `getStaticPaths`, consider whether they can reuse cached data instead of refetching per route.
- If the homepage has no posts, treat that as a failed build/deploy even if `next build` technically succeeds.
