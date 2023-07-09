import Image from "next/image";
import Container from "@/components/Container";
import TagItem from "@/components/TagItem";
import { NotionRenderer } from "react-notion-x";
import BLOG from "@/blog.config";
import formatDate from "@/lib/formatDate";
import { useLocale } from "@/lib/locale";
import { useRouter } from "next/router";
import Comments from "@/components/Comments";
import Link from "next/link";
import dynamic from "next/dynamic";
import TweetEmbed from "react-tweet-embed";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

const mapPageUrl = (id) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

const Tweet = ({ id }) => {
  return <TweetEmbed tweetId={id} />;
};

const Layout = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  fullWidth = false,
}) => {
  const locale = useLocale();
  const router = useRouter();
  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <article>
        <h1 className="font-bold text-3xl text-black dark:text-white">
          {frontMatter.title}
        </h1>
        {frontMatter.type[0] !== "Page" && (
          <>
            <div
              className="tag-color flex flex-row flex-wrap"
              style={{
                paddingTop: ".9em",
                rowGap: ".7em",
                columnGap: ".3em",
              }}
            >
              {frontMatter.tags &&
                frontMatter.tags.map(({ tag, color }) => (
                  <TagItem key={tag} tag={tag} color={color} />
                ))}
            </div>
            <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
              <div className="flex mb-4">
                <a href={BLOG.socialLink || "#"} className="flex">
                  <Image
                    alt={BLOG.author}
                    width={24}
                    height={24}
                    src={`https://gravatar.com/avatar/${emailHash}`}
                    className="rounded-full"
                  />
                  <p className="ml-2 md:block">{BLOG.author}</p>
                </a>
                <span className="block">&nbsp;/&nbsp;</span>
              </div>
              <div className="mr-2 mb-4 md:ml-0">
                {formatDate(
                  frontMatter?.date?.start_date || frontMatter.createdTime,
                  BLOG.lang
                )}
              </div>
            </nav>
          </>
        )}
        {children}
        {blockMap && (
          <div className="-mt-4">
            <NotionRenderer
              recordMap={blockMap}
              previewImages={true}
              // https://github.com/NotionX/react-notion-x/blob/2a48b29554b4ecf3cf49db808c8660726717e255/examples/full/components/NotionPage.tsx#L166
              components={{
                Code,
                Collection,
                nextLink: Link,
                nextImage: Image,
                Tweet,
              }}
              mapPageUrl={mapPageUrl}
            />
          </div>
        )}
      </article>
      <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
        <a>
          <button
            onClick={() => router.push(BLOG.path || "/")}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ← {locale.POST.BACK}
          </button>
        </a>
        <a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ↑ {locale.POST.TOP}
          </button>
        </a>
      </div>
      <Comments frontMatter={frontMatter} />
    </Container>
  );
};

export default Layout;
