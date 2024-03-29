/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-01-25 16:48:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-11 11:19:05
 */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import style from "./archive.module.css";

export default function Archive() {
  const [data, setDate] = useState<any[]>([]);

  const init = async () => {
    const res = await fetch(`https://shimmer.wp-boke.work/api/getArchive`);
    // const res = await fetch(`http://localhost:7001/getArchive`);
    const { data } = await res.json();

    setDate(data);
  };

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();
    init();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  return (
    <div className={style.archive}>
      <Head>
        <title>文归档</title>
        <meta name="description" content="文归档" />
      </Head>
      <div className={style.archive_content}>
        {data?.map((v) => {
          return (
            <div className={style.archive_item} key={v?.year}>
              <div className={style.year}>{v?.year}</div>
              {v?.children?.map((item) => (
                <Link
                  href={`/blog-details/${item.id}`}
                  className={style.class_item}
                  key={item.id}
                >
                  <div className={style.class_item_time}>{item?.date_str}</div>
                  <div className={style.class_item_name}>{item?.title}</div>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
