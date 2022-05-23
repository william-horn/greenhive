const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');

/*
    ALL CODE BELOW IS STILL CURRENTLY EXPERIMENTAL

    When this document is complete, it will handle all api requests for:
        - getting
        - setting
        - updating
        - deleting

    all user posts.
*/

// todo: add comment
const createUserPost = async (userId, postData) => {
    const { title, content } = postData;
    const user = await User.findByPk(userId);

    if (user) {
        return Post.create({
            title,
            content,
            author_id: userId,
            author_name: user.username
        });
    } else {
        console.log('Invalid user id');
    }
}

// todo: add comment
const GET_root = async (req, res) => {
    res.json('N/A');
};

// todo: add comment
const POST_root = async (req, res) => {
    const result = await createUserPost(req.session.userId, req.body);
    console.log('Post request from user:', req.session.userId);
    res.status(200).json('Worked');
}

router
    .route('/')
    .get(GET_root)
    .post(POST_root)

module.exports = router;