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

const createUsePost = async (userId, postData) => {
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

const GET_root = async (req, res) => {
    res.json('N/A');
};

const POST_root = async (req, res) => {
    const result = await createUsePost(req.session.userId, req.body);
    console.log('Post request from user:', req.session.userId);
    console.log('saved result: ', result);
    res.status(200).json('Worked');
}

router
    .route('/')
    .get(GET_root)
    .post(POST_root)

module.exports = router;