/** @type {import('next').NextConfig} */

const nextConfig = {
  // TypeScript and ESLint configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src', 'lib', 'pages'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      { hostname: '*.mapbox.com' },
      { hostname: 'api.dicebear.com' },
      { hostname: '*.supabase.co' },
      { hostname: 'tiles.stadiamaps.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(self), microphone=(), camera=()',
        },
      ],
    },
  ],

  // Environment variables
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['zustand', 'recharts', 'framer-motion', 'lucide-react'],
    isrMemoryCacheSize: 52 * 1024 * 1024, // 52MB
  },

  // Build optimization
  swcMinify: true,
  compress: true,

  // Production source maps (development only)
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_APP_ENV === 'development',

  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
            mapbox: {
              name: 'mapbox',
              test: /[\\/]node_modules[\\/](mapbox-gl|react-map-gl)[\\/]/,
              priority: 9,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
