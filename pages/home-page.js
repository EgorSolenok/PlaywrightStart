// @ts-check
const { expect } = require('@playwright/test')

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page
    this.getUserMailMenuHeader = page.locator('div.treeItemLabel').first()
    this.getUserProfileName = page.locator('div.user span')
    this.getNewMessageButton = page.getByTitle('New')
    this.getSentFolderButton = page.getByText('Sent')
    this.getRefreshButton = page.getByText('Refresh')
    this.getLastMessageTitle = page.locator('div.listSubject').first()
  }

  async goToNewMessage() {
    await this.getNewMessageButton.click()
  }

  async goToSentMessagesFolder() {
    await this.getSentFolderButton.click()
  }

  async refreshFolder() {
    await this.getRefreshButton.click()
  }
};