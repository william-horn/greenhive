
const passwordErrors = {
    'len': 'Invalid password length'
}

const getPasswordErrorMessage = error => passwordErrors[error.errors[0].validatorKey];

module.exports = {
    getPasswordErrorMessage
}
