/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 03:00:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-03 14:20:07
 */
import Head from "next/head";
import { useEffect } from "react";
import RanderMarkdown from "../../components/RanderMarkdown";
import SysIcon from "../../components/SysIcon";
import { formatDate } from "../../utils/dataUtils";
import {
  addLayoutNavStyle,
  removeLayoutNavStyle,
} from "../../utils/elementUtils";
import style from "./blogDetail.module.css";

export default function BlogDetails({ posts }) {
  const { data } = posts;

  const renderLink = (obj, type) => {
    return <div className={style.list_item_type_item}>{obj.value}</div>;
  };

  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  return (
    <div className={style.blog_detail}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className={style.header}>
        <div className={style.list_item_title}>{data.title}</div>
        <div className={style.list_item_info}>
          <div className={style.list_item_type}>
            <SysIcon className={style.icon} type="icon-biaoqian" />
            <span>{data.classify}</span>
            <span className={style.blog_item_class_border}>|</span>
            <span>{data.classify_sub}</span>
          </div>
          <div className={style.list_item_time}>
            <SysIcon className={style.icon} type="icon-a-shijianzuijin" />
            发布于{formatDate(data.time_str, "yyyy-MM-dd")} 最近修改
            {formatDate(data.last_edit_time, "yyyy-MM-dd")}
          </div>
          <div className={style.list_item_type}>
            <SysIcon className={style.icon} type="icon-a-gerenyonghu" />
            {data?.userInfo?.name}
          </div>
        </div>
      </div>
      <div className={style.content}>
        {data.storage_type === "1" && (
          <RanderMarkdown markdown={data.content} />
        )}
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
  );
}

export async function getStaticPaths() {
  // 调用外部 API 获取内容
  const res = await fetch("https://wp-boke.work/api/getClassifyList");
  const { data } = await res.json();

  return {
    paths: data.map(({ id }) => ({ params: { blogID: id.toString() } })),
    fallback: 'blocking', // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://wp-boke.work/api/getClassifyDetails?id=${params.blogID}`
  );
  const posts = await res.json();

  // Pass post data to the page via props
  return { 
    props: { posts },    
    revalidate: 60, // In seconds 
  };
}
