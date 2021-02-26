// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

// Set our port to 3005
const PORT = 3005;

const app = express();

const notes = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes


app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/develop/public/index.html')));


app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/develop/public/notes.html')))


app.get("/api/db", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')))

// Create New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
  
    console.log(newNote);
  
    notes.push(newNote);
  
    res.json(newNote);
  });
  
  // Starts our app.
  app.listen(PORT, () => {
    console.log(`app is listening on PORT: ${PORT}`);
  });

  