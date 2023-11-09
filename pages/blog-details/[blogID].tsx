/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 03:00:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-11-09 16:13:00
 */
import Head from "next/head";
import { useEffect } from "react";
import useRanderMarkdown from "@components/RanderMarkdown";
import SysIcon from "@components/SysIcon";
import { formatDate, hasUnicode, unicodeToEmoji } from "@utils/dataUtils";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import Permit from "@components/Permit";
import ClassifyPrevOrNext from "@components/ClassifyPrevOrNext";
import Comment from "@components/Comment";
import style from "./blogDetail.module.css";

export default function BlogDetails({ posts }) {
  const { data = {} } = posts;

  const { markdownHtml, tocDom } = useRanderMarkdown(data.content);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    if (posts.code === 305) {
      window.location.href = "/404";
    }

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  return (
    <div className={style.blog_detail}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className={style.blog_detail_box}>
        <div className={style.content}>
          <div className={style.header}>
            <div className={style.list_item_title}>{data.title}</div>
            <div className={style.list_item_info}>
              <div className={style.list_item_type}>
                <SysIcon className={style.icon} type="icon-biaoqian2" />
                <span>{data.classify}</span>
                <span className={style.blog_item_class_border}>|</span>
                <span>{data.classify_sub}</span>
              </div>
              <div className={style.list_item_time}>
                <SysIcon className={style.icon} type="icon-shijian" />
                发布于{formatDate(data.time_str, "yyyy-MM-dd")} 最近修改
                {formatDate(data.last_edit_time, "yyyy-MM-dd")}
              </div>
              <div className={style.list_item_type}>
                <SysIcon className={style.icon} type="icon-yanjing-kai" />
                <span>{data.views}</span>
              </div>
              <div className={style.list_item_type}>
                <SysIcon className={style.icon} type="icon-guanzhu" />
                <span>{data.likes}</span>
              </div>
              <div className={style.list_item_type}>
                <SysIcon className={style.icon} type="icon-geren1" />
                {hasUnicode(data?.userInfo?.name)
                  ? unicodeToEmoji(data?.userInfo?.name)
                  : data?.userInfo?.name}
              </div>
            </div>
          </div>
          <div className={style.blog_content}>
            {data.storage_type === "1" && markdownHtml}
            {data.storage_type === "2" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.content ? data.content : "暂无",
                }}
              />
            )}
            {data.storage_type === "3" && data.content}
          </div>
        </div>
        <div className={style.right_content}>
          <div className={style.blog_toc_box}>
            <div className={style.blog_toc_title}>目录</div>
            <div className={style.blog_toc}>{tocDom}</div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <Permit id={data.id} user={data?.userInfo?.name} />
        <ClassifyPrevOrNext id={data.id} />
      </div>
      <div className={style.comment}>
        <Comment />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // 调用外部 API 获取内容
  const res = await fetch("https://shimmer.wp-boke.work/api/getClassifyList");
  const { data } = await res.json();

  return {
    paths: data.map(({ id }) => ({ params: { blogID: id.toString() } })),
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://shimmer.wp-boke.work/api/getClassifyDetails?id=${params.blogID}`
  );
  const posts = await res.json();

  // Pass post data to the page via props
  return {
    props: { posts },
    revalidate: 60, // In seconds
  };
}
