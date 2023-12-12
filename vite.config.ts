import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                // config the target url based on your backend server
                target: 'http://165.22.93.68:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [
        react({
            babel: {
                plugins: ['babel-plugin-macros'],
            },
        }),

        dynamicImport(),
    ],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'build',
        assetsDir: 'assets',
        emptyOutDir: true,
    },
})
