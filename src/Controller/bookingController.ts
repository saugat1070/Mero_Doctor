import { Request, Response } from "express";
import { IExtendRequest } from "../global/interface";
import DoctorInfo from "../dataBase/Model/doctorModel";
import Booking from "../dataBase/Model/bookingModel";
import Payment from "../dataBase/Model/paymentModel";

class BookingController {
  static async createBooking(req: IExtendRequest, res: Response) {
    const { id } = req?.params;
    const { dateOfBooking,paymentMethod } = req.body;
    const userId = req?.user?.id;
    if (!id) {
      res.status(400).json({
        message: "doctor id must be provided!!",
      });
      return;
    }
    if (!dateOfBooking || !paymentMethod) {
      res.status(400).json({
        message: "please provide booking information and paymentStatus"
      });
      return;
    }
    if (!userId) {
      res.status(400).json({
        message: "doctor id must be provided!!",
      });
      return;
    }

    try {
      const BookingDetails = await Booking.create({
      doctorInfo: id,
      bookingDate : dateOfBooking,
      user: userId
    })

    await Payment.create({
      booking: BookingDetails._id,
      paymentMethod : paymentMethod
    })

    res.status(200).json({
      message : "Booking successful"
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "server Error"
      })
      
    }
  }
}
