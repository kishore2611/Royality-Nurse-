const mongoose = require('mongoose');
const moment = require('moment');

const jobsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    date: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD")
    },
    day: {
        type: String,
        enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    approve:{
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = Jobs;