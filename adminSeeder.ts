import { envConfig } from "./src/Config/envConfig"
import User from "./src/dataBase/Model/userModel"
import bcrypt from 'bcrypt'
const adminUser = {
    email:"admin@gmail.com",
    password:bcrypt.hashSync('admin',10) as string,
    fullName:"admin",
    role:"admin"
}
const adminSeeder = async()=>{
    const user = await User.findOne({
        email:adminUser.email
    })
    if(user){
        console.log("User is already Created!!!");
        return;
    }
    try {
        await User.create(adminUser);
        console.log("admin created!")
        
    } catch (error) {
        console.log(error);
        
    }
}

export default adminSeeder;