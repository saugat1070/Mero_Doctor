import express,{Application} from 'express'
import { Request,Response } from 'express';
import connect_db from './dataBase/db_connection';
import  userRoute from '../src/Route/userRoute'
import doctorRoute from '../src/Route/doctorRoute'
import bookingRoute from '../src/Route/bookingRoute'
const app:Application = express()
app.use(express.json())
connect_db()

//for routing
app.use('/api/auth',userRoute); // http://localhost:3000/api/auth
app.use('/api/doctor',doctorRoute); // http://localhost:3000/api/doctor
app.use('/api/booking',bookingRoute); //http://localhost:3000/api/booking


app.get("/api/test",(req:Request,res:Response)=>{
    res.sendFile(__dirname+"/Static/test.html");
})


export default app;