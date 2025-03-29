const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const bodyParser=require("body-parser");
router.use(bodyParser.json());
router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).json(feedback);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/*router.post("/feedback/add/:id", async (req, res) => {
  const { comment, rating, userID } = req.body;
 // const scheduleID = req.params.id;

  try {
    const newFeedback = new Feedback({ scheduleID, comment, rating, userID });
    await newFeedback.save();
    res.json(newFeedback);
  } catch (err) {
    console.log(err);
    res.status(500).send("server errors");
  }
});
*/
router.post('/feedback/add/',(req,res)=>{

     let newPost = new Feedback(req.body);
       newPost.save((err) =>{
         if(err){
            return res.status(400).json({
               error:err
        });
    }
           return res.status(200).json({
         success:"Posts saved successfully"
  
 });
  
 });
  
  
  })



router.put("/update/:id", async (req, res) => {
  const { comment, rating } = req.body;

  try {
    const updateFeedback = await Feedback.findOneAndUpdate(
      {scheduleID:req.params.id},
      
      { comment, rating },
      { new: true }
    );

    if (!updateFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(updateFeedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Feedback deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
