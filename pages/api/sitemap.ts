/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-04-24 15:00:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-13 18:32:51
 */
import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const sitemap = async (req, res) => {
    // Create a Sitemap stream
    const sitemapStream = new SitemapStream({
        hostname: 'https://wp-boke.work'
    });

    // Write headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=0.1, must-revalidate');

    // Add URLs to the Sitemap stream
    const pages = [
        '/', '/archive', '/tree-hole', '/photography', '/about', '/resume',
        '/friendly-links', '/disclaimers', '/copyright-notice'
    ];
    pages?.map(v => sitemapStream.write({ url: `${v}` }))

    // 调用外部 API 获取内容
    const classifyObj = await fetch(
        `https://shimmer.wp-boke.work/api/getClassifyList?page=`
    );
    const classifyList = (await classifyObj.json()).data;

    classifyList?.map(v =>
        sitemapStream.write({
            url: `/blog-details/${v.id}`
        })
    )
    // ...

    // End the stream
    sitemapStream.end();

    // Generate the XML
    const sitemap = await streamToPromise(sitemapStream);

    const sitemapPath = './public/sitemap.xml';
    fs.writeFileSync(sitemapPath, sitemap);

    // Write the XML to the response
    res.write(sitemap);
    res.end();
};

export default sitemap;
