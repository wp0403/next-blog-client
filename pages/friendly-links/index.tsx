/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-24 21:44:33
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-07 15:36:15
 */
import Link from "next/link";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@/utils/elementUtils";
import { getRandomColor } from "@utils/dataUtils";
import { LayoutContext } from "@/store/layoutStore";
import Comment from "@components/Comment";
import style from "./friendlyLinks.module.css";

const FriendlyLinks = ({ posts }) => {
  const { theme } = useContext(LayoutContext);
  const { data } = posts;
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.friendly_links}>
      <Head>
        <title>友情链接</title>
      </Head>
      <h1 className={style.title}>友情链接</h1>
      <div className={style.demo}>
        <div className={style.demo_item}>网站名：shimmer</div>
        <div className={style.demo_item}>
          站点头像：https://wp-boke.work/images/logo.png
        </div>
        <div className={style.demo_item}>网站链接：https://wp-boke.work</div>
        <div className={style.demo_item}>
          网站描述：欲买桂花同载酒，终不似，少年游。
        </div>
        <div className={style.demo_item}>联系邮箱：webwp0403@163.com</div>
      </div>
      <div className={style.desc}>不定期清理失效网站，拒绝无效互链。</div>
      <div className={style.content}>
        {data?.map((v) => (
          <Link
            key={v.id}
            className={style.blog_item}
            style={
              isBrowser
                ? {
                    backgroundColor:
                      theme === 2
                        ? getRandomColor(36, 220)
                        : getRandomColor(30, 30),
                  }
                : {}
            }
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={style.blog_item_logo} src={v.logo} alt={v.title} />
            <div className={style.blog_item_content}>
              <div className={style.blog_item_title}>{v.title}</div>
              <div className={style.blog_item_desc}>{v.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={style.comment}>
        <Comment />
      </div>
    </div>
  );
};

export default FriendlyLinks;

export async function getStaticProps() {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://shimmer.wp-boke.work/api/getFriendlyLinks`);
  const posts = await res.json();

  // Pass post data to the page via props
  return {
    props: { posts },
    revalidate: 60, // In seconds
  };
}
