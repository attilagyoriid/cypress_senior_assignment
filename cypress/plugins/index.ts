import {cypressTask, getLiveStreamsCount} from '@/cypress/plugins/tasks';

export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on('task', {
    cypressTask,
    getLiveStreamsCount,
  });

  return config;
};
