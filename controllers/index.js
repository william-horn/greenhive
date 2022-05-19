const router = require('express').Router();

router.use('/', require('./home-routes'));
router.use('/register', require('./register-routes'));
// redirects
router.use('/login', require('./redirects/login-routes'));
router.use('/signup', require('./redirects/signup-routes'));

module.exports = router;