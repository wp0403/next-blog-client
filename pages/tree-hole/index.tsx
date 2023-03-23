/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-03-23 14:15:39
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-23 16:54:17
 */
import { useEffect, useRef, useState } from "react";
import { useGetState } from "ahooks";
import {
  addNavItemStyle,
  bindHandleScroll,
  layoutContent,
  removeNavItemStyle,
  removeScroll,
} from "../../utils/elementUtils";
import style from "./index.module.css";
import Link from "next/link";
import { changeTreeData, distinctObjectMap } from "../../utils/dataUtils";

type DateItem = {
  [key: string]: boolean | number | string | any;
};

export default function TreeHole() {
  // 树洞列表
  const [data, setData] = useState<DateItem[]>([]);
  // 当前页
  const [page, setPage, getPage] = useGetState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useGetState<boolean>(false);
  const [totalPages, setTotalPages] = useGetState<number>(0);

  const content = useRef<any>(null);

  const getDate = async () => {
    setLoading(true);
    const res = await fetch(
      `http://127.0.0.1:7001/getSecretList?page=${getPage()}&page_size=${page_size}`
    );
    const posts = await res.json();
    setData((a) => distinctObjectMap([...a, ...posts.data], "id"));
    getPage() === 1 && setTotalPages(posts.meta.total_pages);
    setLoading(false);
  };

  // 滚动事件
  const scrollFun = () => {
    // 滚动盒子
    const scrollBox = layoutContent;
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
    layoutContent && layoutContent.addEventListener("scroll", scrollFun);
    return () => {
        layoutContent && layoutContent.removeEventListener("scroll", scrollFun);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_size, page, totalPages, loading,layoutContent]);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  return (
    <div className={style.tree_hole} ref={content}>
      <div className={style.content}>
        {changeTreeData(data)?.map((v, ind) => (
          <div className={style.item} key={ind}>
            <div className={style.year}>{v?.year}</div>
            {v?.children?.map((item) => (
              <div className={style.tree_item} key={item.id}>
                <div className={style.tree_item_top}>
                  <div className={style.tree_item_time}>{item?.date_str}</div>
                  <div
                    className={style.tree_item_content}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
                <div className={style.tree_item_type}>{item?.type}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
