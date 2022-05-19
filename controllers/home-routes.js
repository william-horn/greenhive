const router = require('express').Router();
const User = require('../models/User');

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the homepage.
*/
const GET_root = async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const registerVariant = isLoggedIn ? 'logout' : 'login';

    res.render('home', {
        registerVariant,
        pageTitle: 'home',
    })
};

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;