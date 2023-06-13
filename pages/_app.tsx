import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
// import { useMount } from "ahooks";
import Layout from "@components/Layout";
import PageLoading from "@components/PageLoading";
import { routeChangeComplete } from "@/utils/elementUtils";
import LoadingCom from "@/components/LoadingCom";
import "@styles/globals.css";
import BackTop from "@/components/BackTop";

export default function App({ Component, pageProps }) {
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // useMount(() => {
  //   setTimeout(() => {
  //     setInitLoading(false);
  //   }, 3000);
  // });

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
      {initLoading ? (
        <LoadingCom />
      ) : (
        <Layout>
          {loading ? <PageLoading /> : <Component {...pageProps} />}
        </Layout>
      )}
    </>
  );
}
