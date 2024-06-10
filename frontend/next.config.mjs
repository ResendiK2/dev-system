// next.config.mjs
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
