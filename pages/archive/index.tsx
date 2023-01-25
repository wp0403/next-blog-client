/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-01-25 16:48:55
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-01-25 18:32:20
 */
import { useEffect } from "react";
import SysIcon from "../../components/SysIcon";
import {
  addLayoutNavStyle,
  removeLayoutNavStyle,
} from "../../utils/elementUtils";
import style from "./archive.module.css";

const list = [
  {
    id: 1,
    name: "2018",
    children: [
      {
        id: 11,
        name: "第一篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 12,
        name: "第二篇文章",
        time: "8-19",
        url: "",
      },
      {
        id: 13,
        name: "第三篇文章",
        time: "8-30",
        url: "",
      },
      {
        id: 14,
        name: "第4篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 15,
        name: "第5篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 16,
        name: "第6篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 17,
        name: "第7篇文章",
        time: "8-17",
        url: "",
      },
    ],
  },
  {
    id: 2,
    name: "2017",
    children: [
      {
        id: 21,
        name: "第一篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 22,
        name: "第二篇文章",
        time: "8-19",
        url: "",
      },
      {
        id: 23,
        name: "第三篇文章",
        time: "8-30",
        url: "",
      },
      {
        id: 24,
        name: "第4篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 25,
        name: "第5篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 26,
        name: "第6篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 27,
        name: "第7篇文章",
        time: "8-17",
        url: "",
      },
    ],
  },
  {
    id: 3,
    name: "2016",
    children: [
      {
        id: 31,
        name: "第一篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 32,
        name: "第二篇文章",
        time: "8-19",
        url: "",
      },
      {
        id: 33,
        name: "第三篇文章",
        time: "8-30",
        url: "",
      },
      {
        id: 34,
        name: "第4篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 35,
        name: "第5篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 36,
        name: "第6篇文章",
        time: "8-17",
        url: "",
      },
      {
        id: 37,
        name: "第7篇文章",
        time: "8-17",
        url: "",
      },
    ],
  },
];

export default function Custom404() {
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  return (
    <div className={style.archive}>
      <div className={style.archive_left}>
        {list?.map((v) => {
          return (
            <>
              <div className={style.year} key={v?.id}>
                {v?.name}
              </div>
              {v?.children?.map((item) => (
                <div className={style.class_item} key={item.id}>
                  <div className={style.class_item_time}>{item?.time}</div>
                  <div className={style.class_item_name}>{item?.name}</div>
                </div>
              ))}
            </>
          );
        })}
      </div>
      <div className={style.archive_right}></div>
    </div>
  );
}
