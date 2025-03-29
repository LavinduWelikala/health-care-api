const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const paymentschema = new Schema({

Cholder : {

    type : String,
    require:true
},

Cnumber :  {

    type : Number,
    require:true
},

date :  {

    type : Date,
    require:true
},

cvv :  {

    type : String,
    require:true
},


})

const Payment = mongoose.model("Payment",paymentschema)

module.exports = Payment;