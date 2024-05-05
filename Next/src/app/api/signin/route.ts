import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/utils/PrismaClient"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import ms from "ms";
import exp from "constants";

dotenv.config();
const JWT_SECRET = process.env.jwtSecret || "";

export async function POST(req:NextRequest){
    const body = await req.json();
    const {username, password} = body;
    console.log(body);

    try{
        const PrismaConnection = Prisma.getInstance();
        const searchUser = await PrismaConnection.connection.user.findUnique({
            where: {
                userName: username
            }
        })

        if(!searchUser){
            return NextResponse.json({
                success: false,
                message: "User doesn't exist"
            },{status: 401})
        }
        const comparePassword = await bcrypt.compare(password, searchUser.password);
        if(!comparePassword){
            return NextResponse.json({
                success: false,
                message: "Password is incorrect"
            },{status: 401})
        } 
        const payload = {
            id: searchUser.userId,
            username: searchUser.userName
        }
        const options = {
            expiresIn: ms(Date.now()+30*24*60*60*1000)
          }
        const token = jwt.sign(payload, JWT_SECRET, options);
        const response = NextResponse.json({
                success: true,
                message: "User logged in successfully",
                data: {username: searchUser.userName, id: searchUser.userId}
            },{status: 200})
        const cookieOption = {
            expires: new Date(Date.now() + 30*24*60*60*1000),
            sameSite: "none" as const,
            secure: true,
            httpOnly: true,
        }
        response.cookies.set("auth-cookie", token, cookieOption);
        return response;
        

    } catch(e){
        console.log(e);
        return NextResponse.json({
            status: "error",
            message: e
        })
    }
    
}