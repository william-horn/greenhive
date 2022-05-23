const router = require('express').Router();

router.use('/', require('./home-routes'));
router.use('/register', require('./register-routes'));
router.use('/profile', require('./profile-routes'));
router.use('/api', require('./api'));
// redirects
router.use('/login', require('./redirects/login-routes'));
router.use('/signup', require('./redirects/signup-routes'));

module.exports = router;