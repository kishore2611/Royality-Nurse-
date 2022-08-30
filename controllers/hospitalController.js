const User = require("../models/User");
const Document = require("../models/documents");
const Hospital = require("../models/hospital");
const Jobs = require("../models/jobs");
const ApiFeatures = require("../utils/apiFeatures");
const moment = require("moment");
const Notification = require("../models/notification");
const { push_notifications } = require("../utils/push_notification");

const postShift = async (req, res) => {
  try {
    if (!req.body.jobTitle) {
      return res.status(400).send({
        status: 0,
        message: "Job Title field is required",
      });
    } else if (!req.body.timing) {
      return res.status(400).send({
        status: 0,
        message: "timing field is required",
      });
    } else if (!req.body.hourlyRate) {
      return res.status(400).send({
        status: 0,
        message: "rate field is required",
      });
    } else {
      const shift = await Hospital();
      (shift.hospitalName = req.user.name),
        (shift.hospitalPic = req.user.profilePicture),
        (shift.jobTitle = req.body.jobTitle),
        (shift.hourlyRate = req.body.hourlyRate),
        (shift.timing = req.body.timing),
        (shift.date = req.body.date),
        (shift.day = req.body.day),
        (shift.location.longitude = req.body.longitude),
        (shift.location.latitude = req.body.latitude);

      shift.save();

      return res.status(200).send({
        status: 1,
        message: "success",
        shift,
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getShifts = async (req, res) => {
  try {
    console.log(req.params);
    if (req.params == null) {
      return res.status(404).send({
        status: 0,
        message: "field should not be null",
      });
    } else {
      const apiFeature = new ApiFeatures(Hospital.find(), req.query)
        .search()
        .filter();
      const shifts = await apiFeature.query;
      return res.status(200).send({
        status: 1,
        message: "all Shifts",
        shifts,
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getSingleShift = async (req, res) => {
  try {
    const singleshift = await Hospital.findById(req.params._id);
    return res.status(200).send({
      status: 1,
      message: "Hosp[ital shift detail",
      singleshift,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const applyShift = async (req, res) => {
  try {
    const check = await User.findById({ _id: req.user._id });
    // console.log(check.applied.hospital_id);
    // return

    for (let i = 0; i < check.applied.length; i++) {
      var apply = check.applied[i].hospital_id;
    }
    console.log(apply);
    // return

    if (apply == req.body.hospital_id) {
      return res.status(400).send({ status: 0, message: "already applied" });
    } else {
      const applyshift = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            applied: { hospital_id: req.body.hospital_id },
          },
        },
        { new: true }
      );

      const hospital = await Hospital.findOne({ _id: req.body.hospital_id });
      // console.log(hospital);

      const user = new Jobs({
        user_id: req.user._id,
        hospital_id: req.body.hospital_id,
        date: hospital.date,
        day: hospital.day,
      });
      user.save();
      // const update = await Hospital.findOneAndUpdate({ _id: req.body._id }, { applied: true }, { new: true })
      return res.status(200).send({
        status: 1,
        message: "your application is requested to approval",
        user,
        applyshift,
      });
    }

    // }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const approveshift = async (req, res) => {
  try {
    const check = await Jobs.findOne({ _id: req.body._id });

    if (check.approve === true) {
      res.status(400).send({
        status: 0,
        message: "already approved",
      });
    } else {
      const shiftapprove = await Jobs.findByIdAndUpdate(
        { _id: req.body._id },
        { approve: req.body.approve },
        { new: true }
      )
        .populate({
          path: "hospital_id",
          model: "Hospital",
          select:
            "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
        })
        .populate({
          path: "user_id",
          model: "User",
          select:
            "name , email , licenseNumber , ssn , position , profilePicture , role",
        });

      // console.log(shiftapprove);

      // Notification Start //
      const receiver_object = await User.find({
        _id: shiftapprove.user_id._id,
      });

      // console.log(receiver_object)

      const sender_object = await Hospital.find({
        _id: shiftapprove.hospital_id._id,
      });

      //  console.log("sender_object:", sender_object);

      let receiver_device_token = "";
      let receiver_name = "";
      let is_notification_reciever = " ";
      let receiver_id = " ";
      for (let i = 0; i < receiver_object.length; i++) {
        receiver_device_token = receiver_object[i].user_device_token;
        receiver_name = receiver_object[i].name;
        receiver_id = receiver_object[i]._id;
        is_notification_reciever = receiver_object[i].is_notification;
      }

      // console.log("receiver_object", receiver_object);

      //  let sender_device_token = "";
      let sender_name = "";
      let sender_image = "";
      let sender_id = "";

      for (let i = 0; i < sender_object.length; i++) {
        //  sender_device_token = sender_object[i].user_device_token;
        sender_name = sender_object[i].hospitalName;
        sender_image = sender_object[i].hospitalPic;
        sender_id = sender_object[i]._id;
      }

      // console.log("reciever", receiver_name,"sender_name", sender_name, "sender_image",sender_image,"sender_id", sender_id)
      const notification_obj_receiver = {
        user_device_token: receiver_device_token,
        title: receiver_name,
        body: `${sender_name} has approve your shift.`,
        notification_type: "shift_approve_notify",
        vibrate: 1,
        sound: 1,
        sender_id: sender_id,
        sender_name: sender_name,
        sender_image: sender_image,
        receiver_id: receiver_id,
      };
      if (is_notification_reciever == 1) {
        //  console.log("pushnotification")
        push_notifications(notification_obj_receiver);
      }
      //   console.log(notification_obj_receiver);
      // Notification End //

      // console.log("user_id", shiftapprove.user_id._id, "hospital_id", shiftapprove.hospital_id._id);
      // return;

      const notification = new Notification({
        user_device_token: notification_obj_receiver.user_device_token,
        title: notification_obj_receiver.title,
        body: notification_obj_receiver.body,
        notification_type: notification_obj_receiver.notification_type,
        sender_id: notification_obj_receiver.sender_id,
        sender_name: notification_obj_receiver.sender_name,
        sender_image: notification_obj_receiver.sender_image,
        receiver_id: notification_obj_receiver.receiver_id,
        date: moment(new Date()).format("YYYY-MM-DD"),
      });
      await notification.save();

      console.log(notification);

      return res.status(200).send({
        status: 1,
        message: "success",
        shiftapprove,
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({ user_id: req.user._id });
    console.log(jobs);

    if (jobs.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "No job found",
      });
    } else {
      return res.status(200).send({
        status: 1,
        message: "success",
        jobs,
      });
    }
    // }
    // else{
    //     return res.status(400).send({
    //         status: 0,
    //         message: "failed"
    //     })
    // }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const jobStatus = async (req, res) => {
  try {
    const status = await Jobs.findById({ _id: req.body._id });
    (status.status = req.body.status), status.save();
    return res.status(200).send({
      status: 1,
      status,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const myPreviousShifts = async (req, res) => {
  try {
    var newdate = moment(Date.now()).format("YYYY-MM-DD");
    console.log(newdate);

    const myshifts = await Jobs.find({
      user_id: req.user._id,
      approve: true,
      date: { $lt: newdate },
    }).populate({
      path: "hospital_id",
      model: "Hospital",
      select:
        "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
    });

    if (myshifts.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "no shift",
      });
    } else {
      //     var shifts= new Array();
      //   for (let i = 0; i < myshifts.length; i++) {
      //     // shifts = myshifts[i].hospital_id;
      //     shifts = myshifts[i].hospital_id;
      //   }

      var output = [];
      for (var i = 0; i < myshifts.length; ++i) {
        output.push(myshifts[i].hospital_id);
      }

      //   console.log(output)
      return res.status(200).send({
        status: 1,
        message: "success",
        // output
        shifts: output,
        // shift: {
        //   jobTitle: shift.jobTitle,
        //   location: shift.location,
        // },
        // user: {
        //   name: user.name,
        //   email: user.email,
        //   licenseNumber: user.licenseNumber,
        //   role: user.role,
        // },
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const myUpcomingShifts = async (req, res) => {
  try {
    var newdate = moment(Date.now()).format("YYYY-MM-DD");
    const myshifts = await Jobs.find({
      user_id: req.user._id,
      status: true,
      date: { $gt: newdate },
    }).populate({
      path: "hospital_id",
      model: "Hospital",
      select:
        "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
    });

    if (myshifts.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "no shift",
      });
    } else {
      //   for (let i = 0; i < myshifts.length; i++) {
      //     var shift = myshifts[i].hospital_id;
      //     var user = myshifts[i].user_id;
      //   }
      var output = [];
      for (var i = 0; i < myshifts.length; ++i) {
        output.push(myshifts[i].hospital_id);
      }
      return res.status(200).send({
        status: 1,
        message: "success",
        shifts: output,
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const myRunningShifts = async (req, res) => {
  try {
    var newdate = moment(Date.now()).format("YYYY-MM-DD");
    console.log(newdate);
    // return;
    // var fulldate = date.getDate() + ' ' + date.getMonth()
    // console.log(fulldate);
    // return;
    const myshifts = await Jobs.find({
      user_id: req.user._id,
      approve: true,
      date: newdate,
    }).populate({
      path: "hospital_id",
      model: "Hospital",
      select:
        "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
    });

    if (myshifts.length < 1) {
      return res.status(400).send({
        status: 0,
        message: "no shift",
      });
    } else {
      //   for (let i = 0; i < myshifts.length; i++) {
      //     var shift = myshifts[i].hospital_id;
      //     var user = myshifts[i].user_id;
      //   }

      var output = [];
      for (var i = 0; i < myshifts.length; ++i) {
        output.push(myshifts[i].hospital_id);
      }
      return res.status(200).send({
        status: 1,
        message: "success",
        shifts: output,
      });
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// const myPreviousShifts = async (req, res) => {
//   try {
//     var newdate = moment(new Date()).format("YYYY-MM-DD");
//     console.log(newdate);

//     const myshifts = await Jobs.find({
//       user_id: req.user._id,
//       approve: true,
//       date: { $lt: newdate },
//     })
//       .populate({
//         path: "hospital_id",
//         model: "Hospital",
//         select:
//           "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
//       })
//       .populate({
//         path: "user_id",
//         model: "User",
//         select:
//           "name , email , licenseNumber , ssn , position , profilePicture , role",
//       });
//     // console.log("======================================", myshifts);
//     if (myshifts.length < 1) {
//       return res.status(400).send({
//         status: 0,
//         message: "no shift",
//       });
//     } else {
//       for (let i = 0; i < myshifts.length; i++) {
//         var shift = myshifts[i].hospital_id;
//         var user = myshifts[i].user_id;
//       }
//       // console.log(shift, "--------------------------------------------------");
//       return res.status(200).send({
//         status: 1,
//         message: "success",
//         shift,
//         // shift: {
//         //   jobTitle: shift.jobTitle,
//         //   location: shift.location,
//         // },
//         // user: {
//         //   name: user.name,
//         //   email: user.email,
//         //   licenseNumber: user.licenseNumber,
//         //   role: user.role,
//         // },
//       });
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// };

// const myUpcomingShifts = async (req, res) => {
//   try {
//     var newdate = moment(Date.now()).format("YYYY-MM-DD");
//     const myshifts = await Jobs.find({
//       user_id: req.user._id,
//       status: true,
//       date: { $gt: newdate },
//     }).populate({
//       path: "hospital_id",
//       model: "Hospital",
//       select:
//         "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
//     });

//     if (myshifts.length < 1) {
//       return res.status(400).send({
//         status: 0,
//         message: "no shift",
//       });
//     } else {
//       for (let i = 0; i < myshifts.length; i++) {
//         var shift = myshifts[i].hospital_id;
//         var user = myshifts[i].user_id;
//       }
//       return res.status(200).send({
//         status: 1,
//         message: "success",
//         shift,
//       });
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// };

// const myRunningShifts = async (req, res) => {
//   try {
//     var newdate = moment(Date.now()).format("YYYY-MM-DD");
//     console.log(newdate);
//     // return;
//     // var fulldate = date.getDate() + ' ' + date.getMonth()
//     // console.log(fulldate);
//     // return;
//     const myrunningshifts = await Jobs.find({
//       user_id: req.user._id,
//       approve: true,
//       date: newdate,
//     }).populate({
//       path: "hospital_id",
//       model: "Hospital",
//       select:
//         "hospitalName , hospitalPic , jobTitle , timing , hourlyRate , location , date , day ",
//     });

//     console.log(myrunningshifts, "=========================================");
//     // console.log(myrunningshifts.createdAt, "=========================================");

//     if (myrunningshifts.length < 1) {
//       return res.status(400).send({
//         status: 0,
//         message: "no shift",
//       });
//     } else {
//       for (let i = 0; i < myrunningshifts.length; i++) {
//         var shift = myrunningshifts[i].hospital_id;
//         var user = myrunningshifts[i].user_id;
//       }
//       return res.status(200).send({
//         status: 1,
//         message: "success",
//         shift,
//       });
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// };

module.exports = {
  postShift,
  getShifts,
  getSingleShift,
  applyShift,
  approveshift,
  jobStatus,
  getJobs,
  myPreviousShifts,
  myUpcomingShifts,
  myRunningShifts,
};
