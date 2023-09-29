const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    this.getUserMailMenuHeader = page.locator('div.treeItemLabel').first();
    this.getUserProfileName = page.locator('div.user span');
  }
};