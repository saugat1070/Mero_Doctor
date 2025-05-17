import { Request, Response } from "express";
import DoctorInfo from "../dataBase/Model/doctorModel";
import { IExtendRequest } from "../global/interface";
import app from "../app";
import { promises } from "nodemailer/lib/xoauth2";
class DoctorController {
    static async createDoctorProfile(
        req: IExtendRequest,
        res: Response
    ): Promise<void> {
        const user_id = req?.user?.id;
        if (!user_id) {
            res.status(404).json({
                message: "userId is not found",
            });
            return;
        }

        const filename = req.file
            ? req.file.filename
            : "http://localhost:3000/doctorProfile.png";
        const {
            nameDoctor,
            core_education,
            topic_education,
            experience,
            About,
            appointmentFee,
        } = req.body;
        if (
            !nameDoctor ||
            !core_education ||
            !topic_education ||
            !experience ||
            !About ||
            !appointmentFee
        ) {
            res.status(400).json({
                message: "plaease enter valid information",
            });
            return;
        }
        try {
            const doctor_info = await DoctorInfo.create({
                nameDoctor: nameDoctor,
                core_education: core_education,
                topic_education: topic_education,
                experience: experience,
                About: About,
                appointmentFee: appointmentFee,
                profileDoc: filename,
                user: user_id,
            });

            // await DoctorInfo.findById(doctor_info._id)
            // .populate({
            //     path: 'user',
            //     match: { _id: user_id }
            // })
            res.status(200).json({
                message: "DoctorInfo created Successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(403).json({
                message: "DoctorInfo creation failed on Database!!",
            });
        }
    }
    static async fetchDoctorInfo(
        req: IExtendRequest,
        res: Response
    ): Promise<void> {
        const doctorData = await DoctorInfo.find().populate({
            path: "user",
            select: "-password -createdAt -updatedAt -__v",
        });
        if (doctorData.length === 0) {
            res.status(404).json({
                message: "There is no Doctor information",
            });
            return;
        }
        res.status(200).json({
            message: "Doctor information fetching success",
            data: doctorData,
        });
    }
    static async UpdateInformation(req: IExtendRequest, res: Response) {
        const { id } = req.params;
        console.log('id:',id);
        console.log('req.body',req.body)
        const { core_education, topic_education, experience, About, appointmentFee } = req.body;
        if (
            !core_education &&
            !topic_education &&
            !experience &&
            !About &&
            !appointmentFee
        ) {
            res.status(400).json({
                message: "At least one field must be provided for update",
            });
            return;
        }
        try {
            await DoctorInfo.findByIdAndUpdate({ _id: id }, {
                core_education:core_education,
                topic_education: topic_education,
                experience: experience,
                About: About,
                appointmentFee: appointmentFee
            }).then(() => {
                console.log("Doctor Information updated!!");
            }).catch(()=>{
                console.log("Update error")
            });
            res.status(200).json({
                message: "doctor information updated successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Error on database during update Doctor",
            });

        }
    }

    static async deleteDoctorProfile(req:IExtendRequest,res:Response):Promise<void>{
        const {id} = req.params
        if(!id){
            res.status(400).json({
                message : "doctor id should be provided!!"
            })
            return;
        }

        const doctorId = await DoctorInfo.findById({_id:id});
        if(!doctorId){
            res.status(404).json({
                message: "Doctor is not found!!!"
            })
            return;
        }
        await DoctorInfo.findByIdAndDelete({_id:id});
        res.status(200).json({
            message : "Doctor information deleted from dataBase!!!"
        })
    }
}

export { DoctorController };
