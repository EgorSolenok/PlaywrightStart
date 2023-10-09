// @ts-check
const { test, expect } = require('../fixtures/base-fixtures.js')
const CONSTANTS = require('../common-data/constants.json')
const {
    getLoginForEnv,
    getPasswordForEnv,
    getBaseUrlForEnv,
    getTestDataForEnv } = require('../utils/get-env-data.js')

const testData = getTestDataForEnv()
const validPassword = getPasswordForEnv()
const validLogin = getLoginForEnv()

test.describe('@smoke - Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(getBaseUrlForEnv())
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('Should login to service', async ({ welcomePage, loginPage, homePage }) => {

        await welcomePage.goToLogin()
        await loginPage.enterCredentials(validLogin, validPassword)
        await loginPage.clickEnter()

        await expect.soft(homePage.getUserMailMenuHeader).toBeVisible()
        await expect.soft(homePage.getUserMailMenuHeader).toContainText(validLogin)
        await expect.soft(homePage.getUserProfileName).toHaveText(testData.userFirstName)
    })

    test('Should fail login - invalid login', async ({ welcomePage, loginPage }) => {

        await welcomePage.goToLogin()
        await loginPage.enterCredentials(testData.invalidLogin, validPassword)
        await loginPage.clickEnter()

        await expect(loginPage.getPasswordInput).toHaveCSS('border', CONSTANTS.ERROR_LOGIN_BORDER_STYLE)
    })

    test('Should login to service - invalid password', async ({ welcomePage, loginPage }) => {

        await welcomePage.goToLogin()
        await loginPage.enterCredentials(validLogin, testData.invalidPassword)
        await loginPage.clickEnter()

        await expect(loginPage.getPasswordInput).toHaveCSS('border', CONSTANTS.ERROR_LOGIN_BORDER_STYLE)
    })
})
