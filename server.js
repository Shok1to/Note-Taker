const express = require('express');
const path = require('path');
const fs = require('fs');
const { uuid } = require('uuidv4');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// HTML Routes
// Get Index.html
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Get Notes.html
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// API Routes
// Get all notes
app.get('/api/notes',(req, res)=> {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(allNotes)

})

// Post a new note (save)
app.post('/api/notes',(req, res)=> {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    let newNote = req.body;
    newNote.id = uuid();
    allNotes.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.json(allNotes);

})


// Delete a note
app.delete('/api/notes',(req, res)=> {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.json(allNotes);

})





app.listen(PORT, ()=>{console.log(`listening on port: ${PORT}`)})
