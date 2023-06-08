import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";
import "@/styles/globals.css";
import "@/styles/notion.css";
import { LocaleProvider } from "@/lib/locale";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <LocaleProvider>
        <>
          <Component {...pageProps} />
          <Analytics />
        </>
      </LocaleProvider>
    </>
  );
}

export default MyApp;
