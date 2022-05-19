const router = require('express').Router();

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the login page
*/
const GET_root = (req, res) => res.render('register', { 
    pageTitle: 'Login',
    login: true
});

const POST_root = (req, res) => {
    res.status(200).json('From Server: The user has logged in');
}

// set routes
router
    .route('/')
    .get(GET_root)
    .post(POST_root)

module.exports = router;