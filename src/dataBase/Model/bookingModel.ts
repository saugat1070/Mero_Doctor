import mongoose from "mongoose";
import DoctorInfo from "./doctorModel";
import User from "./userModel";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  bookingDate: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  doctorInfo : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'DoctorInfo',
    required : true
  }
});

const Booking = mongoose.model("Booking",bookingSchema)
export default Booking;