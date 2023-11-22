import { getAllPosts, getAllTagsFromPosts } from "@/lib/notion";
import SearchLayout from "@/layouts/search";
import { showDraftsMode } from "@/lib/utils/helpers";

export default function Tag({ tags, posts, currentTag }) {
  return <SearchLayout tags={tags} posts={posts} currentTag={currentTag} />;
}

export async function getStaticProps({ params }) {
  const currentTag = params.tag;
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);
  const filteredPosts = posts.filter(
    (post) =>
      post && post.tags && post.tags.map(({ tag }) => tag).includes(currentTag)
  );
  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
    },
    revalidate: showDraftsMode ? 1 : undefined,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);
  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true,
  };
}
