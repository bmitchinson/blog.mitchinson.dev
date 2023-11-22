import { getAllPosts, getAllTagsFromPosts } from "@/lib/notion";
import SearchLayout from "@/layouts/search";
import { showDraftsMode } from "@/lib/utils/helpers";

export default function search({ tags, posts }) {
  return <SearchLayout tags={tags} posts={posts} />;
}
export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);
  return {
    props: {
      tags,
      posts,
    },
    revalidate: showDraftsMode ? 1 : undefined,
  };
}
