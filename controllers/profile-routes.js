const router = require('express').Router();
const Post = require('../models/Post');
const modalTypes = require('../aliases/modal-types');

// todo: add comment
const GET_root = async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    const user = req.session.userData;
    /*
    if the user is logged in then bring them to their profile page, otherwise
    redirect them to the login screen
    */
    if (isLoggedIn) {
        res.render('profile', {
            pageTitle: 'profile',
            username: user.username,
            profileImg: './images/profile-images/image-' + user.username.length%6 + '.jpg'
        })
    } else {
        res.redirect('/login');
    }
};

router
    .route('/')
    .get(GET_root)

module.exports = router;