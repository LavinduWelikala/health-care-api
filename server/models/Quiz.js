const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    answertype: {
        type: String,
        required: true
    },
},{
    collection:'quiz'
});

const answersSchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId, 
        ref: 'quiz', 
    },
    answers: [{ type: String, required: true },],
    score: 
        [{ type: Number, 
            required: true
         }]
    
},{
    collection:'answers'
});
const Quiz = mongoose.model('quiz', quizSchema);
const Answers = mongoose.model("answers", answersSchema);
module.exports = {Quiz,Answers};