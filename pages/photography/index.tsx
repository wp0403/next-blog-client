/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-04-03 17:33:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-04-09 02:36:48
 */
import { useGetState } from "ahooks";
import { Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
import usePageSize from "../../utils/CustomHooks/usePageSize";
import { distinctObjectMap } from "../../utils/dataUtils";
import {
  addNavItemStyle,
  bindHandleScroll,
  layoutContent,
  removeNavItemStyle,
  removeScroll,
} from "../../utils/elementUtils";
import style from "./Photography.module.css";

const Photography = () => {
  const dom = useRef<any>(null);

  // 树洞列表
  const [data, setData] = useState<any[]>([]);
  // 当前页
  const [page, setPage, getPage] = useGetState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useGetState<boolean>(false);
  const [totalPages, setTotalPages, getTotalPages] = useGetState<number>(0);

  const content = useRef<any>(null);

  const getDate = async () => {
    if (getTotalPages() !== 0 && getTotalPages() < getPage()) return;
    setLoading(true);
    const res = await fetch(
      `https://wp-boke.work/api/getPhotographyList?page=${getPage()}&page_size=${page_size}`
    );
    const posts = await res.json();
    setData((a) => distinctObjectMap([...a, ...posts.data], "id"));
    getPage() === 1 && setTotalPages(posts.meta.total_pages);
    setLoading(false);
  };

  // 滚动事件
  const scrollFun = () => {
    // 滚动盒子
    const scrollBox = layoutContent();
    const scrollConBox = content.current;
    const flag = page < totalPages;

    if (
      scrollConBox.offsetHeight -
        scrollBox.offsetHeight +
        40 -
        scrollBox.scrollTop <=
        500 &&
      !loading &&
      flag
    ) {
      setPage((data) => data + 1);
    }
  };

  // 获取列表数据
  useEffect(() => {
    getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const scrollBox = layoutContent();
    scrollBox && scrollBox.addEventListener("scroll", scrollFun);
    return () => {
      scrollBox && scrollBox.removeEventListener("scroll", scrollFun);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_size, page, totalPages, loading, layoutContent]);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  const { pageWidth } = usePageSize({
    id: "photography_content",
    dom: dom.current,
  });

  const randerItem = (v) => (
    <div className={style.photography_item} key={v.id}>
      <div className={style.header}>
        <div className={style.header_top}>
          <div className={style.title}>{v.title}</div>
          <div className={style.place}>{v.place}</div>
          <div className={style.time}>({v.create_time})</div>
          <div className={style.username}>
            上传人：<span>{v.userInfo?.name}</span>
          </div>
        </div>
        <div className={style.desc}>{v.desc}</div>
      </div>
      <div className={style.content}>
        <Image.PreviewGroup>
          {v?.imgs?.map((v1) => (
            <Image
              key={v1.id}
              className={style.photography_image}
              width={pageWidth / 3}
              height={pageWidth / 3}
              alt=""
              src={v1.url}
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );

  return (
    <div className={style.photography} ref={content}>
      <div
        className={style.photography_content}
        id="photography_content"
        ref={dom}
      >
        {data?.map((v) => randerItem(v))}
      </div>
    </div>
  );
};

export default Photography;
