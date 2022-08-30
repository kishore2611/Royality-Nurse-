const mongoose = require("mongoose");
const moment = require("moment");

const timesheetSchema = new mongoose.Schema(
  {
    clock: {
      clockIn: [
        {
          type: String,
          // default: moment(new Date()).format("hh:mm"),
        },
      ],
      clockOut: [
        {
          type: String,
          // default: moment(new Date()).format("hh:mm"),
        },
      ],
    },
    date: {
      type: String,
      default: moment(new Date()).format("YYYY-MM-DD"),
    },
    day: {
      type: String,
      enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    user_id: {
      type: mongoose.Schema.Types.Object,
      ref: "User",
    },
    hospital_id: {
      type: mongoose.Schema.Types.Object,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

const Timesheet = mongoose.model("Timesheet", timesheetSchema);
module.exports = Timesheet;
