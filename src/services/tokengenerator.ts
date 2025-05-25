import jwt from 'jsonwebtoken'
import { envConfig } from '../Config/envConfig'

const generateToken = async (userId:string)=>{
    const token = jwt.sign(
        {
        userId:userId
    },
        envConfig.jwt_secret_key,
        {expiresIn:'20d'}
    )

    return token;
}


export default generateToken;