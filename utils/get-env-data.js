// @ts-check
const { testValues } = require('../test-data/dynamic-data')
const CONSTANTS = require('../common-data/constants.json')

function getLoginForEnv() {
    return (
        process.env.ENV === CONSTANTS.DEV_ENV
            ? process.env.DEV_USER_LOGIN
            : process.env.PREPROD_USER_LOGIN)
        ?? CONSTANTS.DEFAULT_VALUE
}

function getPasswordForEnv() {
    return (
        process.env.ENV === CONSTANTS.DEV_ENV
            ? process.env.DEV_USER_PASSWORD
            : process.env.PREPROD_USER_PASSWORD)
        ?? CONSTANTS.DEFAULT_VALUE
}

function getTestDataForEnv() {
    return (
        process.env.ENV === CONSTANTS.DEV_ENV
            ? testValues[CONSTANTS.DEV_ENV]
            : testValues[CONSTANTS.PRE_PROD_ENV])
}

function getBaseUrlForEnv() {
    return process.env.BASE_URL ?? CONSTANTS.DEFAULT_VALUE
}

export { getLoginForEnv, getPasswordForEnv, getBaseUrlForEnv, getTestDataForEnv }
