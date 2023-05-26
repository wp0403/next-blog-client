/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2023-03-25 14:06:20
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-24 13:43:59
 */
// import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Pagination, Input, Spin } from "antd";
import { useDebounceFn, useGetState } from "ahooks";
import SysIcon from "@components/SysIcon";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import { formatDate, hasUnicode, unicodeToEmoji } from "@utils/dataUtils";
import style from "./blog.module.css";

export default function BlogDetails({ posts }) {
  const {
    data,
    totalPage,
    type = null,
    page,
    classifyNum: { classifyNum },
  } = posts;

  const [keyword, setKeyword, getKeyword] = useGetState<string>("");
  const [searchList, setSearchList] = useState<any[]>([]);
  const [searchTotal, setSearchTotal] = useState<number>(0);
  const [searchPage, setSearchPage, getSearchPage] = useGetState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getDate = async () => {
    if (!keyword || loading) return;
    setLoading(true);
    const res = await fetch(
      `https://wp-boke.work/api/getSearchClassifyList?page=${getSearchPage()}&keyword=${getKeyword()}`
      // `http://localhost:7001/getSearchClassifyList?page=${getSearchPage()}&keyword=${getKeyword()}`
    );
    const res1 = await fetch(
      `https://wp-boke.work/api/getClassifyListPage?keyword=${getKeyword()}`
      // `http://localhost:7001/getClassifyListPage?keyword=${getKeyword()}`
    );

    const posts = await res.json();
    const posts1 = await res1.json();
    setSearchList(posts.data);
    setSearchPage(posts1.data);
    setLoading(false);
  };

  const { run } = useDebounceFn(
    () => {
      getDate();
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  // 渲染单项的样式
  const renderItem = (item) => {
    return (
      <div className={style.blog_item} key={item.id}>
        <div className={style.blog_item_content}>
          <Link
            className={style.blog_item_title}
            href={`/blog-details/${item.id}`}
          >
            {item.title}
          </Link>
          <div className={style.blog_item_desc}>{item.desc}</div>
          <div className={style.blog_item_footer}>
            <div className={style.blog_item_class}>
              <span>{item.classify}</span>
              <span className={style.blog_item_class_border}>|</span>
              <span>{item.classify_sub}</span>
            </div>
            <div className={style.blog_item_time}>
              {formatDate(item.time_str, "yyyy-MM-dd")}
            </div>
            <div className={style.blog_item_data}>
              <div className={style.blog_item_browse}>
                <SysIcon
                  className={style.blog_item_icon}
                  type="icon-yanjing-kai"
                />
                {item.views}
              </div>
              <div className={style.blog_item_follow}>
                <SysIcon className={style.blog_item_icon} type="icon-guanzhu" />
                {item.likes}
              </div>
            </div>
            <div className={style.blog_item_user}>
              {hasUnicode(item?.userInfo?.name)
                ? unicodeToEmoji(item?.userInfo?.name)
                : item?.userInfo?.name}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
    setSearchTotal(0);
    setSearchPage(1);
    run();
  };

  const newData = keyword ? searchList : data;

  return (
    <>
      <Head>
        <title>文章列表</title>
        <meta name="description" content="Shimmer的文章列表" />
      </Head>
      <div className={style.blog}>
        <div className={style.blog_con}>
          {/* <div className={style.blog_left}></div> */}
          <div className={style.blog_list}>
            <div className={style.blog_content}>
              <Spin spinning={loading}>
                {newData &&
                  Boolean(newData?.length) &&
                  newData?.map((v) => renderItem(v))}
                {(!newData || !newData?.length) && "暂无数据"}
              </Spin>
            </div>
            <div className={style.blog_Pagination}>
              <Pagination
                hideOnSinglePage
                showLessItems
                showSizeChanger={false}
                defaultCurrent={page}
                total={(keyword ? searchTotal : totalPage) * 10}
                onChange={(v) =>
                  keyword ? setSearchPage(v) : Router.push(`/blog/${v}`)
                }
              />
            </div>
          </div>
          <div className={style.blog_right}>
            <div className={style.blog_right_content}>
              <div className={style.blog_search}>
                <Input
                  className={style.blog_search_input}
                  placeholder="搜索博文"
                  value={keyword}
                  onChange={changeKeyword}
                />
              </div>
              <div className={style.blog_class}>
                <div className={style.blog_class_title}>文章分类</div>
                <div className={style.blog_class_content}>
                  {classifyNum?.map((v) => (
                    <div
                      className={`${style.blog_class_item} ${
                        v.type == type && style.blog_class_item_active
                      }`}
                      key={v?.type}
                    >
                      <div
                        className={style.blog_class_item_name}
                        onClick={() => Router.push(`/blog/1/${v?.type}`)}
                      >
                        {v?.label}
                      </div>
                      <div className={style.blog_class_item_num}>
                        {v?.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // 调用外部 API 获取内容
  const res = await fetch(`https://wp-boke.work/api/getClassifyListPage`);
  const posts = await res.json();

  const arr = [] as string[];
  for (let i = 1; i <= posts.data; i++) {
    arr.push(i.toString());
  }

  return {
    // 必须叫paths，值必须是数组
    paths: arr.map((v) => ({ params: { page: v } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // 获取页码
  const pageObj = await fetch(`https://wp-boke.work/api/getClassifyListPage`);
  const posts1 = await pageObj.json();

  const pageList = [] as string[];
  for (let i = 1; i <= posts1.data; i++) {
    pageList.push(i.toString());
  }
  // 调用外部 API 获取内容
  const res = await fetch(
    `https://wp-boke.work/api/getClassifyList?page=${params.page}`
    // `http://localhost:7001/getClassifyList?page=${params.page}`
  );
  const classifyNum = await fetch(`https://wp-boke.work/api/getClassifyNum`);
  const posts2 = await res.json();
  const posts3 = await classifyNum.json();

  // Pass post data to the page via props
  return {
    props: {
      posts: {
        page: params.page,
        totalPage: posts1.data,
        pageList,
        classifyNum: posts3.data,
        ...posts2,
      },
    },
    revalidate: 60, // In seconds
  };
}
