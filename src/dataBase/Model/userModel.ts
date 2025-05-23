import mongoose from "mongoose";
const Schema = mongoose.Schema;
enum Gender{
    male = "male",
    female = "female",
    other = "other"
}

const userSchema = new Schema({
    email:{
        type:String,
        null:false,
        unique:true
    },
    password:{
        type: String,
        unique: false,
        null: false
    },
    fullName:{
        type:String,
        null:false
    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String
    },
    imageUrl:{
        type:String
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        default: Gender.male
    },
    dob:{
        type:String
    },
    otp:{
        type:String
    },
    role:{
        type:String,
        enum: ['patient','doctor','admin'],
        default:'patient',
        required:true
    }
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema)

export default User

