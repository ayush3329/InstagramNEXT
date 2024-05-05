import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/utils/PrismaClient"
import bcrypt, { compare } from "bcrypt"


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
        console.log(searchUser);
        const comparePassword = await bcrypt.compare(password, searchUser.password);
        if(!comparePassword){
            return NextResponse.json({
                success: false,
                message: "Password is incorrect"
            },{status: 401})
        } else{
            return NextResponse.json({
                success: true,
                message: "User logged in successfully",
                data: {username: searchUser.userName, id: searchUser.userId}
            },{status: 200})
        }

    } catch(e){
        console.log(e);
        return NextResponse.json({
            status: "error",
            message: e
        })
    }
    
}