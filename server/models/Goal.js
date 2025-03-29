const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    user: {
        type: Number,
        required: true
    },
    daysPerWeek: {
        type: Number,
        required: true
    },
    note1: {
        type: String
    },
    note2: {
        type: String
    },
    note3: {
        type: String
    },
    note4: {
        type: String
    },
    status1: {
        type: String
    },
    status2: {
        type: String
    },
    status3: {
        type: String
    },
    status4: {
        type: String
    }
});

const Goal = mongoose.model("goals", goalSchema);

module.exports = Goal;
