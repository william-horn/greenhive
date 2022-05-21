
const registerVariantAliases = require('../aliases/register-variants');
const pageTitleAliases = require('../aliases/page-titles');

module.exports = {
    formatTime: date => date.toLocaleTimeString(),
    formatDate: date => `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`,
    getRegisterVariantAlias: (variant, index) => registerVariantAliases[variant][index],
    getPageTitle: variant => pageTitleAliases[variant] || variant,
    not: value => !value,
  };
  