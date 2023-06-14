import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint'
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
    plugins: [react(), eslint(), removeConsole()],
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
