const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    name: {
        type: String,
    }
    ,
    userId: {
        type: String

    }
    ,
    ticketID: {
        type: String

    }
    ,
    email: {
        type: String
    }
    ,
    contact: {
        type: String
    },
    requesttype: {
        type: String
    },
    message: {
        type: String
    },
    attachment: {
        imagePublicId: {
          type: String,
        
        },
        imageSecURL: {
          type: String,
          
        },
      },
      date:{
        type: String 
      },
      status:{
        type: String 
      }
})

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;