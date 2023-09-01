import { useEffect } from "react";
import Script from "next/script";
import Navbar from "../NavBar";
import Footer from "../Footer";
import { LayoutContextProvider } from "@store/layoutStore";
import { getFingerprint, encrypt } from "@/utils/dataUtils";
import BackTop from "@components/BackTop";

export default function Layout({ children }) {
  const getIp = async () => {
    const originalValue = await getFingerprint();
    const hashValue = encrypt(originalValue);
    // const res = await fetch(
    //   `http://localhost:7001/getIp?hashValue=${hashValue}`
    // );
    const res = await fetch(
      `https://shimmer.wp-boke.work/api/getIp?hashValue=${hashValue}`
    );
  };
  useEffect(() => {
    getIp();
  }, []);
  return (
    <>
      <LayoutContextProvider>
        <Navbar />
        {children}
        <Footer />
        <BackTop />
        <Script
          id="LA-DATA-WIDGET"
          crossOrigin="anonymous"
          src="https://v6-widget.51.la/v6/3FmNQHwzFUzdFjX3/quote.js?theme=2&f=12&display=0,0,1,1,0,0,1,1"
        ></Script>
      </LayoutContextProvider>
    </>
  );
}
