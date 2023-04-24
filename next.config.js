/** @type {import('next').NextConfig} */
const path = require("path");

const getRobotsPath = () => path.join(__dirname, "public", "robots.txt");
const getSitemapPath = () => path.join(__dirname, "public", "sitemap.xml");

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
  serverless: {
    pages: {
      "/api/*": {
        endpoint: "pages/api/*",
      },
    },
  },
  withNextEnv: {
    getRobotsTxtOptions: () => ({
      filePath: getRobotsPath(),
    }),
    getServerRuntimeConfig: () => ({
      sitemapPath: getSitemapPath(),
    }),
  },
  webpack: (config, { dev }) => {
    config.buildDeadChain = !dev ? './public/dead-chain.xml' : null;
    return config;
  },
};

module.exports = nextConfig
