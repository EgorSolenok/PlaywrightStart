const CONSTANTS = require('../common-data/constants.json')

export const testValues = {
    [CONSTANTS.DEV_ENV]: {
        userFirstName: "Egor",
        invalidLogin: "invalid.owner",
        invalidPassword: "InvalidPassword1!"
    },
    
    [CONSTANTS.PRE_PROD_ENV]: {
        userFirstName: "Egor",
        invalidLogin: "invalid.owner",
        invalidPassword: "InvalidPassword1!"
    },
}