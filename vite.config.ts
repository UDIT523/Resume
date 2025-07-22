import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import upload from './vite-plugin-upload';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), upload()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
