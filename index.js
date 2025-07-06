const express = require('express');
const fs = require('fs');
const path = require('path');

const server = express();
server.use(express.json()); // To parse JSON body

const NOTE_PATH = path.join(__dirname, 'note.txt');

// Helper function to read notes
function readNotes() {
  const content = fs.readFileSync(NOTE_PATH, 'utf-8');
  return JSON.parse(content);
}

// Helper function to write notes
function writeNotes(notes) {
  fs.writeFileSync(NOTE_PATH, JSON.stringify(notes, null, 2), 'utf-8');
}

// Route: Test note
server.get('/youssef', (req, res) => {
  res.json({
    id: 1,
    title: "Youssef Note",
    content: "This is a note from youssef"
  });
});

// Route: Get all notes
server.get('/notes', (req, res) => {
  try {
    const notes = readNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to read notes" });
  }
});

// Route: Add new note (POST)
server.post('/notes', (req, res) => {
  try {
    const notes = readNotes();
    const newNote = {
      id: Date.now().toString(), // unique id
      title: req.body.title,
      content: req.body.content
    };
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to add note" });
  }
});

// Route: Delete note by ID
server.delete('/notes/:id', (req, res) => {
  try {
    const notes = readNotes();
    const id = req.params.id;
    const filteredNotes = notes.filter(note => note.id !== id);
    if (notes.length === filteredNotes.length) {
      return res.status(404).json({ error: "Note not found" });
    }
    writeNotes(filteredNotes);
    res.json({ message: `Note ${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// Route: Update note by ID
server.put('/notes/:id', (req, res) => {
  try {
    const notes = readNotes();
    const id = req.params.id;
    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    notes[index] = {
      ...notes[index],
      title: req.body.title || notes[index].title,
      content: req.body.content || notes[index].content
    };

    writeNotes(notes);
    res.json(notes[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Start server
server.listen(3000, () => {
  console.log("✅ Server is running on http://localhost:3000");
});
