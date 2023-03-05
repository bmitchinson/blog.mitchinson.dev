import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BLOG from "@/blog.config";
import { useLocale } from "@/lib/locale";

const NavBar = () => {
  const locale = useLocale();
  const links = [
    { id: 1, name: locale.NAV.ABOUT, to: "https://mitchinson.dev" },
    { id: 2, name: locale.NAV.INDEX, to: BLOG.path || "/" },
    { id: 3, name: locale.NAV.SEARCH, to: "/search" },
  ];
  return (
    <div className="">
      <ul className="flex flex-row">
        {links.map((link) => (
          <li
            key={link.id}
            className="block ml-4 text-black dark:text-gray-50 nav"
          >
            <Link href={link.to}>
              <a>{link.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const options = [
  "💙",
  "🐈‍⬛",
  "🎸",
  "🎮",
  "👾",
  "📖",
  "📝",
  "🤖",
  "🪴",
  "🏋️",
  "🚴",
  "🎧",
  "🎺",
  "🪕",
  "🎼",
];

const getRandomEmoji = () => {
  return options[Math.floor(Math.random() * options.length)];
};

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(null);
  const sentinalRef = useRef([]);
  const [emoji, setEmoji] = useState(getRandomEmoji);
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add("sticky-nav-full");
      } else {
        navRef.current?.classList.remove("sticky-nav-full");
      }
    } else {
      navRef.current?.classList.add("remove-sticky");
    }
  };

  useEffect(() => {
    setEmoji(getRandomEmoji());
  }, []);

  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef]);

  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? "max-w-3xl px-4" : "px-4 md:px-24"
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div style={{ scale: "2.3", paddingLeft: "1rem" }}>🏠{emoji}</div>
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name"></p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
