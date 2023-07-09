# 📝 My Blog - [Link](https://blog.mitchinson.dev)

![](/screenshot.png)

Posts written in Notion and then pulled from database api and rendered with
react-notion-x. Source notion database [is here](https://bmitchinson.notion.site/9315f6e9736747a48431a5a3eb326c28?v=d1bfebbd34cb4f218416b31bd43548db).

Recent posts are also shown in my [github bio](https://github.com/bmitchinson), and on [my website](https://mitchinson.dev).

## Fork details

- Fork of [nobelium](https://github.com/craigary/nobelium)
- Original [readme](/nobelium_readme.md)

### Site Additions:

- Ensure that videos autoplay on blog posts.
- Fix responsive video + image sizes based on notion width.
- Add post color reflective keyword tags to index, pages, and search.
- Adds a 404 page
  - Before 404ing a route that didn't exist during the last build,
    vercel will check that notion doesn't now have the page.
- Improve code block styles
- Add rotating emojis to the title bar
- Add home button
- NextImage preview blurs for lazy loading image assets
- Remove "re-render all pages every 1 second" in favor of auto-rebuilding
  elsewhere when notion posts change.
  - Fixes link clicks taking several seconds to reach out to notion to load

### Tooling Additions:

- Move to npm
- Add prettier + eslint config
- Remove preact usage (broken in some places)
- Remove google analytics
- Remove broken rss feed
- When running locally, draft pages and posts will be shown.

## Notes

- Rebuilt with an action in [bmitchinson/bmitchinson](github.com/bmitchinson/bmitchinson)
  triggering a build depending on recent page edits.
  - [How to trigger a build](https://benborgers.com/posts/vercel-schedule)
