// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set our port to 3005
const PORT = process.env.PORT || 3005;

const notesDB = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));

// Sets up the Express App
const app = express();

// Sets up the Express app to handle data parsing and static pages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// Routes

app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))

// app.get("/api/db", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')))

app.get("/api/notes/:id", (req,res) => res.json(notesDB[req.params.id]));

// Create notes to JSON
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();  
  notesDB.push(newNote);

  console.log(notesDB);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
 
  });

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notesDB = notesDB.filter(note => note.id != id);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesDB));
  res.json(notesDB);
});


// Starts our app.
app.listen(PORT, () => {
  console.log(`app is listening on PORT: ${PORT}`);
});

  