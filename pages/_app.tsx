import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import PageLoading from "@components/PageLoading";
import "@styles/globals.css";

export default function App({ Component, pageProps }) {
  const routeChangeComplete = () => {
    (document.body || window).scrollTo(0, 0);
  };

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    Router.events.on("routeChangeComplete", routeChangeComplete);
    Router.events.on("routeChangeStart", () => {
      routeChangeComplete();
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
    Router.events.on("routeChangeError", () => {
      setLoading(false);
    });

    return () => {
      Router.events.off("routeChangeComplete", routeChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="baidu-site-verification" content="codeva-ZUhqyitPRt" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Layout>
        {loading ? <PageLoading /> : <Component {...pageProps} />}
      </Layout>
    </>
  );
}
