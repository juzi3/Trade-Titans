/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-4.api-sports.io",
        port: "",
        pathname: "/american-football/players/**",
      },
    ],
  },
};

module.exports = nextConfig;
// https://media.api-sports.io/american-football/players/
