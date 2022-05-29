const router = require('express').Router();
const axios = require('axios').default;
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
   try {
        const result = await createUserPost(req.session.userData.id, req.body);
        res.status(200).json('Worked');
   } catch(err) {
       throw err;
   }
}

const GET_root = async (req, res) => {

    let allPosts;
    const isUserPost = req.query.isUserPost;


    if (isUserPost === 'true') {
        const ofType = req.query.type;
        //const searchFilter = req.query.filter;

        if (ofType) {
            const searchBuild = { type: ofType }
            //if (searchFilter) searchBuild.title = searchFilter;

            allPosts = await Post.findAll({ where: searchBuild});
        } else {
            allPosts = await Post.findAll();
        }

        const plainData = allPosts.map(post => post.get({ plain: true }));
        res.status(200).json(plainData);
    } else {

        const apiResponse = await axios.get('https://apiv3.iucnredlist.org/api/v3/species/region/europe/page/0?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee');

        res.json(apiResponse.data.result);

    }
}

router
    .route('/')
    .post(POST_root)
    .get(GET_root)

module.exports = router;