// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set our port to 3005
const PORT = 3005;

// Sets up the Express App
const app = express();

// Sets up the Express app to handle data parsing and static pages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Routes

app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))


app.get("/api/db", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')))

app.get("/api/notes/:id", (req,res) =>  res.sendFile(path.join(__dirname, './db/db.json')));


// Create notes to JSON
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));
  notes.push(newNote);

  console.log(notes);

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
 
  });

// Starts our app.
app.listen(PORT, () => {
  console.log(`app is listening on PORT: ${PORT}`);
});

  