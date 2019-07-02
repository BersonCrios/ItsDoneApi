const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NotesSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    is_active : {type: Boolean, required: true}
});

module.exports = mongoose.model('Notes', NotesSchema);