/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2022-12-15 03:00:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-01-13 14:20:48
 */
import Head from 'next/head'
import Script from 'next/script'
import RanderMarkdown from '../../components/RanderMarkdown'
// import style from '../../styles/BlogDetails.module.css'

export default function BlogDetails({posts}) {
    const { data } = posts;

    return (
      <div>
        <Head>
          <title>{data.title}</title>
        </Head>
        <div>
          <div>{data.title}</div>
          <div>
            <div>
              发布于{data.time_str} 最近修改
              {data.last_edit_time}
            </div>
            <div>{data?.userInfo?.name}</div>
          </div>
        </div>
        <div>
          {data.storage_type === "1" && (
            <RanderMarkdown markdown={data.content} />
          )}
          {data.storage_type === "2" && (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.content ? data.content : "暂无",
              }}
            />
          )}
          {data.storage_type === "3" && data.content}
        </div>
        <Script src='https://api.vvhan.com/api/snow'/>
      </div>
    );
}

export async function getStaticPaths() {
    // 调用外部 API 获取内容
    const res = await fetch('https://wp-boke.work/api/getClassifyList?id=1&page=1&page_size=10')
    const { code,data,meta } = await res.json();

    return {
      paths: data.map(({id}) => ({params: {blogID: id.toString()}})),
      fallback: false, // can also be true or 'blocking'
    }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://wp-boke.work/api/getClassifyDetails?id=${params.blogID}`)
  const posts = await res.json()

  // Pass post data to the page via props
  return { props: { posts } }
}