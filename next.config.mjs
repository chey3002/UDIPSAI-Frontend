import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
    reactStrictMode: true,
    env: {
        BASE_URL: process.env['HOST']
    },
})

export default nextConfig;
