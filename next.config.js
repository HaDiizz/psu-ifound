/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    PSU_OPEN_API_SECRET_KEY: process.env.PSU_OPEN_API_SECRET_KEY,
    PSU_OPEN_API_URL: process.env.PSU_OPEN_API_URL,
    ACCESS_TOKEN_MAP_TILE: process.env.ACCESS_TOKEN_MAP_TILE,
  },
};

module.exports = nextConfig;
