import { config } from "dotenv";
config()

export const envConfig = {
    port_number : process.env.PORT_NUMBER,
    db_url : process.env.DB_URL as string,
    email_user : process.env.EMAIL_USER as string,
    email_pass : process.env.EMAIL_PASSWORD as string,
    jwt_secret_key : process.env.JWT_SECRET_TOKEN as string,
    esewa_secret_key : process.env.ESEWA_SECRET_KEY as string
}