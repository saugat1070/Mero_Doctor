import express, { Router } from "express";
import { UserController } from "../Controller/userController";
const router: Router = express.Router();
import { UserMiddleware } from "../middleware/userMiddleware";
import { storage, multer } from "../middleware/multer";
//for image hanling
const upload = multer({ storage: storage });

//route
router
  .route("/registration")
  .post(UserController.CreateUser);
router.route("/login").post(UserController.Login);
router
  .route("/updateUser")
  .post(
    UserMiddleware.IsUserLoggin,
    upload.single("profileImg"),
    UserController.updateUser
  );
router.route("/forget_password").post(UserController.forgetPassword);
router.route("/verify-otp").post(UserController.verifyOtp);
router
  .route("/fetch-user")
  .get(UserMiddleware.IsUserLoggin, UserController.fetchUser);

export default router;
