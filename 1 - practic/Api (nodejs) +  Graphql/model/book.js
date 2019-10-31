const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    autherID: String
});

module.exports = mongoose.model('Book',bookSchema);