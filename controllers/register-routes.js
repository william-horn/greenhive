const router = require('express').Router();
const User = require('../models/User');

/*
    function: GET_root
    
    Respond to all GET requests given the route to the login/signup page. Both login and signup 
    pages are under the '/register' route, with a query parameter called 'variant'. This parameter
    specifies which page to render, and comes in these varieties:

        /register?variant=login
        /register?variant=logout
        /register?variant=signup

    'variant=login' renders the login page
    'variant=logout' renders the home page
    'variant=signup' renders the signup page
*/
const GET_root = (req, res) => {
    const registerVariant = req.query.variant || 'login'; // login | signup | logout

    // logout request
    if (registerVariant === 'logout') {
        req.session.isLoggedIn = false;

        return res.render('home', {
            registerVariant: 'login',
            pageTitle: 'home',
        });
    }

    // render login or signup page depending on 'registerVariant'
    res.render('register', {
        registerVariant,                        
        pageTitle: registerVariant    
    });
}

/*
    function: POST_root
    
    Respond to all POST requests under the '/register' route. This route follows the same
    format as the GET_root callback, using the '/register?variant=x' structure.

    This route is responsible for users logging in, and signing up/creating a new account.
*/
const POST_root = async (req, res) => {
    const userData = req.body;

    // check for existing username
    const existingUser = await User.findOne({
        where: { username: userData.username }
    });

    // user already exists, send error message
    if (existingUser) {
        return res.json('Account already exists');
    }

    // username validation check
    if (!userData.username.trim()) {
        return res.json('Invalid username');
    }

    // begin to create new user account
    User.create({
        username: userData.username,
        password: userData.password,
        page_visits: 1
    });

    req.session.isLoggedIn = true;

    res.status(200).json('Successfully signed up');
}

// set routes
router
    .route('/')
    .get(GET_root)
    .post(POST_root)

module.exports = router;