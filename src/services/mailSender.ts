import nodemailer  from 'nodemailer';
import { envConfig } from '../Config/envConfig';
import fs from 'fs'
import path from 'path';

// const htmlContent = fs.readFileSync(path.join(__dirname,'..','Static','emailTem.html'),'utf-8');
export interface IData{
    to: string,
    subject: string,
    text: string,
    html?: string
}

const sendMail = async (data:IData)=>{
    const htmlContent = fs.readFileSync(path.join(__dirname,'..','Static','emailTem.html'),'utf-8');

    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:envConfig.email_user,
            pass:envConfig.email_pass
        }
    })

    const mailOption = {
        from : "merodoctor@gmail.com",
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.html || htmlContent
    }

    try {
        await transport.sendMail(mailOption);
        console.log("mail sended!")
    } catch (err) {
        console.log("mail is not sended");
    }

}

export default sendMail;