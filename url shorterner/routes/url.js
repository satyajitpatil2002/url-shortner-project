const express = require('express'); // Importing Express
const router = express.Router(); // Creating a router instance
const { createShortUrl, redirectUrl } = require('../controllers/urlController'); // Importing controllers

// Route to render the home page
router.get('/', (req, res) => {
    res.render('index', { shortUrl: null });
});

// Route to handle URL shortening
router.post('/shorten', createShortUrl);

// Route to handle URL redirection
router.get('/:shortUrl', redirectUrl);

module.exports = router;
