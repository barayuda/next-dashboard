import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="/assets/img/brand/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/img/brand/apple-icon.png"
        />
      </Head>
      <body className="text-blueGray-700 antialiased">
        <div id="page-transition"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
