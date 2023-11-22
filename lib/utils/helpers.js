// duplicated in blog.js
export const showDraftsMode =
  process.env.NODE_ENV === "development" ||
  process.env.DRAFT_MODE === "enabled";
