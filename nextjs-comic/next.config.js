/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["files.fullstack.edu.vn", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
