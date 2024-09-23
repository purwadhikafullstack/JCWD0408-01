/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' }
        ]
    },
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    }
}

module.exports = nextConfig
