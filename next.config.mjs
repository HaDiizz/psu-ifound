/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
  env: {
    PSU_OPEN_API_SECRET_KEY: process.env.PSU_OPEN_API_SECRET_KEY,
    PSU_OPEN_API_URL: process.env.PSU_OPEN_API_URL,
  },
};

export default nextConfig;
