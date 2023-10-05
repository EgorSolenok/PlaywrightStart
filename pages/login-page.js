// @ts-check
const { expect } = require('@playwright/test')

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page
        this.getUsernameInput = page.getByPlaceholder('Username / Email address')
        this.getPasswordInput = page.getByPlaceholder('Password')
        this.getEnterButton = page.getByRole('button', { name: 'Enter' })
        this.showPasswordButton = page.locator('.showPassword')
    }

    async enterCredentials(username, password) {
        await this.getUsernameInput.fill(username)
        await this.getPasswordInput.fill(password)
    }

    async clickEnter() {
        await this.getEnterButton.click()
    }
};