import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
    reactStrictMode: false,
    env: {
        APIURL: process.env['APIURL']
    },
})

export default nextConfig;
