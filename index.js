// Import database
const dbDriver = require('better-sqlite3');
// Connect to db
const db = dbDriver('bands.sqlite3');

// Import express
const express = require('express');
// Create express db
const app = express();

// Express setup
// Serve a static frontend
app.use(express.static('frontend'));
// Tell express to use json
app.use(express.json());

//REST API routes
app.get('/bands', (req,res) => {
    //req = request
    //res = response

    // Prepare and execute in on line
    const bands = db.prepare(`SELECT * FROM bands`).all();

    // Send back to json
    res.json(bands);
});

// Start the server 
app.listen(3000, () => {
    console.log('Server started on port 3000.');
});

//Get single bamd based on url / id
app.get('/bands/:id', (req,res) => {
    //Get the url id
    const id = req.params.id;

    let statement = db.prepare('SELECT * FROM bands WHERE band_id = :id');
    let result = statement.all({
        id
    });

    //Send back band or error
    res.json(result[0] || {'error': 'No band matching the id'});
});