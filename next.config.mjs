/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-portfolio.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
