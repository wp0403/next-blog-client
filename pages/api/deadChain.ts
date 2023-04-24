/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-04-24 16:10:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-04-24 16:14:58
 */
import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

export default async (req, res) => {
    // Create a Sitemap stream
    const sitemapStream = new SitemapStream({
        hostname: 'https://wp-boke.work'
    });

    // Write headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=0.1, must-revalidate');

    // Add URLs to the Sitemap stream
    const pages = ['/blog-details/38', '/secret', '/blog-details/45'];
    pages?.map(v => sitemapStream.write({ url: `${v}` }))
    // ...

    // End the stream
    sitemapStream.end();

    // Generate the XML
    const sitemap = await streamToPromise(sitemapStream);

    const sitemapPath = './public/deadChain.xml';
    fs.writeFileSync(sitemapPath, sitemap);

    // Write the XML to the response
    res.write(sitemap);
    res.end();
};
