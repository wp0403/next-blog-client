/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-08 11:38:36
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-09 10:35:01
 */
import Link from "next/link";
import Head from "next/head";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import { moreList } from "@/utils/dict";
import style from "./more.module.css";

const More = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  const randerItem = (v) => {
    return (
      <div className={style.item}>
        <div className={style.item_title}>{v.title}</div>
        <div className={style.item_desc}>{v.desc}</div>
        <div className={style.item_footer}>
          <Link className={style.item_btn} href={v.url} target="_block">
            Come Here
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={style.more}>
      <Head>
        <title>更多</title>
      </Head>
      <div className={style.content}>{moreList?.map((v) => randerItem(v))}</div>
    </div>
  );
};

export default More;
