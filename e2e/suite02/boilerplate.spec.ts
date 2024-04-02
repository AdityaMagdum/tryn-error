import { test, expect, EnvUtils, PageObjects } from '@niceltd/cxone-playwright-test-utils';

test.describe(() => {
    test('Grid Page', async ({ page }) => {
        const baseUrl = EnvUtils.getBaseUrl();
        await page.goto(`${baseUrl}/cxone-boilerplate/#/grid`);
        const name = await page.innerText('h1');
        expect(name).toBe('Grid Demo (enterprise version)');
    });
});
