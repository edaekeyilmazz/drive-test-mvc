import mongoose from "mongoose"

//#region APPOINTMENT MODEL
const appointmentSchema = mongoose.Schema({
    appointmentDate: {
        type: String,
        default: '',
    },
    appointmentTime: {
        type: String,
        default: '',
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default: true
    }
 });
 
 const appointmentModel = mongoose.model("appointment", appointmentSchema);

 //#endregion APPOINTMENT  MODEL


 export default appointmentModel  