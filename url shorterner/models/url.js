const mongoose = require('mongoose'); // Importing Mongoose

// Defining URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true }, // Original URL
    shortUrl: { type: String, required: true, unique: true }, // Shortened URL
    date: { type: Date, default: Date.now } // Date of creation
});

// Exporting the model
module.exports = mongoose.model('Url', urlSchema);
