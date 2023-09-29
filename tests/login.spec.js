// @ts-check
const { test, expect } = require('@playwright/test');
const { WelcomePage } = require('../pages/welcome-page');
const { LoginPage } = require('../pages/login-page');
const { HomePage } = require('../pages/home-page');

const devTestData = require('../test-data/dev/test-data.json');
const preProdTestData = require('../test-data/pre-prod/test-data.json');

const serviceUrl = process.env.BASE_URL ?? "defaultUrl"
const actualPassword = (process.env.ENV === 'dev' ? process.env.DEV_USER_PASSWORD : process.env.PREPROD_USER_PASSWORD) ?? "defaultPassword"
const actualLogin = (process.env.ENV === 'dev' ? process.env.DEV_USER_LOGIN : process.env.PREPROD_USER_LOGIN) ?? "defaultLogin"
const actualUserFirstName = (process.env.ENV === 'dev' ? devTestData.userFirstName : preProdTestData.userFirstName) ?? "defaultFirstName"

test.beforeEach(async ({ page }) => {
    await page.goto(serviceUrl);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe('@smoke - Login', () => {
    test('@smoke - Should login to service', async ({ page }) => {
        const welcomePage = new WelcomePage(page);
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await welcomePage.goToLogin();
        await loginPage.enterCredentials(actualLogin, actualPassword);
        await loginPage.clickEnter();

        await expect(homePage.getUserMailMenuHeader).toBeVisible();
        await expect(homePage.getUserMailMenuHeader).toContainText(actualLogin);
        await expect(homePage.getUserProfileName).toHaveText(actualUserFirstName);
    });
});
