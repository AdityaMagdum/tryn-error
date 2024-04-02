import { PlaywrightTestConfig } from '@playwright/test';
import { GetBaseConfig } from '@niceltd/cxone-playwright-test-utils';

const baseConfig = GetBaseConfig('suite04');
const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    storageState: 'storage.json'
  },
  globalSetup: require.resolve('./suite04.setup')
};
export default config;

