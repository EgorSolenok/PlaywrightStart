// @ts-check
const { test, expect } = require('../../fixtures/base-fixtures.js')
const { getLoginForEnv, getUrlForEnv } = require('../../utils/get-env-data.js')
const commonData = require('../../common-data/constants.json')

const userMail = getLoginForEnv() + commonData.DOMAIN_NAME
const timestamp = new Date(Date.now()).toISOString()

test.beforeEach(async ({ page }) => {
    await page.goto(getUrlForEnv())
});

test.afterEach(async ({ page }) => {
    await page.close()
});

test('Message subject should be correct', async ({ loginFixture, homePage, newMessagePage }) => {
    await homePage.goToNewMessage()

    await newMessagePage.enterMailAddressee(userMail)
    await newMessagePage.enterMailSubject(commonData.EMAIL_SUBJECT + timestamp)
    await newMessagePage.openAttachmentOptions()
    await newMessagePage.addAttachementFromComputer(commonData.ATTACH_FILE_NAME)
    await newMessagePage.enterMessageBody(commonData.EMAIL_BODY_MESSAGE + timestamp)
    await newMessagePage.sendMessage()

    await homePage.goToSentMessagesFolder()
    await homePage.refreshFolder()

    await expect.soft(homePage.getLastMessageTitle).toHaveAttribute('title', commonData.EMAIL_SUBJECT + timestamp)
});

