/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
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
    removeConsole: true,
  },
  env: {
    PSU_OPEN_API_SECRET_KEY: process.env.PSU_OPEN_API_SECRET_KEY,
    PSU_OPEN_API_URL: process.env.PSU_OPEN_API_URL,
    ACCESS_TOKEN_MAP_TILE: process.env.ACCESS_TOKEN_MAP_TILE,
    BASE_URL_API: process.env.BASE_URL_API,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MSG_SENDER_ID: process.env.FIREBASE_MSG_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
});
module.exports = withPWA(nextConfig);
