/*
=====================
| RESPONSE MESSAGES |
==================================================================================================================================

? @doc-name:            response-messages.js
? @doc-created:         05/17/2022
? @doc-modified:        05/20/2022

==================================================================================================================================

? @doc-info
==================
| ABOUT DOCUMENT |
==================================================================================================================================

This document is responsible for centralizing all significant debug and display messages for back-end processing.

==================================================================================================================================
*/

const { accountSettings } = require('../user_settings');
const { passwordCriteria, usernameCriteria } = accountSettings;

// regex placeholder for string template: '$(variable)'
const placeholder = /\$\((.*?)\)/g;

/*
    object of response message aliases
*/
const responses = {

    validationMessages: {

        password: {
            len: {
                short: 'Invalid password length',
                long: 'Password must be between ' + passwordCriteria.minLength + ' and ' + passwordCriteria.maxLength + ' characters'
            },
            notEmpty: {
                short: 'Invalid password',
                long: 'Password must have at least one non-space character'
            }
        },

        username: {
            len: {
                short: 'Invalid username length',
                long: 'Username must be between ' + usernameCriteria.minLength + ' and ' + usernameCriteria.maxLength + ' characters'
            },
            notEmpty: {
                short: 'Invalid username',
                long: 'Username must have at least one non-space character'
            }
        }
    },

    errorMessages: {

        usernameTaken: 'This username already exists',
        signupFailed: 'Account creation was unsuccessful',
        loginFailed: 'Invalid login credentials',
        passwordFailed: 'Password failed',
        loginUsernameFailed: 'An account with this username does not exist',
        loginPasswordFailed: 'Incorrect or invalid password',
        signupUsernameFailed: 'An account with this username already exists',
        signupPasswordFailed: 'Invalid password criteria',

    },

    successMessages: {

        loginSuccess: 'Login was successful',
        signupSuccess: 'Account creation was successful',

    },

    infoMessages: {

        accountConfirmation: 'You have created a new account: $(username)',

    }

}

const {
    errorMessages,
    successMessages,
    infoMessages,
    validationMessages
} = responses;

const getSignupValidationError = error => {
    const nextError = error.errors[0];
    let specificMessage = validationMessages[nextError.path][nextError.validatorKey];
    return specificMessage;
}

const getAccountConfirmationMessage = username => {
    return infoMessages.accountConfirmation
        .replace(placeholder, username);
}

module.exports = {
    errorMessages,
    successMessages,
    infoMessages,
    validationMessages,
    getSignupValidationError,
    getAccountConfirmationMessage,
};