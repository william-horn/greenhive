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

    // increase player 'page_visits' by one for each homepage load
    // await User.increment('page_visits', { 
    //     by: 1, 
    //     where: { id: 'model_id' }
    // });
};

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;