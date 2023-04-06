// import BLOG from '@/blog.config'
const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const isPostViewableDev = (post) => post.title && post.slug;

const isPostViewableProd = (post, postDate) =>
  isPostViewableDev(post) &&
  post?.status?.[0] === "Published" &&
  postDate < tomorrow;

export default function filterPublishedPosts({ posts, includePages }) {
  const inDevMode = process.env.NODE_ENV === "development";
  if (!posts || !posts.length) return [];
  const publishedPosts = posts
    .filter((post) =>
      includePages
        ? post?.type?.[0] === "Post" || post?.type?.[0] === "Page"
        : post?.type?.[0] === "Post"
    )
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      return inDevMode
        ? isPostViewableDev(post)
        : isPostViewableProd(post, postDate);
    });
  return publishedPosts;
}
