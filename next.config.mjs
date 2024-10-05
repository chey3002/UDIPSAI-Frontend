import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
    reactStrictMode: false,
    env: {
        APIURL: process.env['APIURL'],
        APIKEY: process.env['APIKEY'],
    },
    images: {
        // Permitir todas las fuentes de imágenes
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Permitir cualquier dominio
                port: '',      // No especificar un puerto
                pathname: '**', // Permitir cualquier ruta
            },
        ],
    },
});

export default nextConfig;
