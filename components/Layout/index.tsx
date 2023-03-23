import Navbar from "../NavBar";
import Footer from "../Footer";
import { useEffect } from "react";
import { getLayoutDom } from "../../utils/elementUtils";

export default function Layout({ children }) {
  // 绑定全局滚动事件
  useEffect(() => {
    getLayoutDom();
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
