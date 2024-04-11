import 'dotenv/config';
import {defineConfig} from 'cypress';
import tasks from '@/cypress/plugins';

export default defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Streaming webapp test',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_HOST || 'https://bit.ly/cytest',
    setupNodeEvents(on, config) {
      tasks(on, config);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env: {
    CYPRESS_HOST: process.env.CYPRESS_HOST,
  },
});
