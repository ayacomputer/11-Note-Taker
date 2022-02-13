const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const {
    readFromFile,
    writeToFile,
    readAndAppend
} = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

tips.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => notes.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => notes.note_id !== noteId);
            writeToFile('./db/notes.json', result);
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, note } = req.body;

    if (req.body) {
        const newNote = {
            title,
            note,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/notes.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;