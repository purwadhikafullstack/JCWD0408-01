/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost'},
            { hostname: "lh3.googleusercontent.com" },
        ]
    },
    env: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    }
}

module.exports = nextConfig
