import Navbar from "../NavBar";
import Footer from "../Footer";
import { LayoutContextProvider } from "@store/layoutStore";
import { useEffect } from "react";
import { getFingerprint, encrypt } from "@/utils/dataUtils";

export default function Layout({ children }) {
  const getIp = async () => {
    const originalValue = await getFingerprint();
    const hashValue = encrypt(originalValue);
    const res = await fetch(
      `http://localhost:7001/getIp?hashValue=${hashValue}`
    );
    // const res = await fetch(
    //   `https://wp-boke.work/api/getIp?hashValue=${hashValue}`
    // );
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
