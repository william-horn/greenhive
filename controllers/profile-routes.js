const router = require('express').Router();
const Post = require('../models/Post');

// todo: add comment
const GET_root = async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;


    const allPosts = await Post.findAll();
    const plainData = allPosts.map(post => post.get({ plain: true }));

    /*
    if the user is logged in then bring them to their profile page, otherwise
    redirect them to the login screen
    */
    if (isLoggedIn) {
        res.render('profile', {
            pageTitle: 'profile',
            username: req.session.userData.username,
            plainData
        })
    } else {
        res.redirect('/login');
    }
};

router
    .route('/')
    .get(GET_root)

module.exports = router;