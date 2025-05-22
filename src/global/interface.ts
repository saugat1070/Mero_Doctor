import { Request } from "express";
import { ObjectId } from "mongoose";

export interface IExtendRequest extends Request {
  user?: {
    email: string;
    id: string;
    role: string;
  };
}

export enum Role{
  Patient = "patient",
  Doctor = "doctor",
  Admin = "admin"
}

export enum PaymentStatus{
  Pending = "pending",
  SUCCESS = "success"
}
