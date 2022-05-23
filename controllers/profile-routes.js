const router = require('express').Router();

/*
    function: GET_ROOT
    
    Respond to all GET requests given the route to the homepage.
*/
const GET_root = async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
        res.render('profile', {
            pageTitle: 'Profile',
        })
    } else {
        res.redirect('/login');
    }
};

// set routes
router
    .route('/')
    .get(GET_root)

module.exports = router;