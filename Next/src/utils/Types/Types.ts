import {z} from "zod";
import { SigninSchema, SignupSchema } from "../ZodValidator/zod";

export interface UserDetail {
    id: string;
    email: string;
    username: string;
    fullname: string, 
    profile: string
    followers: number,
    following: number,
    post: number,
}


export type TSignin = z.infer<typeof SigninSchema>;
export type TSignUp = z.infer<typeof SignupSchema>



