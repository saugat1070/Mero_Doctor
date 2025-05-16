import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../Config/envConfig";
import User from "../dataBase/Model/userModel";
import { IExtendRequest } from "../global/interface";


class UserMiddleware {
    static async IsUserLoggin(
        req: IExtendRequest,
        res: Response,
        next: NextFunction
    ) {
        const auth = req?.headers?.authorization;
        const token = auth && auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
        if (!token) {
            res.status(403).json({
                message: "token must be provided",
            });
            return;
        }

        jwt.verify(token, envConfig.jwt_secret_key, async (err, result: any) => {
            if (err) {
                console.log(err);
                res.status(403).json({
                    message: "Invalid token!!",
                });
            } else {
                //@ts-ignore
                //req.id = req.userId
                const user_data = await User.findById(result?.userId);
                if (!user_data) {
                    res.status(404).json({
                        message: "user is not found",
                    });
                    return;
                }

                const plain_user = user_data.toObject();
                /* 
                *we need to remember that findById is read in type of DocumentForm
                *so we have to convert document form into object but in sql database we 
                *don't need to perform this type of task 
                */
                req.user = {
                    email: plain_user.email as string,
                    id: plain_user._id.toString(),
                    role: plain_user.role as string,
                };
                next();
            }
        });
    }
}

export { UserMiddleware };
