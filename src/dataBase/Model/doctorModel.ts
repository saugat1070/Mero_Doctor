import mongoose from "mongoose";
import User from "./userModel";
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    nameDoctor:{
        type:String,
        required:true,
        null:false
    },
    core_education:{
        type:String,
        required: true
    },
    topic_education:{
        type:String,
        required: true
    },
    experience:{
        type:Number,
        defaultValue:0,
    },
    About:{
        type:String
    }
    ,
    appointmentFee:{
        type:Number,
        null:false,
        defaultValue:0
    },
    isAvailable:{
        type:Boolean,
        defaultValue:false
    },
    hasGreentick:{
        type:Boolean,
        defaultValue:false
    },
    profileDoctor:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique:true,
        required:false
    }
})

const DoctorInfo = mongoose.model("DoctorInfo",doctorSchema)
export default DoctorInfo;