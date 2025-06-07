import mongoose from 'mongoose'
import { envConfig } from '../Config/envConfig';
const connect_db = async ()=>{
    await mongoose.connect(envConfig?.db_url).then(()=>{
        console.log("DataBase connected Successfully!");
    }).catch((err)=>{
        console.log("Something wrong in database connection!",err)
    })
}

export default connect_db;