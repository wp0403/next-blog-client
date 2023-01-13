/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-12-15 11:01:47
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-12-15 11:27:39
 */
import Image from "next/image";
import Link from "next/link";

export default function BlogDetails({ posts }) {
  const { data } = posts;

  // 渲染单项的样式
  const renderItem = (item) => {
    return (
      <div key={item.id}>
        <div>
          <Image src={item.img} alt="" width={200} height={100} />
        </div>
        <div>
          <Link href={`/blog-details/${item.id}`} target="_blank">
            {item.title}
          </Link>
          <div>
            <div>
              <span>{item.classify}</span>|<span>{item.classify_sub}</span>
            </div>
            <div>
              发布于{item.time_str} 最近修改
              {item.last_edit_time}
            </div>
          </div>
          <div>
            <div>{item.desc}</div>
          </div>
          <div>
            <div />
            {item?.userInfo?.name}
          </div>
        </div>
      </div>
    );
  };

  return <div>{data.map((item) => renderItem(item))}</div>;
}

export async function getStaticProps() {
  // 调用外部 API 获取内容
  const res = await fetch(
    "https://wp-boke.work/api/getClassifyList?id=1&page=1&page_size=10"
  );
  const posts = await res.json();

  // Pass post data to the page via props
  return { props: { posts } };
}
