import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';


// Carrega as variáveis do .env
dotenv.config();

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);

export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.includes('swiper-') } } }),
  ],
  root: SRC_DIR,
  base: '/',
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false,
    },
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
  server: {
    port: 3000,
    host: true
  },
  define: {
    'process.env': process.env
  }
});
