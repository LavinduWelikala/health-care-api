
const mongoose = require ("mongoose");
const Schedule = require("./schedule");
const schema = mongoose.Schema;
const feedbackSchema = new schema({


        scheduleID:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },

        userID:{
            type:String,
            required:true
            

        }
    
    });



const feedback = mongoose.model("feedback",feedbackSchema);
module.exports = feedback;