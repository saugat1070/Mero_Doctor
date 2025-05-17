import mongoose from "mongoose";
import DoctorInfo from "./doctorModel";
const Schema = mongoose.Schema;

enum PaymentMethod {
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
    type: Boolean,
    default: false,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorInfo",
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
