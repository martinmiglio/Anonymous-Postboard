/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  assetPrefix: isProd ? "/anon-post-board" : undefined,
};

module.exports = nextConfig;
