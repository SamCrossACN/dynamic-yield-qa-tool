import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Private-Network': 'true',
    },
  },
  plugins: [
    react({ jsxRuntime: 'classic' }),
    monkey({
      entry: 'src/index.tsx',
      userscript: {
        name: 'Myer QA Tool (React)',
        namespace: 'http://tampermonkey.net/',
        version: '2.2',
        description: 'Myer DY QA Tool',
        author: 'Sam Cross sam.cross@accenture.com',
        match: [
          '*://*.myer.com.au/*'
        ],
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=dynamicyield.com',
        require: [
          'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
          'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
        ],
        grant: [ 'GM_addStyle' ],
      },
      build: {
        fileName: 'TL_QA_Tool.js',
        externalGlobals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
        },
      },
    }),
  ],
});
