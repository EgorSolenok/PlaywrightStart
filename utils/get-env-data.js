// @ts-check
const { testData } = require('../test-data/dynamic-data')

function getLoginForEnv() {
    return (
        process.env.ENV === 'dev'
            ? process.env.DEV_USER_LOGIN
            : process.env.PREPROD_USER_LOGIN)
        ?? "defaultLogin"
}

function getPasswordForEnv() {
    return (
        process.env.ENV === 'dev'
            ? process.env.DEV_USER_PASSWORD
            : process.env.PREPROD_USER_PASSWORD)
        ?? "defaultPassword"
}

function getTestDataForEnv() {
    return (
        process.env.ENV === 'dev'
            ? testData['dev']
            : testData['pre-prod'])
}

function getUrlForEnv() {
    return process.env.BASE_URL ?? "defaultUrl"
}

export { getLoginForEnv, getPasswordForEnv, getUrlForEnv, getTestDataForEnv }