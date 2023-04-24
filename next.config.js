/** @type {import('next').NextConfig} */
const path = require("path");

const getRobotsPath = () => path.join(__dirname, "public", "robots.txt");

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
  },
};

module.exports = nextConfig
