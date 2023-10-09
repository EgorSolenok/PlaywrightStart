// @ts-check
const base = require('@playwright/test')
const { HomePage } = require('../pages/home-page')
const { LoginPage } = require('../pages/login-page')
const { WelcomePage } = require('../pages/welcome-page')
const { getLoginForEnv, getPasswordForEnv } = require('../utils/get-env-data')
const { NewMessagePage } = require('../pages/new-message-page')

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },

    welcomePage: async ({ page }, use) => {
        await use(new WelcomePage(page))
    },

    newMessagePage: async ({ page }, use) => {
        await use(new NewMessagePage(page))
    },

    loginFixture: async ({ welcomePage, loginPage }, use) => {
        const password = getPasswordForEnv()
        const login = getLoginForEnv()

        await welcomePage.goToLogin()
        await loginPage.enterCredentials(login, password)
        await loginPage.clickEnter()
        // @ts-ignore
        await use()
    }
})

exports.expect = base.expect
