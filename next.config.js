/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Added for static HTML export
  basePath: '/AegisFlow',  // Added to fix broken paths on repository subfolders
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,     // Changed to true (mandatory for static exports)
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  experimental: {
    esmExternals: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

module.exports = nextConfig;
