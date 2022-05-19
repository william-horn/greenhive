const router = require('express').Router();
const User = require('../models/User');
const helpers = require('../utils/helpers');

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the homepage.
*/
const GET_root = async (req, res) => {
    const registerVariant = req.session.isLoggedIn ? 'logout' : 'login';
    const registerText = helpers.renderRegisterText(registerVariant);

    res.render('home', {
        registerVariant,
        registerText,
        pageTitle: 'Home',
    })
};

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;