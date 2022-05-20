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

// regex placeholder for string template: '$(variable)'
const placeholder = /\$\((.*?)\)/g;

/*
    object of response message aliases
*/
const responses = {

    errorMessages: {

        passwordValidationMessages: {
            len: 'Invalid password length'
        },

        usernameTaken: 'This username already exists',
        signupFailed: 'Account creation was unsuccessful',
        loginFailed: 'Invalid login credentials',
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

        passwordCriteria: 'Password must be at least $(minLength) characters',
        accountConfirmation: 'You have created a new account: $(username)'

    }

}

const {
    errorMessages,
    successMessages,
    infoMessages
} = responses;

const getPasswordErrorMessage = error => {
    const specificMessage = errorMessages.passwordValidationMessages[error.errors[0].validatorKey];
    return specificMessage || errorMessages.passwordFailed;
}

const getPasswordCriteriaMessage = criteria => {
    const template = infoMessages.passwordCriteria;
    return template.replace(placeholder, (_, cap) => criteria[cap]);
}

const getAccountConfirmationMessage = username => {
    return infoMessages.accountConfirmation.replace(placeholder, username);
}

module.exports = {
    errorMessages,
    successMessages,
    infoMessages,
    getPasswordErrorMessage,
    getPasswordCriteriaMessage,
    getAccountConfirmationMessage
};