
const registerVariants = require('./register-variants');

const pageTitles = {
    'login': registerVariants.login.rendered,
    'signup': registerVariants.signup.rendered,
    'home': 'Home'
}

module.exports = pageTitles;
