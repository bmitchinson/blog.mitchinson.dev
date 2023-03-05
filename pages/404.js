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
          <Image
            src="https://res.cloudinary.com/dheqbiqti/image/upload/v1677985300/BenMitchinson.com/theo_404.png"
            alt="my cat theo"
          ></Image>
        </div>
        <p>404 - Page Not Found 😬</p>
        <p>{"Looks like you've reached a dead end :("}</p>
        <p>
          If I have a link out of date, please let me know @
          mitchinson.dev@gmail.com
        </p>
        <div>
          <a href={BLOG.aboutLink} style={{ textDecoration: "underline" }}>
            About Me
          </a>{" "}
          -{" "}
          <a href={BLOG.link} style={{ textDecoration: "underline" }}>
            Blog
          </a>
        </div>
      </div>
    </div>
  );
}
