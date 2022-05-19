const router = require('express').Router();
const User = require('../models/User');

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the homepage.
*/
const GET_root = async (req, res) => res.render('home', {
    pageTitle: 'Home',
});

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;