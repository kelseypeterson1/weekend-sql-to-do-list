const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Setup body parser - to translate request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// Setup the tasks router
// to respond to requests from the `/tasks` URL
let router = require('./routes/router.js');
app.use('/tasks', router);


// Start express
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});