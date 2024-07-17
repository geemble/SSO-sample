/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  headers: [
    {
      sources: "/api/connect",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" },
        { key: "Access-Control-Allow-Methods", value: "POST" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      ]
    }
  ]
};

export default nextConfig;
