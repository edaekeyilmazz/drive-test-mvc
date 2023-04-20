// Eda Ekeyilmaz -8823564
// Namitha Chevari - 8817006

import mongoose from "mongoose"

// #region USER MODEL
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    licenseNo: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: ''
    },
    dob: {
        type: Date,
        default: ''
    },
    car_details: {
        make: {
            type: String,
            default: ''
        },
        model: {
            type: String,
            default: ''
        },
        year: {
            type: Number,
            default: ''
        },
        plateNo: {
            type: String,
            default: ''
        }
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment'
    },
    // "G" or "G2"
    testType: {
        type: String
    },
    examinerComment: {
        type: String
    },
    // Pass or Fail 
    testResult: {
        type: Boolean
    }
});

const userModel = mongoose.model("user", userSchema);
// #endregion USER MODEL

export default userModel
