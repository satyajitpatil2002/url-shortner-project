const shortid = require('shortid');
const Url = require('../models/Url'); // Import URL model
 
// Controller to handle URL shortening
const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body; // Extract long URL from request body
    if (!originalUrl) {
        return res.status(400).json({ error: 'originalUrl is required' });
    }

    const shortUrl = shortid.generate(); // Generate short URL

    const newUrl = new Url({ originalUrl, shortUrl }); // Create new URL entry

    try {
        await newUrl.save(); // Save URL entry to database
        res.json({ shortUrl: `${req.headers.host}/${shortUrl}` }); // Return JSON response with the short URL
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).send('Server error');
    }
};

// Controller to handle URL redirection
const redirectUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl }); // Find URL entry by short URL
        if (url) {
            res.redirect(url.originalUrl); // Redirect to the long URL if found
        } else {
            res.status(404).send('URL not found'); // Send 404 if URL not found
        }
    } catch (error) {
        console.error('Error retrieving URL:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createShortUrl,
    redirectUrl,
};
