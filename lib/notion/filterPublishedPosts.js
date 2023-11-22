import { showDraftsMode } from "../utils/helpers";

// import BLOG from '@/blog.config'
const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const isPostViewableAsDraft = (post) => post.title && post.slug;

const isPostViewableAsPublished = (post, postDate) =>
  isPostViewableAsDraft(post) &&
  post?.status?.[0] === "Published" &&
  // note: this allows for scheduled posts, but I think the "refresh" API call
  //   would still need to be run. Checking for newly enabled scheduled posts
  //   would need to be added to bmitchinson/bmitchinson
  postDate < tomorrow;

export default function filterPublishedPosts({ posts, includePages }) {
  if (!posts || !posts.length) return [];
  const publishedPosts = posts
    .filter((post) =>
      includePages
        ? post?.type?.[0] === "Post" || post?.type?.[0] === "Page"
        : post?.type?.[0] === "Post"
    )
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      return showDraftsMode
        ? isPostViewableAsDraft(post)
        : isPostViewableAsPublished(post, postDate);
    });
  return publishedPosts;
}
