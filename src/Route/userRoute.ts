import express,{ Router } from "express";
import { UserController } from "../Controller/userController";
const router:Router = express.Router()
import { UserMiddleware } from "../middleware/userMiddleware";

//route 
router.route('/registration').post(UserMiddleware.IsUserLoggin,UserController.CreateUser)
router.route('/login').post(UserController.Login)
router.route('/forget_password').post(UserController.forgetPassword)
router.route('/verify-otp').post(UserController.verifyOtp)
router.route('/fetch-user').get(UserMiddleware.IsUserLoggin,UserController.fetchUser)


export default router;