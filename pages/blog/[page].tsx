/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 11:01:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-03 14:19:49
 */
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { Pagination,Input } from "antd";
import SysIcon from "../../components/SysIcon";
import {
  addLayoutNavStyle,
  removeLayoutNavStyle,
} from "../../utils/elementUtils";
import { formatDate } from "../../utils/dataUtils";
import style from "./blog.module.css";

const classList = [
  {
    id: 1,
    name: "前端",
    value: 10,
  },
  {
    id: 2,
    name: "后端",
    value: 30,
  },
  {
    id: 3,
    name: "其它学习资料",
    value: 134,
  },
  {
    id: 4,
    name: "醉挽清风",
    value: 13,
  },
  {
    id: 5,
    name: "在路上",
    value: 133,
  },
];

export default function BlogDetails({ posts }) {
  const { data, totalPage, page } = posts;

  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  // 渲染单项的样式
  const renderItem = (item) => {
    return (
      <div className={style.blog_item} key={item.id}>
        <div className={style.blog_card_img_box}>
          <Image
            className={style.blog_card_img}
            src={item.img}
            alt=""
            width={200}
            height={100}
          />
        </div>
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
                  type="icon-a-yanjingxianshi"
                />
                19918
              </div>
              <div className={style.blog_item_follow}>
                <SysIcon
                  className={style.blog_item_icon}
                  type="icon-a-xihuanguanzhuaixin"
                />
                21
              </div>
            </div>
            <div className={style.blog_item_user}>{item?.userInfo?.name}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={style.blog}>
      <div className={style.blog_left}></div>
      <div className={style.blog_list}>
        <div className={style.blog_content}>
          {data && Boolean(data?.length) && data?.map((v) => renderItem(v))}
          {(!data || !data?.length) && "暂无数据"}
        </div>
        <div className={style.blog_Pagination}>
          <Pagination
            hideOnSinglePage
            showLessItems
            showSizeChanger={false}
            defaultCurrent={page}
            total={totalPage * 10}
            onChange={(v) => Router.push(`/blog/${v}`)}
          />
        </div>
      </div>
      <div className={style.blog_right}>
        <div className={style.blog_search}>
          <Input className={style.blog_search_input} placeholder='搜索博文' />
        </div>
        <div className={style.blog_class}>
          <div className={style.blog_class_title}>文章分类</div>
          {classList?.map((v) => (
            <div className={style.blog_class_item} key={v?.id}>
              <div className={style.blog_class_item_name}>{v?.name}</div>
              <div className={style.blog_class_item_num}>{v?.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
    fallback: 'blocking',
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
  );
  const posts2 = await res.json();

  // Pass post data to the page via props
  return {
    props: {
      posts: {
        page: params.page,
        totalPage: posts1.data,
        pageList,
        ...posts2,
      },
    },
    revalidate: 60, // In seconds
  };
}
