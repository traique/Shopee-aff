/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cf.shopee.vn",
      },
    ],
  },
};

module.exports = nextConfig;
