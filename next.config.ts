import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false, // Disables the ISR indicator on Next.js 14/15
    buildActivity: false, // Disables the build spinner
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder and Cloudinary CDN.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: [
        'localhost:3000',
        '*.run.app',
        '*.googleusercontent.com',
        '*.google.com',
      ],
    },
  },
  serverExternalPackages: ['drizzle-orm', '@neondatabase/serverless', 'bcryptjs', 'cloudinary'],
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
