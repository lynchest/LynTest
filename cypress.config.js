
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/specs/**/*.spec.ts', // Updated to match existing spec files
    baseUrl: 'http://localhost:3030', // Updated to match Vite dev server port
  },
});
