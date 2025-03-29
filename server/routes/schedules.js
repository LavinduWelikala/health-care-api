const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");
const json2csv = require("json2csv").parse;

router.post("/schedule/add", (req, res) => {
  const { materials, videos, events, docName } = req.body;
  const newSchedule = new Schedule({
    materials,
    videos,
    events,
    docName,
  });
  newSchedule
    .save()
    .then(() => res.json("Schedule added."))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.get("/schedule/", (req, res) => {
  Schedule.find()
    .then((schedules) => res.json(schedules))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.put('/schedule/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { docName, materials, videos, events } = req.body;

  
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        id,
        { docName, materials, videos, events },
        { new: true }
      );
  
     
      if (!updatedSchedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      res.json(updatedSchedule);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.delete("/schedule/delete/:id", async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Schedule deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/schedule/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


router.get("/schedule/download", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    if (!schedules || schedules.length === 0) {
      return res.status(400).send("No schedules found");
    }
    const fields = ["docName", "materials", "videos", "events"];
    const opts = {
      fields,
      transform: (schedule) => {
        return {
          "Doctor Name": schedule.docName,
          "Materials": schedule.materials,
          "Videos": schedule.videos,
          "Events": schedule.events,
        };
      },
    };
    const csv = json2csv.parse(schedules, opts);
    res.setHeader("Content-Disposition", "attachment; filename=Schedule_Details.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});


module.exports = router;
