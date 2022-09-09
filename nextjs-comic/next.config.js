/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "files.fullstack.edu.vn",
      "images.unsplash.com",
      "i0.wp.com",
      "127.0.0.1",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
