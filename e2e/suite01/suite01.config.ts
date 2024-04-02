import { PlaywrightTestConfig } from '@playwright/test';
import { GetBaseConfig } from '@niceltd/cxone-playwright-test-utils';

const baseConfig = GetBaseConfig('suite01');
const config: PlaywrightTestConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    storageState: 'storage.json'
  },
  globalSetup: require.resolve('./suite01.setup')
};
export default config;

