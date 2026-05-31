# Changelog

## 1.3.1 - 2026-05-31

### Fixed

- Restored builds after a Notion public API response shape change broke the old Nobelium template integration.
- Normalized Notion record-map entries that now arrive nested as `record.value.value` so the rest of the app can continue reading `record.value` as expected.
- Replaced the hardcoded Notion tags property id (`Ijxl`) with a dynamic lookup for the `tags` / `multi_select` schema property. This keeps the blog from depending on an unstable internal Notion property id.
- Added a fallback collection-view fetch path for cases where `notion-client` does not populate `collection_query` from the initial page response.
- Skips collection page ids that Notion reports but does not include in the returned block map, preventing static generation crashes.
- Added a postbuild verification script that fails the build if expected prerendered routes, including `/letters`, are missing from the Next output, or if the homepage prerenders with zero posts.
- Fixed the fallback collection-data merge so fetched Notion blocks are added to the existing record map used by page generation.
- Normalized Notion record maps for individual post pages as well as the database listing, fixing prerender errors in `react-notion-x`.
- Limited build-time post prerendering to the required `/letters` smoke-test route while keeping `fallback: true` for all other posts, reducing Notion API pressure during builds.
- Added retry/backoff handling for Notion 429 and 5xx responses.

### Notes

The Notion database schema itself was still valid and aligned with the Nobelium template. The failure was caused by drift in Notion's API response format against this older unmaintained template, not by missing blog content.
