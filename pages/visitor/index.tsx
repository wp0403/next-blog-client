/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-23 19:26:04
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-08 13:52:38
 */
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { useGetState } from "ahooks";
import { Pagination, Spin } from "antd";
import { LayoutContext } from "@/store/layoutStore";
import {
  addNavItemStyle,
  bindHandleScroll,
  isBrowser,
  removeNavItemStyle,
  removeScroll,
} from "@/utils/elementUtils";
import { formatDate } from "@/utils/dataUtils";
import { getRandomColor } from "@utils/dataUtils";
import style from "./visitor.module.css";

const Visitor = () => {
  const { theme } = useContext(LayoutContext);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage, getPage] = useGetState<number>(1);
  const [totalPage, setTotalPage, getTotalPage] = useGetState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const getData = async () => {
    if (getTotalPage() !== 0 && getTotalPage() < getPage()) return;
    setLoading(true);
    const res = await fetch(
      `https://wp-boke.work/api/getVisitorList?page=${getPage()}`
    );
    const posts = await res.json();

    setList(posts.data);
    setTotalPage(posts.meta.totalPage);
    setTotal(posts.meta.total);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.visitor}>
      <Head>
        <title>访客列表</title>
        <meta name="description" content="访客列表" />
      </Head>
      <div className={style.title}>访客列表</div>
      <div className={style.content}>
        <Spin spinning={loading}>
          {list?.map((v: any) => (
            <div
              key={v.id}
              className={style.item}
              style={
                isBrowser()
                  ? {
                      backgroundColor:
                        theme === 2
                          ? getRandomColor(36, 220)
                          : getRandomColor(30, 30),
                    }
                  : {}
              }
            >
              <div className={style.item_header}>
                <div className={style.item_time}>
                  {formatDate(v.last_visited_time, "yyyy.MM.dd HH:mm")}
                </div>
                <div className={style.item_ip}>IP：{v.visitor_ip}</div>
              </div>
              <div className={style.item_content}>
                <div className={style.item_con_item}>来访次数：{v.visits}</div>
                <div className={style.item_con_item}>
                  首次来访时间：{formatDate(v.create_time, "yyyy.MM.dd HH:mm")}
                </div>
                <div className={style.item_con_item}>
                  设备类型：{v.device_type}
                </div>
                <div className={style.item_con_item}>设备名称：{v.os_name}</div>
                <div className={style.item_con_item}>
                  设备版本：{v.os_version}
                </div>
              </div>
            </div>
          ))}
        </Spin>
      </div>
      <div className={style.pagination}>
        <Pagination
          hideOnSinglePage
          showLessItems
          showSizeChanger={false}
          current={page}
          pageSize={15}
          total={total}
          onChange={(v) => setPage(v)}
        />
      </div>
    </div>
  );
};

export default Visitor;
