/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-24 21:44:33
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-25 10:13:47
 */
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@/utils/elementUtils";
import { getRandomColor } from "@utils/dataUtils";
import { LayoutContext } from "@/store/layoutStore";
import style from "./friendlyLinks.module.css";

const list = [
  {
    id: 1,
    title: "网站名称",
    desc: "欲买桂花同载酒，终不似，少年游。",
    logo: "https://img-1302605407.cos.ap-beijing.myqcloud.com/photography/ea7b8440e7638192db4bc4b5df663fe937b076a7b893bb703fccf0348a837756.jpeg",
    url: "https://wp-boke.work",
  },
  {
    id: 2,
    title: "网站名称",
    desc: "欲买桂花同载酒，终不似，少年游。",
    logo: "https://img-1302605407.cos.ap-beijing.myqcloud.com/photography/ea7b8440e7638192db4bc4b5df663fe937b076a7b893bb703fccf0348a837756.jpeg",
    url: "https://wp-boke.work",
  },
  {
    id: 3,
    title: "网站名称",
    desc: "欲买桂花同载酒，终不似，少年游。",
    logo: "https://img-1302605407.cos.ap-beijing.myqcloud.com/photography/ea7b8440e7638192db4bc4b5df663fe937b076a7b893bb703fccf0348a837756.jpeg",
    url: "https://wp-boke.work",
  },
];

const FriendlyLinks = () => {
  const { theme } = useContext(LayoutContext);

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
      <h1 className={style.title}>纽带花园</h1>
      <div className={style.demo}>
        <div className={style.demo_item}>网站名：shimmer</div>
        <div className={style.demo_item}>
          站点头像：https://wp-boke.work/logo.png
        </div>
        <div className={style.demo_item}>网站链接：https://wp-boke.work</div>
        <div className={style.demo_item}>
          网站描述：欲买桂花同载酒，终不似，少年游。
        </div>
      </div>
      <div className={style.desc}>不定期清理失效网站，拒绝无效互链。</div>
      <div className={style.content}>
        {list?.map((v) => (
          <Link
            className={style.blog_item}
            style={{
              backgroundColor:
                theme === 2 ? getRandomColor(36, 220) : getRandomColor(30, 30),
            }}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={style.blog_item_logo}
              src={v.logo}
              alt={v.title}
              width={50}
              height={50}
            />
            <div className={style.blog_item_content}>
              <div className={style.blog_item_title}>{v.title}</div>
              <div className={style.blog_item_desc}>{v.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={style.submit}></div>
    </div>
  );
};

export default FriendlyLinks;
