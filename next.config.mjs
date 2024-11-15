import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Add alias for @images directory
    config.resolve.alias['@images'] = path.join(process.cwd(), 'public/images');
    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
