import { Request, Response } from "express";
import { IExtendRequest, PaymentStatus } from "../global/interface";
import DoctorInfo from "../dataBase/Model/doctorModel";
import Booking from "../dataBase/Model/bookingModel";
import Payment from "../dataBase/Model/paymentModel";
import { PaymentMethod } from "../dataBase/Model/paymentModel";
import axios from "axios";


class BookingController {
  static async createBooking(req: IExtendRequest, res: Response) {
    const doctorId = req?.params
    const { dateOfBooking } = req.body;
    const userId = req?.user?.id;

    const bookingDate = new Date(dateOfBooking);
    if (!doctorId) {
      res.status(400).json({
        message: "doctorId must be provided!",
      });
      return;
    }
    if (!bookingDate) {
      res.status(400).json({
        message: "please provide booking information and paymentStatus",
      });
      return;
    }
    if (!userId) {
      res.status(400).json({
        message: "user id must be provided!",
      });
      return;
    }

    const existingBooking = await Booking.find({
      user:userId,
      dateOfBooking:bookingDate
    })

    if(existingBooking){
      res.status(403).json({
        message : "At this time another booking is appeared!"
      });
      return;
    }

    try {
      const booking = new Booking({
        doctorInfo: doctorId,
        bookingDate: bookingDate,
        user: userId,
      });

      await booking.save();
      res.status(200).json({
        message: "Booking successful",
        data: booking,
      });
    } catch (error) {
      console.log("server error:"+error);
      res.status(500).json({
        message: "server Error",
      });
    }
  }

  /* static async updateBooking(req:IExtendRequest,res:Response){
    const { id } = req.params;
    console.log(id,req.body)
    const { dateOfBooking } = req.body;
    const userId = req?.user?.id;
    if (!id) {
      res.status(400).json({
        message: "doctor id must be provided!!",
      });
      return;
    }
    if (!dateOfBooking ) {
      res.status(400).json({
        message: "please provide booking information"
      });
      return;
    }
    if (!userId) {
      res.status(400).json({
        message: "user id must be provided!!",
      });
      return;
    }

    await Booking.findOne({
      
    })
  } */
  static async getBookingDetails(req: IExtendRequest, res: Response) {
    const user_id = req?.user?.id;
    if (!user_id) {
      res.status(400).json({
        message: "user should be login",
      });
      return;
    }

    const BookingDetails = await Booking.find({
      user: user_id,
    })
      .populate({
        path: "user",
        select: " -password -createdAt -updatedAt ",
      })
      .populate({
        path: "doctorInfo",
        select: "-user",
      });

    res.status(200).json({
      message: "Booking Cart is Successfully fetch!",
      data: BookingDetails,
    });
  }

  static async PaymentSource(req: IExtendRequest, res: Response) {
    const { id } = req.params;
    const { paymentMethod } = req.body;

    if (!id || !paymentMethod) {
      res.status(400).json({
        message: "bookingId and paymentMethod should be provided!!!",
      });
      return;
    }

    const booking = await Booking.findById(id).populate({
      path: "doctorInfo",
      model: DoctorInfo,
    });
    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
      });
      return;
    }

    // Type assertion to access appointmentFee
    const bookingAmount = (booking.doctorInfo as typeof DoctorInfo.prototype)
      .appointmentFee;

    if (paymentMethod == PaymentMethod.Esewa) {
    } else if (paymentMethod == PaymentMethod.Khalti) {
      const data = {
        return_url: "http://localhost:5173/",
        website_url: "http://localhost:5173/",
        amount: bookingAmount * 100,
        purchase_order_id: booking._id,
        purchase_order_name: "order_" + booking._id,
      };

      const response = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        data,
        {
          headers: {
            Authorization: "Key 20d545a49ac6443a9cfe962f1aae2966",
          },
        }
      );
      console.log(response.data)
      const paymentCheck = await Payment.create({
      booking: booking._id,
      paymentMethod: paymentMethod,
      pidx: response.data.pidx
    })

      if(!paymentCheck){
        res.status(403).json({
          message : "Transcition Failed"
        })
        return;
      }

    res.status(200).json({
      message: "Booking created Successfully",
      url:response.data.payment_url
    })
    }
  }


  static async verifyTranscition(req:IExtendRequest,res:Response){
    const bookingId = req.params
    const {pidx} = req.body
    if(!pidx){
      res.status(400).json({
        message : "please provide pidx"
      })
      return;
    }

    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{
      pidx:pidx
    },{
      headers:{
        Authorization:  "Key 20d545a49ac6443a9cfe962f1aae2966"
      }
    })

    console.log(response.data)
    if(response.data.status == "Completed"){
      await Payment.findOneAndUpdate({
        pidx:pidx
      },{
        PaymentStatus : PaymentStatus.SUCCESS
      })

      res.status(200).json({
        message : "payment verified"
      })
      return;
      
    }
    res.status(400).json({
      message : "Payment verification failed!!!"
    })
  }

  static async CancelBooking(req:IExtendRequest,res:Response){
    const {bookingId} = req?.params;
    console.log(bookingId,req.params)
    if(!bookingId){
      res.status(400).json({
        messsage : "booking Id should be provided"
      })
      return;
    }

    try {
      await Booking.findOneAndDelete({
      _id:bookingId
    }).then(()=>{
      console.log("delete booking from database");
    })
    res.status(200).json({
      message : "Booking is cancel"
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message : "Internal Server error"
      })
    }
  }
}

export default BookingController;
