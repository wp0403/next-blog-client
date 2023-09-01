import Router from "next/router";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
// import { useMount } from "ahooks";
import Layout from "@components/Layout";
import PageLoading from "@components/PageLoading";
import { routeChangeComplete } from "@/utils/elementUtils";
import LoadingCom from "@/components/LoadingCom";
import "@styles/globals.css";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 在客户端环境中执行延迟加载的 JavaScript 代码
      window.onload = () => {
        (window as any).LA.init({
          id: "3FmNQHwzFUzdFjX3",
          ck: "3FmNQHwzFUzdFjX3",
          autoTrack: true,
          hashMode: true,
        });
      };
    }
  }, []);

  return (
    <>
      <Script
        id="LA_COLLECT"
        src="https://wp-1302605407.cos.ap-beijing.myqcloud.com/js/js-sdk-pro.min.js"
      ></Script>
      <Script
        id="LA_EVENT"
        src="https://wp-1302605407.cos.ap-beijing.myqcloud.com/js/js-sdk-event.min.js"
      ></Script>
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
