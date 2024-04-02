import { test, expect, EnvUtils, createContextWithCoverage, saveCoverage } from '@niceltd/cxone-playwright-test-utils';
import { BrowserContext, Page } from '@playwright/test';

const ELEMENTS = {
    webWorkerWrapper: '.web-worker-playground',
    webWorkerTitle: '.web-worker-playground > h2',
    webWorkerButtons: '.web-worker-playground > .buttons',
    createNewWWBtn: '.web-worker-playground > .buttons #createWebWorker',
    sendHttpMsgToWWBtn: '.web-worker-playground > .buttons #sendHttpMsg',
    connectWWToNotificationBtn: '.web-worker-playground > .buttons #connectWebWorkerToWS',
    inAppNotificationBtn: '.web-worker-playground > .buttons #inAppNotificationWebWorker',
    sendCustomMsgToWWBtn: '.web-worker-playground > .buttons #sendCustomMsg',
    terminateWWBtn: '.web-worker-playground > .buttons #terminateWebWorker',
    wwAliveIndicator: '.web-worker-playground #webWorkerAlive',
    wwDeadIndicator: '.web-worker-playground #webWorkerDead',
    wwModalWrapper: '.sol-modal-wrapper',
    wwModalBodyMessage: '.sol-modal-wrapper > .modal-body-wrapper .body-message',
    wwModalCloseBtn: '.sol-modal-wrapper .modal-footer-wrapper sol-button > .btn-primary-large',
    badgeNotificationElm: '.notification-panel .badge'
};

test.describe(() => {
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        context = await createContextWithCoverage(browser);
        page = await context.newPage();
    });

    test.afterAll(async () => {
        await saveCoverage(context);
    });

    test('Web Worker Notification Demo Page', async () => {
        const baseUrl = EnvUtils.getBaseUrl();
        await page.goto(`${baseUrl}/cxone-boilerplate/#/hello`);
        const name = await page.innerText(ELEMENTS.webWorkerTitle);
        expect(name).toBe('Web Worker Playground');
    });

    test('should create a web worker successfully', async () => {
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeFalsy();
        expect(await page.locator(ELEMENTS.wwDeadIndicator).isVisible()).toBeTruthy();
        await page.locator(ELEMENTS.createNewWWBtn).click();
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeTruthy();
        expect(await page.locator(ELEMENTS.wwDeadIndicator).isVisible()).toBeFalsy();
    });

    test('should create a web worker & send a custom message to it', async () => {
        await page.locator(ELEMENTS.createNewWWBtn).click();
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeTruthy();
        await page.locator(ELEMENTS.sendCustomMsgToWWBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper);
        expect(await page.locator(ELEMENTS.wwModalBodyMessage).innerText()).toContain('sending \'Hello\' back');
        await page.locator(ELEMENTS.wwModalCloseBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper, { state: 'hidden' });
        expect(await page.locator(ELEMENTS.wwModalWrapper).isVisible()).toBeFalsy();
    });

    test('should make an HTTP call from web worker successfully', async () => {
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeTruthy();
        await page.locator(ELEMENTS.sendHttpMsgToWWBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper);
        expect(await page.locator(ELEMENTS.wwModalBodyMessage).innerText()).toContain('dashboard');
        await page.locator(ELEMENTS.wwModalCloseBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper, { state: 'hidden' });
        expect(await page.locator(ELEMENTS.wwModalWrapper).isVisible()).toBeFalsy();
    });

    test('should connect web worker to notification service successfully', async () => {
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeTruthy();
        await page.locator(ELEMENTS.connectWWToNotificationBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper);
        expect(await page.locator(ELEMENTS.wwModalBodyMessage).innerText()).toContain('connected to the WS');
        await page.locator(ELEMENTS.wwModalCloseBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper, { state: 'hidden' });
        expect(await page.locator(ELEMENTS.wwModalWrapper).isVisible()).toBeFalsy();
    });

    test('should receive IN_APP notification from web worker', async () => {
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeTruthy();
        expect(await page.locator(ELEMENTS.badgeNotificationElm).isVisible()).toBeFalsy();
        await page.locator(ELEMENTS.inAppNotificationBtn).click();
        await page.waitForSelector(ELEMENTS.wwModalWrapper);
        expect(await page.locator(ELEMENTS.wwModalBodyMessage).first().innerText()).toContain('IN_APP message');
        const closeButtons = await page.$$(ELEMENTS.wwModalCloseBtn);
        await closeButtons.forEach(button => button.click());
        await page.waitForSelector(ELEMENTS.wwModalWrapper, { state: 'hidden' });
        expect(await page.locator(ELEMENTS.wwModalWrapper).isVisible()).toBeFalsy();
        expect(await page.locator(ELEMENTS.badgeNotificationElm).isVisible()).toBeTruthy();
    });

    test('should terminate the web worker successfully', async () => {
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeTruthy();
        await page.locator(ELEMENTS.terminateWWBtn).click();
        expect(await page.locator(ELEMENTS.wwAliveIndicator).isVisible()).toBeFalsy();
        expect(await page.locator(ELEMENTS.wwDeadIndicator).isVisible()).toBeTruthy();
    });
});
