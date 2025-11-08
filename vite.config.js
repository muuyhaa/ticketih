
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🔑 Add the test property for Vitest configuration
  test: {
    // 1. Use 'jsdom' to simulate the browser DOM environment
    environment: 'jsdom',
    
    // 2. Makes global APIs (describe, test, expect) available without import
    globals: true, 
    
    // 3. Setup file to extend 'expect' with testing-library matchers
    setupFiles: './src/test/setup.js', 
    include: ['src/ ** / *. {test, spec}. {ts, tsx}' ]
  }
});