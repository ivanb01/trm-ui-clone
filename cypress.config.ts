import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'vc8qaf',
  chromeWebSecurity: false,
  component: {
    devServer: {
      bundler: 'vite',
      framework: 'react',
      viteConfig: {
        server: {
          host: '127.0.0.1'
        }
      }
    }
  },

  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents() {
      // implement node event listeners here
    }
  },
  supportFolder: 'cypress/support',
  video: true
});
