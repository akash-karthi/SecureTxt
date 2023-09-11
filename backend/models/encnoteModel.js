const mongoose = require("mongoose");

const encNoteSchema = mongoose.Schema({
    encNote: {
        require: true,
        type: String,
    },
    hashOfContent: {
        require: true,
        type: String,
        trim: true,

    },
    urlHash: {
        require: true,
        type: String,
        trim: true,
    },

});

const Notes = mongoose.model('Notes', encNoteSchema);
module.exports = Notes;