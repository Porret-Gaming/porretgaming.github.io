/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    // basePath: '/porretgaming.github.io',
    // assetPrefix: '/porretgaming.github.io',
    basePath: '',
    assetPrefix: '',
    output: 'export', // Ensure static export
    images: {
      unoptimized: true,
    },
  };
  
  export default nextConfig;
  