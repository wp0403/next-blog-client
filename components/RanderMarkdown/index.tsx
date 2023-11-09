import Link from "next/link";
import { Image, message } from "antd";
import { useGetState } from "ahooks";
import React, { useMemo, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CodeBlock from "../CodeBlock";

const useRanderMarkdown = (markdown) => {
  const [tocList, setTocList, getTocList] = useGetState<any[]>([]);
  const handleCopy = () => {
    message.success("复制成功");
  };

  // 将标题内容转换成id时可以用的字符串
  const slugify = (string = "") => {
    return string
      .trim()
      .toLowerCase()
      .replace(/[\s]+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  };

  // 生成唯一id
  const generateHeadingId = (string, level) => {
    return slugify(string) + "-" + level;
  };

  const flag =
    typeof window !== "undefined"
      ? document.querySelector(".markdown_body")?.innerHTML
      : "";

  useEffect(() => {
    const list = document.querySelectorAll(".markdown-toc-item");

    const newList = Array.from(list).map((v: any) => {
      return {
        id: v.id,
        title: v.innerText,
        i: v.nodeName.split("")[1],
      };
    });

    setTocList(newList);
  }, [flag]);

  const markdownHtml = useMemo(
    () => (
      <Image.PreviewGroup>
        <ReactMarkdown
          className="markdown_body"
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            h1: ({ node, ...props }) => {
              const id = generateHeadingId(
                (node.children[0] as any).value,
                props.level
              );
              return (
                <h1 className="markdown-toc-item" id={id}>
                  {props.children}
                </h1>
              );
            },
            h2: ({ node, ...props }) => {
              const id = generateHeadingId(
                (node.children[0] as any).value,
                props.level
              );
              return (
                <h2 className="markdown-toc-item" id={id}>
                  {props.children}
                </h2>
              );
            },
            h3: ({ node, ...props }) => {
              const id = generateHeadingId(
                (node.children[0] as any).value,
                props.level
              );
              return (
                <h3 className="markdown-toc-item" id={id}>
                  {props.children}
                </h3>
              );
            },
            h4: ({ node, ...props }) => {
              const id = generateHeadingId(
                (node.children[0] as any).value,
                props.level
              );
              return (
                <h4 className="markdown-toc-item" id={id}>
                  {props.children}
                </h4>
              );
            },
            h5: ({ node, ...props }) => {
              const id = generateHeadingId(
                (node.children[0] as any).value,
                props.level
              );
              return (
                <h5 className="markdown-toc-item" id={id}>
                  {props.children}
                </h5>
              );
            },
            h6: ({ node, ...props }) => {
              const id = generateHeadingId(
                (node.children[0] as any).value,
                props.level
              );
              return (
                <h6 className="markdown-toc-item" id={id}>
                  {props.children}
                </h6>
              );
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return (
                <>
                  {match && match[1] && (
                    <div className="code_copy">
                      <div className="code_language">{match[1]}</div>
                      <CopyToClipboard
                        text={String(children).replace(/\n$/, "")}
                        onCopy={handleCopy}
                      >
                        <div className="code_btn">复制代码</div>
                      </CopyToClipboard>
                    </div>
                  )}
                  <CodeBlock language={match && match[1] ? match[1] : ""}>
                    {String(children).replace(/\n$/, "")}
                  </CodeBlock>
                </>
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
          }}
        >
          {markdown}
        </ReactMarkdown>
      </Image.PreviewGroup>
    ),
    [markdown]
  );

  const tocDom = useMemo(() => {
    let list: any[] = getTocList().map((v) => v.i);
    list = [...new Set(list)].sort((a, b) => b - a);

    return (
      <>
        {getTocList().map((v) => {
          return (
            <div
              className={`toc-item toc-item${list.findIndex(
                (val) => val == v.i
              )}`}
              key={v.id}
              onClick={() => {
                const top = document.getElementById(v.id)?.offsetTop || 0;
                document.body.scrollTo({
                  left: 0,
                  top: top - 80,
                  behavior: "smooth",
                });
              }}
            >
              {v.title}
            </div>
          );
        })}
      </>
    );
  }, [tocList]);

  return {
    tocDom,
    markdownHtml,
  };
};

export default useRanderMarkdown;
