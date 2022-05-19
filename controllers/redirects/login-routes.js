const router = require('express').Router();

// set routes
router.get('/', (req, res) => res.redirect('/register?variant=login'))

module.exports = router;