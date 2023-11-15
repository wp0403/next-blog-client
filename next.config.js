/** @type {import('next').NextConfig} */
const path = require("path");
const withCSS = require("@zeit/next-css");

const getRobotsPath = () => path.join(__dirname, "public", "robots.txt");
const getSitemapPath = () => path.join(__dirname, "public", "sitemap.xml");
const getDeadChainPath = () => path.join(__dirname, "public", "deadChain.xml");
const getRssPath = () => path.join(__dirname, "public", "rss.xml");
const getImagePath = (v) => path.join(__dirname, "public", "images", v);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  presets: ["next/babel"],
  plugins: [
    // 其他插件...
    process.env.NODE_ENV === "production" &&
      "babel-plugin-transform-remove-console",
  ].filter(Boolean),
  withCSS: withCSS(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.myqcloud.com",
      },
      {
        protocol: "https",
        hostname: "img.foreverblog.cn",
      },
    ],
  },
  rewrites: () => {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/deadChain.xml",
        destination: "/api/deadChain",
      },
      {
        source: "/rss.xml",
        destination: "/api/rss",
      },
      {
        source: "/robots.txt",
        destination: getRobotsPath(),
      },
      {
        source: "/public/sitemap.xml",
        destination: getSitemapPath(),
      },
      {
        source: "/public/deadChain.xml",
        destination: getDeadChainPath(),
      },
      {
        source: "/public/rss.xml",
        destination: getRssPath(),
      },
      {
        source: "/public/images/:path*",
        destination: getImagePath(":path*"),
      },
      {
        source: "/js/:path*",
        destination:
          "https://wp-1302605407.cos.ap-beijing.myqcloud.com/js/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
