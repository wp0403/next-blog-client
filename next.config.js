/** @type {import('next').NextConfig} */
const path = require("path");

const getRobotsPath = () => path.join(__dirname, "public", "robots.txt");
const getSitemapPath = () => path.join(__dirname, "public", "sitemap.xml");
const getDeadChainPath = () => path.join(__dirname, "public", "deadChain.xml");

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
        source: "/api",
        destination: "/",
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
    ];
  },
};

module.exports = nextConfig
