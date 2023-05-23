import Navbar from "../NavBar";
import Footer from "../Footer";
import { LayoutContextProvider } from "@store/layoutStore";
import { useEffect } from "react";

export default function Layout({ children }) {
  const getIp = async () => {
    const res = await fetch(`https://wp-boke.work/api/getIp`);
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
      </LayoutContextProvider>
    </>
  );
}
