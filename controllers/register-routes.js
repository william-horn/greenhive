/*
==================
| SERVER-ROUTING |
==================================================================================================================================

? @doc-name:            register-routes.js
? @doc-created:         05/17/2022
? @doc-modified:        05/20/2022

==================================================================================================================================

? @doc-info
==================
| ABOUT DOCUMENT |
==================================================================================================================================

This document is responsible for the handling and processing of incoming web requests from the client. Such requests include
login and signup validation, webpage rendering, and other miscellaneous requests.

==================================================================================================================================

? @doc-todo
=================
| DOCUMENT TODO |
==================================================================================================================================
-   None
==================================================================================================================================
*/

/* -------------- */
/* Import modules */
/* -------------- */
const router = require('express').Router();
const { getPasswordErrorMessage } = require('../aliases/password-messages');
const User = require('../models/User');

/*
    Custom middleware for '/register' routes. This middleware just adds a 'registerVariant' property to
    the request object, which parses the url for the 'variant' query parameter. Effectively turning this:
        /register?variant=something
    into this:
        req.registerVariant = 'something'
*/
const setRegisterVariant = (req, res, next) => {
    const registerVariant = req.query.variant || 'login'; // login | signup | logout
    req.registerVariant = registerVariant;
    next();
}

// user /register router middleware
router.use(setRegisterVariant);

/*
    Function Callback: GET_root
    
    Respond to all GET requests given the route to the login/signup page. Both login and signup 
    pages are under the '/register' route, with a query parameter called 'variant'. This parameter
    specifies which page to render, and comes in these varieties: 'login', 'signup', 'logout'

    example:
        /register?variant=login
        /register?variant=logout
        /register?variant=signup

    'variant=login' renders the login page
    'variant=logout' renders the home page
    'variant=signup' renders the signup page

    BOTH /register?variant=login AND /register?variant=signup routes have GET and POST
    listeners, HOWEVER /register?variant=logout ONLY has a GET listener.
*/
const GET_root = (req, res) => {
    const registerVariant = req.registerVariant; // login | signup | logout

    /*
    when the user logs out, they will be directed back to the homepage 
    and the session should recognize that they are logged out
    */
    if (registerVariant === 'logout') {
        req.session.isLoggedIn = false;

        return res.render('home', {
            registerVariant: 'login',
            pageTitle: 'home',
        });
    }

    /*
    if the user is logged in then send them back to the homepage to prevent the
    ability to login multiple times -- which doesn't make any sense
    */
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }

    /* 
    by this point the user is permitted to login or signup, and the
    webpages for those forms will be sent to the client
    */
    res.render('register', {
        registerVariant,                        
        pageTitle: registerVariant    
    });
}

/*
    Function Callback: POST_root
    
    Respond to all POST requests under the '/register' route. This route follows the same
    format as the GET_root callback, using the '/register?variant=x' structure.

    This route is responsible for users logging in, and signing up/creating a new account.
    Therefore the only routes activating this post request should be as follows:

    /register?variant=login
    /register?variant=signup
*/
const POST_root_signup = async (req, res) => {
    const userData = req.body;

    /*
    here is where the user has been permitted to make a new account with
    the username they have provided, and will now undergo password validation.
    */
    try {
        const signupResult = await User.create({
            username: userData.username,
            password: userData.password,
            page_visits: 1
        })

        /*
        if password validation passed with no errors, then set the user session as
        logged in and send back an ok response.
        */
        req.session.isLoggedIn = true;
        res.status(200).json({
            message: 'Signup successful',
            report: 'Created new account: ' + userData.username
        });

        /*
        if the password validation did NOT pass, then catch the error and send
        a server error back to the client
        */
    } catch(err) {
        res.status(500).json({
            message: 'Password failure',
            report: getPasswordErrorMessage(err),
        });
    }
}

/*
    Function Callback (MIDDLEWARE): POST_root_login

    Middleware:
        * runs before POST_root_signup

    This is a middleware callback that intercepts all POST requests for
    the /register route, for variants: 'login' and 'signup'
    
    Here is where the validation for login requests is handled, and it makes
    one exception for validating a signup request by checking to see if
    an account already exists. All other signup validation is handled in
    the POST_root_signup callback function.
*/
const POST_root_login = async (req, res, next) => {
    const registerVariant = req.registerVariant; // login | signup 
    const userData = req.body;

    /*
    check for an existing user account by matching the usernames in the database
    with the username the client has provided. if the account exists, then the user
    entered a valid username and validation of the password will occur shortly.
    */
    const existingUser = await User.findOne({
        where: { username: userData.username }
    });

    // the requestVariant is 'login', then check the login credentials for the user
    if (registerVariant === 'login') {
        
        /*
        if there is no existing user, then the user has entered an invalid username
        and will not be logged in.
        */
        if (!existingUser) {
            return res.status(500).json({
                message: 'Login failed',
                report: 'Login credentials do not exist'
            });
        }

        /*
        if the existing user does exist, then the client has entered a valid username and
        validation of the password will now occur. If the password validation passes, we
        will send an ok response and user will be directed back to whatever page the 
        front-end code sends them to
        */
        if (existingUser.password === userData.password) {
            req.session.isLoggedIn = true;
            console.log(`User: ${existingUser.username} has successfully logged in`);

            return res.status(200).json({
                message: 'Login successful',
                report: 'User successfully logged in'
            });
        }

        /*
        if the password validation does NOT pass, then the user entered an incorrect password for
        that account and we will send them a server error.
        */
        return res.status(500).json({ 
            message: 'Login failed',
            report: 'Wrong password'
        });
    }

    /*
    if 'existingUser' exists outside of the login request, meaning this is a signup request, then
    the user is not permitted to create the account because it already exists. if this is the case,
    we will send the client a server error.
    */
    if (existingUser) {
        return res.status(500).json({
            message: 'Sign Up failed',
            report: 'This account already exists'
        });
    }

    // go to the POST_root_signup function
    next();
}

/* ------------------- */
/* Set Route Listeners */
/* ------------------- */
router
    .route('/')
    .get(GET_root)
    .post(POST_root_login, POST_root_signup)

/* ------------- */
/* Export Module */
/* ------------- */
module.exports = router;

