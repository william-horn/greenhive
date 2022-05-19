const renderedRegisterVariantAliases = {
  'login': 'Login',
  'logout': 'Logout',
  'signup': 'Sign Up'
}

const renderedRegisterAntiAliases = {
  'login': 'Sign Up',
  'signup': 'Login'
}

const registerAntiAliases = {
  'login': 'signup',
  'signup': 'login'
}

module.exports = {
    formatTime: (date) => {
      return date.toLocaleTimeString();
    },
    formatDate: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear() 
      }`;
    },
    renderRegisterText: variant => renderedRegisterVariantAliases[variant],
    renderAltRegisterText: variant => renderedRegisterAntiAliases[variant],
    getAltRegisterVariant: variant => registerAntiAliases[variant],
    not: value => !value,
  };
  