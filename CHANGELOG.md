# Changelog

## 1.3.1 - 2026-05-31

### Fixed

- Restored builds after a Notion public API response shape change broke the old Nobelium template integration.
- Normalized Notion record-map entries that now arrive nested as `record.value.value` so the rest of the app can continue reading `record.value` as expected.
- Replaced the hardcoded Notion tags property id (`Ijxl`) with a dynamic lookup for the `tags` / `multi_select` schema property. This keeps the blog from depending on an unstable internal Notion property id.
- Added a fallback collection-view fetch path for cases where `notion-client` does not populate `collection_query` from the initial page response.
- Skips collection page ids that Notion reports but does not include in the returned block map, preventing static generation crashes.
- Added a postbuild verification script that fails the build if expected prerendered routes, including `/letters`, `/homelab-summer-2026`, `/blog-2023`, and `/con`, are missing from the Next output, if the total prerendered route count unexpectedly drops, or if the homepage prerenders with zero posts.
- Fixed the fallback collection-data merge so fetched Notion blocks are added to the existing record map used by page generation.
- Added a build-time `getAllPosts` promise cache so pagination, tag, and post path generation reuse the same Notion database fetch instead of repeatedly hitting Notion and causing 429 failures.
- Added narrow retry/backoff handling for transient Notion 429/5xx responses during database and post block fetches.
- Normalized Notion record maps for individual post pages as well as the database listing, fixing prerender errors in `react-notion-x`.

### Notes

The Notion database schema itself was still valid and aligned with the Nobelium template. The failure was caused by drift in Notion's API response format against this older unmaintained template, not by missing blog content.
