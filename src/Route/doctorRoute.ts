import express, { Router } from "express";
import { storage, multer } from "../middleware/multer";
import { DoctorController } from "../Controller/doctorController";
import { UserMiddleware } from "../middleware/userMiddleware";
import { UserController } from "../Controller/userController";
import { Role } from "../global/interface";
const router: Router = express.Router();
const upload = multer({ storage: storage });

//route
router
  .route("/")
  .post(
    UserMiddleware.IsUserLoggin,
    UserMiddleware.accessTo(Role.Doctor, Role.Admin),
    upload.single("profileImg"),
    DoctorController.createDoctorProfile
  )
  .get(DoctorController.fetchDoctorInfo);

router
  .route("/:id")
  .post(
    UserMiddleware.IsUserLoggin,
    UserMiddleware.accessTo(Role.Admin, Role.Doctor),
    DoctorController.UpdateInformation
  )
  .delete(
    UserMiddleware.IsUserLoggin,
    UserMiddleware.accessTo(Role.Admin, Role.Doctor),
    DoctorController.deleteDoctorProfile
  );

export default router;
