
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const User = require("./User")


let documentSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        // type: String,
    },
    driverLicense: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    cnaCertificate: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    nursingLicense: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    socialSecurity: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    cpr: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    bls: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    acls: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    covidVaccination: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
    hepatitesSeries: {
        name: {type: String, default: null},
        document: {type: String, default: null},
        status: {type: Number, enum: [0,1,2], default: 0}
    },
},
    {
        timestamps: true
    }
);
const Document = mongoose.model("Document", documentSchema);
module.exports = Document;