/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
        pathname: "/american-football/players/**",
      },
    ],
  },
};

module.exports = nextConfig;
// https://media.api-sports.io/american-football/players/
