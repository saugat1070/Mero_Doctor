import e, { Request,Response, text } from "express";
import User from "../dataBase/Model/userModel";
import bcrypt from 'bcrypt'
import sendMail from "../services/mailSender";
import { IData } from "../services/mailSender";
import generateToken from "../services/tokengenerator";
import generateOtp from "../services/otpGenerator";
import { IExtendRequest } from "../global/interface";
class UserController{
    static async CreateUser(req:Request,res:Response){
        console.log(req.body)
        const {email,password,fullName} = req.body;
        if(!email || !password || !fullName){
            res.status(400).json({
                message: "Please provide email,password and fullName"
            })
        }
        const user_create = await User.create({
            email:email,
            password:bcrypt.hashSync(password,10),
            fullName:fullName
        })
        if(!user_create){
            res.status(403).json({
                message:"error in database creation"
            })
            return;
        }
        const data_mail:IData = {
            to:email,
            subject:"Register Successfully",
            text:`Thank you for your registration ${fullName}`

        }
        sendMail(data_mail)
        res.status(200).json({
            message: "User is created Successfully!!"
        })

    }

    static async Login(req:Request,res:Response){
        const {email,password} = req.body
        console.log(req.body)
        if(!email || !password){
            res.status(400).json({
                message:"please enter email and password"
            })
            return;
        }
        const [user] = await User.find({
            email:email
        })
        // const [user] = await User.find({
        //     email : email,
        //     password : bcrypt.hashSync(password,10)
        // })
        if(!user){
            res.status(404).json({
                message : "user with this email  is not found!!"
            })
            return;
        }

        const checkPassword = bcrypt.compareSync(password,user.password as string);
        if(!checkPassword){
            res.status(400).json({
                message:"bad request,please send again"
            })
            return;
        }
        const token = await generateToken(user?.id)
        res.status(200).json({
            message:"Login successful",
            token : token
        })
    }

    static async fetchUser(req:IExtendRequest,res:Response){
        
        // console.log(user_info)
        const user = await User.find({
            email:req?.user?.email
        }).select('-password -otp')
        if(!user){
            res.status(404).json({
                message : "User is not found!,please provide valid token"
            })
            return;
        }

        res.status(200).json({
            message: "User information fetch successfully",
            data:user
        })
    }

    static async forgetPassword(req:Request,res:Response){
        const {email} = req.body
        const user = await User.findOne({
            email:email
        })

        if(!user){
            res.status(404).json({
                message: "user with this email is not found"
            })
            return;
        }
        const otp = generateOtp(6);
        const body_mail:IData = {
            to:email,
            subject:"Forget Password",
            text:`otp code for forget password ${otp}`
        }
        try {
            user.otp = otp;
            await user.save();
            sendMail(body_mail);
        } catch (error) {
            console.log(error);
        }
        setTimeout(async ()=>{
            user.otp = "";
            await user.save();
        },60000)
        res.status(200).json({
            message : "message is send in your mail"
        })

        
    }

    static async verifyOtp(req:Request,res:Response):Promise<void>{
        const {email,otp} = req.body
        if(!email || !otp){
            res.status(400).json({
                message : "email and otp should be provided"
            })
            return;
        }

        const [user] = await
        
        User.find({
            email:email
        })
        if(!user){
            res.status(404).json({
                message : "user with this email is not found"
            })
            return;
        }
        if(user.otp == otp){
            res.status(200).json({
                message : "otp is verified"
            })
            return;
        }

        res.status(400).json({
            message : "otp is not verified!!"
        })
    }

    static async resetPassword(req:Request,res:Response){
        const {email,confirmPassword,newPassword} = req.body
        if(!email || !confirmPassword || !newPassword){
            res.status(400).json({
                message:"please provide email and password"
            })
            return;
        }
        if(newPassword !== confirmPassword){
            res.status(400).json({
                message: "newPassword and confirm password should be same"
            })
            return;
        }

        const [user] =await  User.find({
            email:email
        })
        if(!user){
            res.status(404).json({
                message:"user with this email is not found!!"
            })
            return;
        }

        const password = bcrypt.hashSync(newPassword,10);
        user.password = password;
        await user.save();
        
        res.status(200).json({
            message : "password change successfully"
        })
    }
}

export {UserController}

