import nodemailer  from 'nodemailer';
import { envConfig } from '../Config/envConfig';
import { text } from 'express';
export interface IData{
    to:string,
    subject:string,
    text:string
    
}

const sendMail = async (data:IData)=>{
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:envConfig.email_user,
            pass:envConfig.email_pass
        }
    })

    const mailOption = {
        from : "merodoctor@gmail.com",
        to:data.to,
        subject:data.subject,
        text:data.text
    }

    try {
        await transport.sendMail(mailOption);
        console.log("mail sended!")
    } catch (err) {
        console.log("mail is not sended");
    }

}

export default sendMail;