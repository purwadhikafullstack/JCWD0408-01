/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' },
            { hostname: "lh3.googleusercontent.com" },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'jcwd040801.purwadhikabootcamp.com',
            },
        ]
    },
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    }
}

module.exports = nextConfig
