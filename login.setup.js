// @ts-check
const { test } = require('./fixtures/base-fixtures')
const { STORAGE_STATE_PATH } = require('./common-data/paths.json')
const { getBaseUrlForEnv } = require('./utils/get-env-data')

test.beforeEach(async ({ page }) => {
    await page.goto(getBaseUrlForEnv())
})

test('Login into service', async ({ page, loginFixture }) => {
    await page.context().storageState({ path: STORAGE_STATE_PATH })
})
