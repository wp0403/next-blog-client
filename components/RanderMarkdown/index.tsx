/* eslint-disable react/no-children-prop */
import Link from "next/link";
import { Image, message } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LayoutContext } from "@/store/layoutStore";

const RanderMarkdown = (props: any) => {
  const { theme } = useContext(LayoutContext);

  const handleCopy = () => {
    message.success("复制成功");
  };

  const [style, setStyle] = useState({});
  // 设置高亮样式
  const changeCodeTheme = (v) => {
    switch (v) {
      case 1:
        import("react-syntax-highlighter/dist/esm/styles/prism/xonokai").then(
          (mod) => setStyle(mod.default)
        );
        break;
      case 2:
        import("react-syntax-highlighter/src/styles/prism/prism").then((mod) =>
          setStyle(mod.default)
        );
        break;
      default:
        import("react-syntax-highlighter/dist/esm/styles/prism/xonokai").then(
          (mod) => setStyle(mod.default)
        );
        break;
    }
  };

  useEffect(() => {
    changeCodeTheme(theme);
  }, [theme]);

  return (
    <Fragment>
      <Image.PreviewGroup>
        <ReactMarkdown
          children={props.markdown}
          className="markdown_body"
          remarkPlugins={[remarkGfm, remarkMath, remarkToc]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <>
                  <CopyToClipboard
                    text={String(children).replace(/\n$/, "")}
                    onCopy={handleCopy}
                  >
                    <div className="code_copy">
                      <div className="code_language">{match[1]}</div>
                      <div className="code_btn">复制代码</div>
                    </div>
                  </CopyToClipboard>
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={style as any}
                    language={match[1]}
                    showLineNumbers
                    PreTag="div"
                    {...props}
                  />
                </>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            img({ src, alt }) {
              return (
                <Image
                  className={"blog_img"}
                  src={src}
                  alt={alt}
                  rootClassName={"blog_img"}
                />
              );
            },
            a({ href, children }) {
              if (RegExp("#").test(href || "")) {
                return <a href={href}>{children}</a>;
              }
              return (
                <Link
                  href={href as any}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {children}
                </Link>
              );
            },
            p({ children }) {
              return <div>{children}</div>;
            },
          }}
        />
      </Image.PreviewGroup>
    </Fragment>
  );
};

export default RanderMarkdown;
