import BLOG from "@/blog.config";
import Image from "next/image";

export default function Custom404() {
  return (
    <div
      id="out"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        id="text"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="text-gray-600 dark:text-gray-400"
      >
        <div style={{ paddingBottom: "2em" }}>
          <a
            href={BLOG.aboutLink}
            className="text-xl"
            style={{ textDecoration: "underline" }}
          >
            About Me
          </a>{" "}
          -{" "}
          <a
            href={BLOG.link}
            className="text-xl"
            style={{ textDecoration: "underline" }}
          >
            Blog
          </a>
        </div>
        <div style={{ paddingBottom: "2em" }}>
          <Image
            src="https://res.cloudinary.com/dheqbiqti/image/upload/v1679284720/theo.png"
            alt="my cat theo"
            width={380}
            height={380}
          ></Image>
        </div>
        <div className="flex flex-col items-center text-center">
          <p>404 - Page Not Found 😬</p>
          <p>{"Looks like you've reached a dead end :("}</p>
          <p>
            If I have a link out of date, please let me know @
            mitchinson.dev@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
