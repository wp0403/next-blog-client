/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-01 17:19:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-26 14:50:10
 */
import fs from 'fs';
import RSS from 'rss';

const rss = async (req, res) => {
    const feed = new RSS({
        title: 'Shimmer RSS',
        description: 'shimmer博客的rss',
        feed_url: 'https://wp-boke.work/rss.xml',
        site_url: 'https://wp-boke.work',
        language: 'zh-CN',
        pubDate: new Date(),
    });

    // 调用外部 API 获取内容
    const classifyObj = await fetch(
        `https://shimmer.wp-boke.work/api/getClassifyList?page=`
    );
    const classifyList = (await classifyObj.json()).data;

    classifyList?.map(v => {
        feed.item({
            title: v.title,
            description: v.desc,
            url: `https://wp-boke.work/blog-details/${v.id}`,
            author: v.userInfo?.name,
            date: v.time_str,
        });
    })

    const rssContent = feed.xml();

    // Write headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=0.1, must-revalidate');

    const isVercel = process.env.IS_VERCEL;
    if (!isVercel) {
        const sitemapPath = './public/rss.xml';
        fs.writeFileSync(sitemapPath, rssContent);
    }

    // Write the XML to the response
    res.write(rssContent);
    res.end();
};

export default rss;
