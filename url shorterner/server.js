const express = require('express'); // Importing Express framework
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection
const urlRouter = require('./routes/url'); // Importing URL routes
const path = require('path');
const app = express(); // Creating an Express app
const PORT = 3000; // Defining the server port

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/short-url', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Use URL routes
app.use('/', urlRouter);

// Start the server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
