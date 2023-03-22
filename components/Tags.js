import Link from "next/link";

const Tags = ({ tags, currentTag }) => {
  if (!tags) return null;
  return (
    <div className="tag-container">
      <ul className="flex max-w-full mt-4 overflow-x-auto">
        {Object.keys(tags).map((tag) => {
          const selected = tag === currentTag;
          return (
            <li
              key={tag}
              className={`mr-3 font-medium border whitespace-nowrap dark:text-gray-300 ${
                selected
                  ? "text-white bg-black border-black dark:bg-gray-600 dark:border-gray-600"
                  : "bg-gray-100 border-gray-100 text-gray-400 dark:bg-night dark:border-gray-800"
              }`}
            >
              <Link
                key={tag}
                href={selected ? "/search" : `/tag/${encodeURIComponent(tag)}`}
              >
                <a className="px-4 py-2 block">{`${tag} (${tags[tag]})`}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
