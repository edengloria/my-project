/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-project',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
