import Head from "next/head";

export default function Layout({ children, metaTags }) {
  return (
    <>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />

        {/* Google */}
        {metaTags.shouldIndex ? (
          <>
            {" "}
            <meta name="robots" content="index,follow,noodp" />
            <meta name="googlebot" content="index,follow" />
          </>
        ) : (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content="https://apr.dev/social.png" />
        <meta property="og:image:width" content="250" />
        <meta property="og:image:height" content="214" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={metaTags.url} />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content="https://apr.dev/social.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto max-w-7xl px-10">{children}</div>
    </>
  );
}
