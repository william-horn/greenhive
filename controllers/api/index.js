const router = require('express').Router();

router.use('/posts', require('./post-routes'));

module.exports = router;