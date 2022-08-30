const mongoose = require('mongoose');
const moment = require('moment');

const hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String
    },
    hospitalPic:{
        type: String,
        default: null
    },
    jobTitle: {
        type: String
    },
    timing: {
        type: String,
    },
    date: {
        type: String,
        default: moment(new Date()).format("YYYY-MM-DD")
    },
    day: {
        type: String,
        enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    hourlyRate: {
        type: Number
    },
    location: {
        longitude: {type: String},
        latitude: {type: String}
    },
    applied: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema); 
module.exports = Hospital;