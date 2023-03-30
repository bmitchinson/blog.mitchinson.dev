import Layout from "@/layouts/layout";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import BLOG from "@/blog.config";
import { createHash } from "crypto";

const BlogPost = ({ post, blockMap, emailHash }) => {
  if (!post) return null;
  return (
    <Layout
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      fullWidth={post.fullWidth}
    />
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts({ includePages: true });
  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const path = slug.reduce((p, c) => `${p}/${c}`);
  // refactor: can we fetch by slug? instead of fetching all posts?
  const posts = await getAllPosts({ includePages: true });
  const post = posts.find((t) => t.slug === path);
  if (!post) {
    // 404.js
    return {
      notFound: true,
    };
  }
  const blockMap = await getPostBlocks(post.id);
  const emailHash = createHash("md5")
    .update(BLOG.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1,
  };
}

export default BlogPost;