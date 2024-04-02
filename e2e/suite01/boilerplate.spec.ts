import { test, expect, EnvUtils } from '@niceltd/cxone-playwright-test-utils';

test.describe(() => {

    test('Say Hello', async ({ page }) => {
        const baseUrl = EnvUtils.getBaseUrl();
        console.log('going to ', `${baseUrl}/agent-profile/#/hello`);
        await page.goto(`${baseUrl}/agent-profile/#/hello`);
        const name = await page.innerText('h1');
        expect(name).toBe('Angular Validation Page');

        await page.locator('#requestData').click();
        await page.locator('#testSpinner').click();
        await page.locator('#convertResponse').click();
    });
});
