
const registerVariantAliases = {
  'login': {
    rendered: 'Login',
    alts: {
      routes: ['signup', 'logout'], 
      render: ['Sign Up', 'Logout']
    }
  },
  'logout': {
    rendered: 'Logout',
    alts: {
      routes: ['login'], 
      render: ['Login']
    }
  },
  'signup': {
    rendered: 'Sign Up',
    alts: {
      routes: ['login'], 
      render: ['Login']
    }
  }
}

const pageTitleAliases = {
  'login': registerVariantAliases.login.rendered,
  'logout': registerVariantAliases.logout.rendered,
  'signup': registerVariantAliases.signup.rendered,
  'home': 'Home'
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
    getRegisterVariantAlias: (variant, index) => registerVariantAliases[variant][index],
    getPageTitle: variant => pageTitleAliases[variant] || variant,
    not: value => !value,
  };
  