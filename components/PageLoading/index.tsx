/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-01-23 11:30:09
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-04-13 18:07:46
 */
import { useEffect } from "react";
import Head from "next/head";
import {
  addLayoutNavStyle,
  removeLayoutNavStyle,
} from "../../utils/elementUtils";
import style from "./pageLoading.module.css";

export default function PageLoading() {
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  return (
    <div className={style.page_loading}>
      <Head>
        <title>Shimmer🌈</title>
        <meta name="description" content="文归档" />
      </Head>
      <div className={style.three_balls_bounce}>
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.circle} />
        <div className={style.shadow} />
        <div className={style.shadow} />
        <div className={style.shadow} />
      </div>
    </div>
  );
}
