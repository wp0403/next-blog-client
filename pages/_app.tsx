import Router from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageLoading from "../components/PageLoading";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const routeChangeComplete = () => {
    (document.getElementById("__next") || window).scrollTo(0, 0);
  };

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    Router.events.on("routeChangeComplete", routeChangeComplete);
    Router.events.on("routeChangeStart", () => {
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
    <Layout>{loading ? <PageLoading /> : <Component {...pageProps} />}</Layout>
  );
}
