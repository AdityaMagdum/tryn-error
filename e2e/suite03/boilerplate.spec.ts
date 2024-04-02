import { test, expect, EnvUtils, PageObjects } from '@niceltd/cxone-playwright-test-utils';

test.describe(() => {
    test('Sol Demo Page', async ({ page }) => {
        const baseUrl = EnvUtils.getBaseUrl();
        await page.goto(`${baseUrl}/cxone-boilerplate/#/sol-demo`);
        const name = await page.innerText('h3');
        expect(name).toBe('Sol Components Integration Demo');
    });
});
