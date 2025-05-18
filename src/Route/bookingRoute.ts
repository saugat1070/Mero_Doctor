import express,{ Router } from "express";
import { UserMiddleware } from "../middleware/userMiddleware";
import BookingController from "../Controller/bookingController";

const router:Router = express.Router()
//router
router.route('/').post(UserMiddleware.IsUserLoggin,BookingController.createBooking)



export default router