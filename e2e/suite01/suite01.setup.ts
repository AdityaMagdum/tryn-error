import { AccountUtils } from '@niceltd/cxone-playwright-test-utils';
import { FullConfig } from '@playwright/test';

const globalSetup = async (config: FullConfig) => {
    const { userName, password } = await AccountUtils.createRandomTenantForTestExecution();
    await AccountUtils.loginFromGlobalSetup(config, userName, password);
};

export default globalSetup;
