import React, { useEffect } from "react";
import { useRouter } from "next/router";
import hljs from "highlight.js";

const CodeBlock = ({ language, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== router.route) {
      // 页面加载完成
      hljs.configure({
        ignoreUnescapedHTML: true,
        throwUnescapedHTML: false,
      });
      // 高亮所有代码块
      hljs.highlightAll();
    }
  }, [router.asPath, router.route]);

  return <code className={language}>{children}</code>;
};

export default CodeBlock;
