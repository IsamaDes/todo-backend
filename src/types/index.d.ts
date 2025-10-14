import { User } from "../models/User.ts";

declare global {
  namespace Express {
     interface UserPayload {
      _id: string;
      email: string;
      role?: string;
    }

    export interface Request {
      user: UserPayload; 
    }


  }
}
