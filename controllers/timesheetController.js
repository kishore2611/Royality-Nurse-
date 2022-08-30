const User = require("../models/User");
const Document = require("../models/documents");
const Timesheet = require("../models/timesheet");
const Hospital = require("../models/hospital");
// const { Duplex } = require("nodemailer/lib/xoauth2");
const moment = require("moment");

const test = async (req, res) => {
  try {
    // console.log(hospital);

    // const clockintime = moment(req.body.clockIn).format("hh:mm");
    // const clockouttime = moment(req.body.clockOut).format("hh:mm");
    const clockintime = req.body.clockIn;
    const clockouttime = req.body.clockOut;

    const hospital = await Hospital.findOne({ _id: req.body.hospital_id });
    const findCheck = await Timesheet.findOne({
      user_id: req.user._id,
      hospital_id: req.body.hospital_id,
    });

    // console.log(hospital.date);
    // return

    if (findCheck === null) {
      const clock = new Timesheet();
      (clock.date = hospital.date),
        (clock.day = hospital.day),
        (clock.user_id = req.user._id),
        (clock.hospital_id = req.body.hospital_id),
        (clock.clock.clockIn = clockintime),
        (clock.clock.clockOut = clockouttime),
        await clock.save();

      console.log(clock);

      return res.status(200).send({
        status: 1,
        message: "success",
        clock,
      });
    } else {
      const clock = await Timesheet.findOneAndUpdate(
        { user_id: req.user._id, hospital_id: req.body.hospital_id },
        {
          $push: {
            "clock.clockOut": clockouttime,
            "clock.clockIn": clockintime,
          },
        },
        { new: true }
      ).populate({
        path: "hospital_id",
        model: "Hospital",
        select: "hospitalName hospitalPic jobTitle timing date day",
      });

      return res.status(200).send({
        status: 1,
        message: "success",
        clock,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getTimesheet = async (req, res) => {
  try {
    // const newdate = moment(Date.now()).format("YYYY-MM")
    // console.log(newdate);
    // return;
    const newdate = moment(req.params.newdate).format("YYYY-MM-DD");

    const timesheet = await Timesheet.find({
      user_id: req.user._id,
      date: newdate,
    }).populate({
      path: "hospital_id",
      model: "Hospital",
      select: "hospitalPic hospitalName jobTitle timing date day",
    });
    console.log(timesheet);
    // return

    // const monthYear = moment(timesheet.date).format("YYYY-MM");
    if (timesheet.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "No check In, No Check Out",
      });
    } else {
      // var clockout1 = new Array();
      var clock = new Array();
      for (let i = 0; i < timesheet.length; i++) {
        // clockout1.push(timesheet[i]);
        clock.push(timesheet[i].clock);
      }
      // console.log(clock.clockOut);
      return res.status(200).send({
        status: 1,
        message: "success",
        clock: clock,
        // clockOut: clockout1
      });
      // if (months == monthYear) {
      // } else {
      //   return res.status(400).send({
      //     status: 0,
      //     message: "No Data",
      //   });
      // }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  test,
  getTimesheet,
};
