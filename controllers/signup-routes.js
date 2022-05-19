const router = require('express').Router();

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the login page
*/
const GET_root = (req, res) => res.render('register', { 
    pageTitle: 'Sign Up',
    login: false
});

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;