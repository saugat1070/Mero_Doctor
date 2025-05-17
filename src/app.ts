import express,{Application} from 'express'
import connect_db from './dataBase/db_connection';
import  userRoute from '../src/Route/userRoute'
import doctorRoute from '../src/Route/doctorRoute'
const app:Application = express()
app.use(express.json())
connect_db()

//for routing
app.use('/api/auth',userRoute); // http://localhost:3000/api/auth
app.use('/api/doctor',doctorRoute); // http://localhost:3000/api/doctor


export default app;