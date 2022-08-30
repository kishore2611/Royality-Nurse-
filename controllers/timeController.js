// const check = async (req, res) => {
//     try {
//       // const time = moment(new Date()).format("hh:mm");

//       // console.log(clockin, clockout);
//       // return

//       const hospital = await Hospital.findById({ _id: req.body.hospital_id });

//       const findCheck = await Timesheet.findOne({
//         user_id: req.user._id,
//         hospital_id: req.body.hospital_id,
//       });

//       // console.log(findtime);
//       // return
//       const clockintime = moment(req.body.clockIn).format("hh:mm");
//       const clockouttime = moment(req.body.clockOut).format("hh:mm");

//       if (findCheck === null) {
//         const clockin = await Timesheet.create({
//           clockIn: clockintime,
//           date: hospital.date,
//           day: hospital.day,
//           user_id: req.user._id,
//           hospital_id: req.body.hospital_id,
//         });
//         return res.status(200).send({
//           status: 1,
//           message: "success",
//           clockin,
//         });
//       } else {
//         if (findCheck.clockOut.length < findCheck.clockIn.length) {
//           const clockout = await Timesheet.findOneAndUpdate(
//             { user_id: req.user._id, hospital_id: req.body.hospital_id },
//             { $push: { clockOut: clockouttime } },
//             { new: true }
//           );

//           return res.status(200).send({
//             status: 1,
//             message: "success",
//             clockout,
//           });
//         } else {
//           const clockinagain = await Timesheet.findOneAndUpdate(
//             { user_id: req.user._id, hospital_id: req.body.hospital_id },
//             { $push: { clockIn: clockintime } },
//             { new: true }
//           );

//           return res.status(200).send({
//             status: 1,
//             message: "success",
//             clockinagain,
//           });
//         }
//       }
//       // else{
//       //     const clockinagain = await Timesheet.findOneAndUpdate(
//       //         { user_id: req.user._id, hospital_id: req.body.hospital_id },
//       //         { $push:{clockIn: clockintime }},
//       //         { new: true }
//       //       );

//       //       return res.status(200).send({
//       //         status: 1,
//       //         message: "success",
//       //         clockinagain,
//       //       });
//       // }
//     } catch (error) {
//       return res.status(400).send(error.message);
//     }
//   };

// =========================================================================================
// const check = async (req, res) => {
//   try {
//     const date = moment(new Date()).format("hh:mm");
//     // console.log(date);
//     // return;
//     const hospital = await Hospital.findById({ _id: req.body.hospital_id });
//     // const findCheck = await Timesheet.findOne({
//     //   user_id: req.user._id,
//     //   hospital_id: req.body.hospital_id,
//     // });
//     // console.log(findCheck);
//     // return;
//     // if (!findCheck) {
//       const timesheet = await Timesheet();

//       (timesheet.clock.clockIn = date),
//         (timesheet.date = hospital.date),
//         (timesheet.user_id = req.user._id),
//         (timesheet.hospital_id = req.body.hospital_id);

//       timesheet.save();

//       return res.status(200).send({
//         status: 1,
//         message: "success",
//         timesheet,
//       });
//     // } else {
//     // //   console.log(req.body.hospital_id);
//     //   const timesheet = await Timesheet.findOneAndUpdate(
//     //     { user_id: req.user._id, hospital_id: req.body.hospital_id },
//     //     { "clock.clockOut": date },
//     //     { new: true }
//     //   );

//     //   return res.status(200).send({
//     //     status: 1,
//     //     message: "success",
//     //     timesheet,
//     //   });
//     // }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// };

// ============================================================================================================================
// const checkinout = async (req, res) => {
//     console.log(req.body);
// try {
//   // const time = moment(new Date()).format("hh:mm");

//   // console.log(clockin, clockout);
//   // return

//   const hospital = await Hospital.find({ _id: req.body.hospital_id });
//   console.log(hospital);
//   return;

//   const findCheck = await Timesheet.findOne({
//     user_id: req.user._id,
//     hospital_id: req.body.hospital_id,
//   }).populate({path: "hospital_id", model: "Hospital", select: "hospitalName hospitalPic jobTitle timing "})

//   // console.log(findtime);
//   // return
//   // const clockintime = moment(req.body.clockIn).format("hh:mm");
//   // const clockouttime = moment(req.body.clockOut).format("hh:mm");

