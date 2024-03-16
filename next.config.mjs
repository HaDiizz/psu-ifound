/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: '**',
      },
    ],
  },
  env: {
    PSU_OPEN_API_SECRET_KEY: process.env.PSU_OPEN_API_SECRET_KEY,
    PSU_OPEN_API_URL: process.env.PSU_OPEN_API_URL,
    ACCESS_TOKEN_MAP_TILE: process.env.ACCESS_TOKEN_MAP_TILE,
  },
};

export default nextConfig;
