const mongoose = require("mongoose");
const schema = mongoose.Schema;


const scheduleSchema = new schema({
  userID: {
    type:Number,
    unique: true
  },
  materials: {
    type: String,
    required: true
  },
  videos: {
    type: String,
    required: true
  },
  events: {
    type: String,
    required: true
  },
  docName: {
    type: String,
    required: true
  }
});

scheduleSchema.pre("save", async function (next) {
    if (!this.userID) {
      try {
        const lastSchedule = await this.constructor.findOne({}, {}, {
          sort: {
            userID: -1
          }
        });
  
        if (lastSchedule) {
          this.userID = lastSchedule.userID + 1;
        } else {
          this.userID = 1;
        }
  
        next();
      } catch (err) {
        return next(err);
      }
    } else {
      next();
    }
  });

const Schedule = mongoose.model("schedule", scheduleSchema);

module.exports = Schedule;