//   if (findCheck === null) {
//     const clock = await Timesheet.create({
//       clockIn: req.body.clockIn,
//       date: hospital.date,
//       day: hospital.day,
//       user_id: req.user._id,
//       hospital_id: req.body.hospital_id,
//     });
//     return res.status(200).send({
//       status: 1,
//       message: "success",
//       clock,
//     });
//   } else {
//       const clock = await Timesheet.findOneAndUpdate(
//         { user_id: req.user._id, hospital_id: req.body.hospital_id },
//         { $push: { clockOut: req.body.clockOut }, $push: { clockIn: req.body.clockIn } },
//         { new: true }
//       );

//       return res.status(200).send({
//         status: 1,
//         message: "success",
//         clock,
//       });
//       console.log(clock);
//   }
//   // else{
//   //     const clockinagain = await Timesheet.findOneAndUpdate(
//   //         { user_id: req.user._id, hospital_id: req.body.hospital_id },
//   //         { $push:{clockIn: clockintime }},
//   //         { new: true }
//   //       );

//   //       return res.status(200).send({
//   //         status: 1,
//   //         message: "success",
//   //         clockinagain,
//   //       });
//   // }
// } catch (error) {
//   return res.status(400).send(error.message);
// }
//   };

// =============   ========            ======== ======== ======== ======== ======== ======== ======== ===============
// const timesheet = async (req, res) => {
//     try {
//       const timesheet = await Timesheet();

//       (timesheet.clockIn = req.body.clockIn),
//         (timesheet.clockOut = req.body.clockOut),
//         // timesheet.date = req.body.date
//         (timesheet.user_id = req.user._id),
//         (timesheet.hospital_id = req.body.hospital_id);

//       timesheet.save();

//       return res.status(200).send({
//         status: 1,
//         message: "success",
//         timesheet,
//       });
//     } catch (error) {
//       return res.status(400).send(error.message);
//     }
//   };

const User = require("../models/User");
const Document = require("../models/documents");
const Timesheet = require("../models/timesheet");
const Hospital = require("../models/hospital");
// const { Duplex } = require("nodemailer/lib/xoauth2");
const moment = require("moment");
const Time = require("../models/time");

const time = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ _id: req.body.hospital_id });
    const findCheck = await Time.findOne({
      user_id: req.user._id,
      hospital_id: req.body.hospital_id,
    });

    // for(let i = 0; i < 3; i++) {
    //     var check = findCheck[i].clock
    // }
    // console.log(check);
    // return;

    // const data = req.body.type;
    // const data2 = req.body.time;
    // console.log(data, data2);

    // var jsonData = JSON.parse(data);
    // for (var i = 0; i < jsonData.length; i++) {
    //   var clock = jsonData[i];
    // }
    // console.log(clock);

    // return;

    if (findCheck === null) {
      const clock = new Time({
        date: hospital.date,
        day: hospital.day,
        user_id: req.user._id,
        hospital_id: req.body.hospital_id,
        clock: req.body.clock
        // "clock.type": req.body.type,
        // "clock.time": req.body.time
      });
      // (clock.date = hospital.date),
      //   (clock.day = hospital.day),
      //   (clock.user_id = req.user._id),
      //   (clock.hospital_id = req.body.hospital_id),
      //   ("clock.clock.type" = req.body.type),
      //   ("clock.clock.time" = req.body.time),
        await clock.save();

      console.log(clock);

      return res.status(200).send({
        status: 1,
        message: "success",
        clock,
      });
    } else {
      // const clocktype = req.body.type;
      // const clocktime = req.body.time;
      const clock = await Time.findOneAndUpdate(
        { user_id: req.user._id, hospital_id: req.body.hospital_id },
        {
          $push: {
            clock: req.body.clock
          },
        },
        { new: true }
      ).populate({
        path: "hospital_id",
        model: "Hospital",
        select: "hospitalName hospitalPic jobTitle timing date day",
      });
      console.log(clock);

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

const list = async (req, res) => {
  try {
    // const newdate = moment(Date.now()).format("YYYY-MM")
    // console.log(newdate);
    // return;
    const newdate = moment(req.params.newdate).format("YYYY-MM-DD");

    const timesheet = await Time.find({
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
      // var clock = new Array();
      for (let i = 0; i < timesheet.length; i++) {
        // clockout1.push(timesheet[i]);
        // clock.push(timesheet[i].clock);
        var clock = timesheet[i].clock;
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
  time,
  list,
};
