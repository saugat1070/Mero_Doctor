import { Request } from "express";
import { ObjectId } from "mongoose";

export interface IExtendRequest extends Request {
  user?: {
    email: string;
    id: string;
    role: string;
  };
}