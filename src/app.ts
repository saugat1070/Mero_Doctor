import express,{Application} from 'express'
import connect_db from './dataBase/db_connection';
import  userRoute from '../src/Route/userRoute'
const app:Application = express()
app.use(express.json())
connect_db()

//for routing
app.use('/api/auth',userRoute); // http://localhost:3000/api/user



export default app;