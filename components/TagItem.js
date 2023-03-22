import BLOG from "@/blog.config";
import Link from "next/link";

const TagItem = ({ tag, color }) => {
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
    <Link href={`${BLOG.path}/tag/${tag}`}>
      <span
        className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded ${colorVariants[color]} uppercase last:mr-0 mr-1`}
        style={{ cursor: "pointer" }}
      >
        {/* https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/labels */}
        {tag}
      </span>
    </Link>
  );
};

export default TagItem;
