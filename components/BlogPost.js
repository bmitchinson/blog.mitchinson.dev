import Link from "next/link";
import BLOG from "@/blog.config";
import formatDate from "@/lib/formatDate";
import TagItem from "./TagItem";

const BlogPost = ({ post }) => {
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <a>
        <article key={post.id} className="mb-6 md:mb-8">
          <header className="flex flex-col justify-between md:flex-row md:items-baseline">
            <h2 className="text-lg md:text-xl font-bold mb-2 cursor-pointer text-black dark:text-gray-100">
              {post.title}
            </h2>
            <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
              {formatDate(
                post?.date?.start_date || post.createdTime,
                BLOG.lang
              )}
            </time>
          </header>
          <main>
            <p className="leading-8 text-gray-700 dark:text-gray-300">
              {post.summary}
            </p>
            {post.tags && (
              <div
                className="tag-color flex flex-row flex-wrap"
                style={{
                  paddingTop: ".5em",
                  rowGap: ".7em",
                  columnGap: ".3em",
                }}
              >
                {post.tags.map(({ tag, color }, i) => (
                  <TagItem tag={tag} color={color} key={`${post.id}-${i}`} />
                ))}
              </div>
            )}
          </main>
        </article>
      </a>
    </Link>
  );
};

export default BlogPost;
