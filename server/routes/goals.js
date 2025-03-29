const router = require("express").Router();
let Goal = require("../models/Goal");

// Create a new goal
router.route("/add").post(async(req,res)=>{
    let goalId = 0;
    const daysPerWeek = Number(req.body.daysPerWeek); 
    const note1 = req.body.note1;
    const note2 = req.body.note2;
    const note3 = req.body.note3;
    const note4 = req.body.note4;
    const status1="Incomplete"
    const status2="Incomplete"
    const status3="Incomplete"
    const status4="Incomplete"
    const user=84;
    const newGoal =  new Goal({
        user,
         daysPerWeek,
         note1,
         note2,
         note3,
         note4,
         status1,
         status2,
         status3,
         status4
    });
    newGoal.save().then(async() =>{
        res.json({status: "Goal Added"})
        
console.log(newGoal)
    }).catch((err)=>{
        console.log(err.message); 
    })
})
router.route("/getlast").get(async (req, res) => {
  try {
    const goals = await Goal.find();
    const lastData = goals[goals.length - 1]; // Get the last element of the goals array
    console.log(lastData)

    res.status(200).send({ status: "Last goal fetched", lastData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error with display", error: err.message });
  }
});
// Display goals
router.route("/get/:id").get(async (req,res)=> {
  
    let userID = req.params.id;
    const display = await Goal.findOne({_id : userID})
    .then((display)=>{
        res.status(200).send({status:"Goals fetched", display: display})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with display", error: err.message})
    })
})

// Get a specific goal by ID
router.route("/search/:id").get(async (req, res) => {
    let goalID = req.params.id;
    const getGoal = await Goal.findById(goalID)
    then(() => {
        res.status(200).send({status:"Goal fetched", getGoal: getGoal})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with getgoal", error: err.message})
    })
});

// Update goal 
router.route("/update/:id").put(async (req, res) => {
  const user = 84;
  try {
    const goalID = req.params.id;
    const {
      daysPerWeek,
      note1,
      note2,
      note3,
      note4,
      status1,
      status2,
      status3,
      status4
    } = req.body;
    const updateGoal = {
      user,
      daysPerWeek,
      note1,
      note2,
      note3,
      note4,
      status1,
      status2,
      status3,
      status4
    };

    await Goal.findOneAndUpdate({ _id: goalID, user }, updateGoal);

    res.status(200).send({ status: "Goal updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to update goal" });
  }
});

  

router.route("/delete/:id").delete(async (req, res) => {
    let goalID = req.params.id;
    try {
      await Goal.findByIdAndDelete(goalID);
  
      res.status(200).json({ message: "Goal removed successfully." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while removing the goal." });
    }
})

router.route("/all-details").get(async (req, res) => {
    const goals = await Goal.find({});
  
    if (goals) {
        console.log(goals);
      res.json(goals);
    } else {
      res.send("No data found");
    }
  });



module.exports = router;
