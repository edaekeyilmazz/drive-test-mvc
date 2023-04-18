import mongoose from "mongoose"

//#region USER MODEL
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
       default: '',
   },
   lastName: {
       type: String,
       default: '',
   },
   licenseNo: {
       type: String,
       default: '',
   },
   age: {
       type: Number,
       default: '',
   },
   dob: {
       type: Date,
       default: '',
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
   appointmentId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'appointment',
    default: '',
   }
});

const userModel = mongoose.model("user", userSchema);
//#endregion USER MODEL

 export default userModel