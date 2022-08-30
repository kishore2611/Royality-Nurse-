const mongoose = require("mongoose");
const moment = require("moment");

const timeSchema = new mongoose.Schema(
  {
    clock: [
      {
        type: {
          type: String,
          default: null,
        },

        time: {
          type: String,
          default: null,
        },
      },
    ],

    date: {
      type: String,
      default: moment(new Date()).format("YYYY-MM-DD"),
    },
    day: {
      type: String,
      enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

const Time = mongoose.model("Time", timeSchema);
module.exports = Time;
