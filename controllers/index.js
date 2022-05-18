const router = require('express').Router();

router.use('/', require('./home-routes'));
router.use('/login', require('./login-routes'));
router.use('/signup', require('./signup-routes'));

module.exports = router;