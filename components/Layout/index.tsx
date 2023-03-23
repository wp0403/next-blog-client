import Navbar from "../NavBar";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { getLayoutDom } from "../../utils/elementUtils";

export default function Layout({ children }) {
  const [loading, setLoading] = useState<boolean>(true);
  // 绑定全局获取元素事件
  useEffect(() => {
    getLayoutDom();
    setLoading(false);
  }, []);
  return (
    <>
      {!loading && (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
