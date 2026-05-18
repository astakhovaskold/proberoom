import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@proberoom/types': new URL('../../packages/types/src/index.ts', import.meta.url).pathname
        }
    }
})
