import Router from "next/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Layout from "@components/Layout";
import PageLoading from "@components/PageLoading";
import { routeChangeComplete } from "@/utils/elementUtils";
import LoadingCom from "@/components/LoadingCom";
import "@styles/globals.css";

export default function App({ Component, pageProps }) {
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setInitLoading(false);
    }, 2000);
  }, []);

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
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="description" content="shimmer的博客" />
        <meta
          name="keywords"
          content="shimmer, 博客, 首页, wp-boke.work, wp, wp-boke"
        />
        <meta name="author" content="shimmer" />
      </Head>
      <Analytics />
      <SpeedInsights />
      <LoadingCom loading={initLoading} />
      <Layout>
        {loading ? <PageLoading /> : <Component {...pageProps} />}
      </Layout>
    </>
  );
}
