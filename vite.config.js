import { resolve } from 'path';
import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import { crx3 } from 'vite-plugin-vue-crx3';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [commonjs(), vue(), crx3()],
  build: {
    target: 'es2015',
    rollupOptions: {
      input: resolve(__dirname, 'src/manifest.json'),
    },
  },
});
