import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
    plugins: [react(), removeConsole()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            },
        },
    },
    build: {
        outDir: '../build'
    }
});
