const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket"); //Fetch All Tickets
const { cloudinary } = require("../utils/cloudinary");
const mongoose = require("mongoose");



router.route("/").post(async (req,res)=>{ 
    const {
        name,
        userId,
        ticketID,
        email,
        contact,
        requesttype,
        message,
        fileEnc,
        date,
        status
      } = req.body;
      try {
        const attachment = await cloudinary.uploader.upload(fileEnc, {
          upload_preset: "ssd_assignment",
        });
        const postTicket= await Ticket.create({
            name,
            userId,
            ticketID,
            email,
            contact,
            requesttype,
            message,
            attachment: {
            imagePublicId: attachment.public_id,
            imageSecURL: attachment.secure_url,
          },
          date,
        status
        });
    
        res.status(201).json(postTicket);
      }
      catch (error) {
        res.status(409).json({
          success: false,
          desc: "Error in adding Ticket router",
          error: error.message,
        });
      }
})

//Fetch All Tickets
router.route("/").get(async (req,res)=>{ 
    try {  
        const allticket = await Ticket.find();
        
          res.status(200).send({
            allticket,
          });
        
        
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in getTicket Router-" + error,
        });
      }
})

//Update Tickets
router.route("/:id").put(async (req,res)=>{ 
    let Id = req.params.id;
    const {
        name,
        userId,
        ticketID,
        email,
        contact,
        requesttype,
        message,
        status

    } = req.body;
  
    const updatedticket = {  
        name,
        userId,
        ticketID,
        email,
        contact,
        requesttype,
        message,
        status

    }
   
    Ticket.findByIdAndUpdate(Id,updatedticket,
      {
        new: true,
        upsert: false,
      })
    .then(() => {
      res.status(200).send({status: "Succesfully updated " +Id})
    }).catch((error) => {
      res.status(500).send({status: "error in updating ticket router",error: error.message})
    })
})

//Delete Tickets
router.route("/:id").delete(async (req,res)=>{ 
    let Id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(Id))
      return res.status(404).send(`No Ticket with id: ${Id}`);
  
    try {
      await Ticket.findByIdAndDelete(Id);
      res.status(200).json({ status: "Ticket deleted" });
    } catch (error) {
      res.status(500).json({ status: "Ticket-Internal server error in Delete router", error });
    }
})

module.exports = router;
