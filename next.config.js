/** @type {import('next').NextConfig} */
const path = require("path");

const getRobotsPath = () => path.join(__dirname, "public", "robots.txt");
const getSitemapPath = () => path.join(__dirname, "public", "sitemap.xml");
const getDeadChainPath = () => path.join(__dirname, "public", "deadChain.xml");
const getRssPath = () => path.join(__dirname, "public", "rss.xml");
const getImagePath = (v) => path.join(__dirname, "public", "images", v);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.myqcloud.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/rss",
        destination: "/api/rss",
      },
      {
        source: "/robots.txt",
        destination: getRobotsPath(),
      },
      {
        source: "/sitemap.xml",
        destination: getSitemapPath(),
      },
      {
        source: "/deadChain.xml",
        destination: getDeadChainPath(),
      },
      {
        source: "/rss.xml",
        destination: getRssPath(),
      },
      {
        source: "/images/:path*",
        destination: getImagePath(":path*"),
      },
    ];
  },
};

module.exports = nextConfig
