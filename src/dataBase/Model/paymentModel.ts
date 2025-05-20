import mongoose from "mongoose";
import DoctorInfo from "./doctorModel";
import { PaymentStatus } from "../../global/interface";
const Schema = mongoose.Schema;

export enum PaymentMethod {
  Cod = "cod",
  Esewa = "esewa",
  Khalti = "khalti",
}


const paymentSchema = new Schema({
  paymentMethod: {
    type: String,
    enum: [PaymentMethod.Cod, PaymentMethod.Esewa, PaymentMethod.Khalti],
    default: PaymentMethod.Cod,
  },
  PaymentStatus: {
    type: String,
    enum:[PaymentStatus.Pending,PaymentStatus.SUCCESS],
    default: PaymentStatus.Pending,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorInfo",
    required: true,
  },
  pidx:{
    type:String
  }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
