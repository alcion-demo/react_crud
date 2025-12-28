import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/app.tsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
      resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/ts'),
        },
        },
        server: {
        host: true,
        port: 5173,
        strictPort: true,
        hmr: {
        host: 'localhost',
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
            usePolling: true,
            interval: 300,
        },
    },
});
