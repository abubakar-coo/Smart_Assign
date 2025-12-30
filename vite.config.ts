import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Performance optimizations
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // Core React - must be in its own chunk and load first
            if (id.includes('/react-dom/') || id.includes('/react/')) {
              return 'vendor-react';
            }
            // React ecosystem that depends on React context
            if (id.includes('react-router') || 
                id.includes('next-themes') || 
                id.includes('@tanstack')) {
              return 'vendor-react-ecosystem';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // Other node_modules - no catch-all to avoid issues
          }
        }
      }
    },
    // Enable minification
    minify: 'esbuild',
    // Source maps only in dev
    sourcemap: false,
    // Optimize asset handling
    assetsInlineLimit: 4096,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lovable-tagger']
  }
}));
