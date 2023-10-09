// @ts-check
const { test, expect } = require('../../fixtures/base-fixtures.js')
const { getLoginForEnv, getBaseUrlForEnv } = require('../../utils/get-env-data.js')
const CONSTANTS = require('../../common-data/constants.json')

const userMail = getLoginForEnv() + CONSTANTS.DOMAIN_NAME
const timestamp = new Date(Date.now()).toISOString()

test.beforeEach(async ({ page }) => {
    await page.goto(getBaseUrlForEnv()+ CONSTANTS.MAIL_FOLDER_URL)
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('Message subject should be correct', async ({ homePage, newMessagePage }) => {
    await homePage.goToNewMessage()

    await newMessagePage.enterMailAddressee(userMail)
    await newMessagePage.enterMailSubject(CONSTANTS.EMAIL_SUBJECT + timestamp)
    await newMessagePage.openAttachmentOptions()
    await newMessagePage.addAttachementFromComputer(CONSTANTS.ATTACH_FILE_NAME)
    await newMessagePage.enterMessageBody(CONSTANTS.EMAIL_BODY_MESSAGE + timestamp)
    await newMessagePage.sendMessage()

    await homePage.goToSentMessagesFolder()
    await homePage.refreshFolder()

    await expect.soft(homePage.getLastMessageTitle).toHaveAttribute('title', CONSTANTS.EMAIL_SUBJECT + timestamp)
})
