const router = require('express').Router();

// set routes
router.get('/', (req, res) => res.redirect('/register?variant=signup'))

module.exports = router;