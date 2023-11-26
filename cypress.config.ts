import { defineConfig } from 'cypress'

export default defineConfig({
    viewportHeight: 960,
    viewportWidth: 1536,
    defaultCommandTimeout: 8000,
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
})
