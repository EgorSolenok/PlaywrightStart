// @ts-check
const { expect } = require('@playwright/test')

exports.WelcomePage = class WelcomePage {

  constructor(page) {
    this.page = page
    this.getLoginButton = page.getByText('Log in')
  }

  async goToLogin() {
    await this.getLoginButton.click()
  }
}
