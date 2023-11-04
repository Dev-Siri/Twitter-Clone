/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif"],
    domains: ["firebasestorage.googleapis.com", "storage.googleapis.com"],
  },
};

export default nextConfig;
