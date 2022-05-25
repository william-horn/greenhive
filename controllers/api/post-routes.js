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
    const { title, content, type } = postData;
    const user = await User.findByPk(userId);

    if (user) {
        return Post.create({
            title,
            type,
            content,
            author_id: userId,
            author_name: user.username
        });
    } else {
        console.log('Invalid user id');
    }
}

// todo: add comment
const POST_root = async (req, res) => {
    /*
        req.body = {
            title: '',
            content: '',
            type: ''
        }
    */
    console.log('post request recieved');
    const result = await createUserPost(req.session.userData.id, req.body);
    console.log('Post request from user:', req.session.userId);
    res.status(200).json('Worked');
}

const GET_root = async (req, res) => {
    const allPosts = await Post.findAll();
    const plainData = allPosts.map(post => post.get({ plain: true }));

    res.status(200).json(plainData);
}

router
    .route('/')
    .post(POST_root)
    .get(GET_root)

module.exports = router;