const registerVariants = {
    'login': {
        'rendered': 'Login',
        'alts': {
            'routes': ['signup', 'logout'], 
            'render': ['Sign Up', 'Logout']
        }
    },
    'logout': {
        'rendered': 'Logout',
        'alts': {
            'routes': ['login'], 
            'render': ['Login']
        }
    },
    'signup': {
        'rendered': 'Sign Up',
        'alts': {
            'routes': ['login'], 
            'render': ['Login']
        }
    }
}

module.exports = registerVariants;