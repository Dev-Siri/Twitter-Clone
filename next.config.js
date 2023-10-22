/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack(config, { dev }) {
    if (!dev)
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: "all",
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendors: false,
          },
        },
        runtimeChunk: false,
        usedExports: true,
        sideEffects: true,
        moduleIds: "deterministic",
      };

    return config;
  },
};

export default nextConfig;
