const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const jwt = require('jsonwebtoken')

// const validator = require("validator")

let userSchema = new Schema({
    name: {
        type: "string",
        // required: false,
        maxLength: 30,
        minLength: 3,
        default: null
    },
    licenseNumber: {
        type: String,
        default: null
    },
    ssn: {
        type: String,
        default: null
    },
    position: {
        type: String,
        enum: [null, "Trael Nurse","Registered Nurse","License Practical Nurse","Certified Nursing Assistants","Medicine Aids","Patiebt Care Technician","Caregiver","LVN(Licensed Vocational Nurse)"],
        default: null
        
    },
    email: {
        type: "string",
        // required: false,
        unique: true,
        match: [/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,"Please enter a valid email address"],
        // validate: [validator.isEmail,"Please enter a valid email address"],
    },
    password: {
        type: "string",
        // required: true,
        // match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/],
    },
    profilePicture: {
        type: String,
        default: null,
    },
    verification_code: {
        type: Number,
        default: null,
    },
    verified: {
        type: Number,
        default: 0,
    },
    is_notification: {
        type: Number,
        default: 1
    },
    role: {
        type: String,
        default: "user"
    },
    applied:[{ 
        hospital_id: {type: mongoose.Schema.Types.ObjectId, ref: "Hospital"},
        status:{type: Boolean, default: false}
    }],
    //social login
    user_social_token: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    user_social_type: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    user_device_type: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    user_device_token: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    user_authentication: {
        type: String,
        default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true
});

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({
//         email: user.email,
//         userId: user._id
//     },
//         process.env.JWT_KEY);
//     // user.user_authentication = token;
//     await user.save();
//     //console.log("tokeeen--->", token);
//     return token;
// }

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;