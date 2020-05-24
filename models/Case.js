const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfficerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Off Duty', 'On Duty'],
        default: 'Off Duty'
    },
    case_assigned: {
        type: [{ type: Schema.Types.ObjectId, ref: "Case" }]
    },
    register_date:
    {
        type: Date,
        default: Date.now
    }
});


const CaseSchema = new Schema({
    registration_id: {
        type: String
    },
    color: {
        type: String
    },
    type: {
        type: String
    },

    color: {
        type: String
    },
    officer_assigned: {
        type: [{ type: Schema.Types.ObjectId, ref: "Officer" }]
    },
    status: {
        type: String,
        enum: ['Not Assigned', 'Pending', 'Resolved'],
        default: 'Not Assigned'
    },
    register_date:
    {
        type: Date,
        default: Date.now
    }
});

const Officer = mongoose.model("Officer", OfficerSchema);
const Case = mongoose.model("Case", CaseSchema);
module.exports = { Officer, Case }