/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'items-images-production.s3.us-west-2.amazonaws.com',
                port: '',
                pathname: '/files/**',
            },
        ],
    },
}

module.exports = nextConfig
