import express,{ Router } from "express";
import { UserMiddleware } from "../middleware/userMiddleware";
import BookingController from "../Controller/bookingController";

const router:Router = express.Router()
//router
router.route('/:id').post(UserMiddleware.IsUserLoggin,BookingController.createBooking)
router.route('/').get(UserMiddleware.IsUserLoggin,BookingController.getBookingDetails)
router.route('/payment/:id').post(UserMiddleware.IsUserLoggin,BookingController.PaymentSource)
router.route('/payment/:id/verify-payment').post(UserMiddleware.IsUserLoggin,BookingController.verifyTranscition)


export default router