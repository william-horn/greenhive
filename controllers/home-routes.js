const router = require('express').Router();

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the homepage.
*/
const GET_root = (req, res) => res.render('home', { 
    pageTitle: 'Home',
});

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;