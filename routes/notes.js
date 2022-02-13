const notes = require('express').Router();

const {
    readFromFile,
    writeToFile,
} = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});


module.exports = notes;