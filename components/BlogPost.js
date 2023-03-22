import Link from "next/link";
import BLOG from "@/blog.config";
import formatDate from "@/lib/formatDate";

// todo: clicking tag takes to tag search
// todo: tags show in post view as well

const BlogPost = ({ post }) => {
  // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  const colorVariants = {
    default: "text-gray-600 bg-gray-200", // lightgray
    gray: "text-neutral-600 bg-neutral-200",
    brown: "text-brown-600 bg-brown-200",
    orange: "text-orange-600 bg-orange-200",
    yellow: "text-yellow-600 bg-yellow-200",
    green: "text-green-600 bg-green-200",
    blue: "text-blue-600 bg-blue-200",
    purple: "text-purple-600 bg-purple-200",
    pink: "text-pink-600 bg-pink-200",
    red: "text-red-600 bg-red-200",
  };

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
                  <span
                    key={`${post.id}-${i}`}
                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded ${colorVariants[color]} uppercase last:mr-0 mr-1`}
                  >
                    {/* https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels */}
                    {tag}
                  </span>
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
