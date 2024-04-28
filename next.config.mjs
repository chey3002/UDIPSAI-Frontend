/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: process.env['HOST']
    },
}

export default nextConfig;
